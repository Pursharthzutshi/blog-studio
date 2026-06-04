import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { InsertBlogToDB, FetchBlogFromDB, FetchBlogFromDBById, RewriteBlogInDB } from "../lib/dal/blog"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { blogAnalysisSchemaTable, blogChunkSchemaTable, connectDB } from "../models/db"
import { storeBlogInVectorDB } from "../lib/dal/rag"
import { InsertBlogQuestionsAndAnswers } from "../(actions)/blog"
import openrouter from "../lib/dal/openrouter"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const embedModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" })

export const server = new McpServer({
    name: "test",
    version: "1.0.0",
})
// @ts-ignore

export async function RagBlogQuestionAction(prevState: any, formData: FormData) {

    const userQuestion = formData.get("userQuestion") as string;

    if (!userQuestion) {
        return {
            state: "error",
            message: "Please provide a question",
            data: null
        }
    }

    await connectDB()

    const result = await embedModel.embedContent(userQuestion);

    const questionEmbedding = result.embedding.values;


    const relevantChunks = await blogChunkSchemaTable.aggregate([
        {
            "$vectorSearch": {
                "index": "vector_index",
                "path": "embeddings",
                "queryVector": questionEmbedding,
                "numCandidates": 50,
                "limit": 5
            }
        }
    ]);

    const textPipeline = [
        {
            $search: {
                index: "text_index",
                text: {
                    query: userQuestion,
                    path: ["description"]
                }
            },
        },
        {
            $limit: 5

        }

    ]

    const textResults = await blogChunkSchemaTable.aggregate(textPipeline);

    const hybridSearch = [...relevantChunks, ...textResults]

    const hybridSearchCombined = Array.from(
        new Map(
            hybridSearch.map(item => [
                item._id.toString(),
                item
            ])
        ).values()
    )


    const context = hybridSearchCombined.map((c) => c.description).join("\n\n")

    const hasContext = context.trim().length > 0;

    const finalPrompt = hasContext
        ? `You are a helpful assistant answering questions for a blog platform.

You have been given some blog content below that was retrieved as potentially relevant to the user's question.

**Your job:**
1. First, decide if the blog context DIRECTLY and SPECIFICALLY answers the user's question.
2. If YES — answer using the blog context and cite it.
3. If NO (the context is only loosely related, tangential, or off-topic) — ignore the blog context entirely and answer from your own general knowledge. Also mention that the user's blog collection doesn't have a dedicated post on this topic yet.

Do NOT force blog context into your answer if it doesn't directly address the question.

---
Blog context (may or may not be relevant):
${context}
---

User question: ${userQuestion}`
        : `You are a helpful assistant for a blog platform. The user asked: "${userQuestion}"

No blog content was found for this topic. Answer using your general knowledge, and let the user know their blog collection doesn't cover this topic yet — they could write a blog post about it!`


    const aiAnswerResponse = await openrouter([{ role: "user", content: finalPrompt }])


    await InsertBlogQuestionsAndAnswers(userQuestion, aiAnswerResponse)

    return {
        state: "success",
        message: aiAnswerResponse,
        data: null
    }

}

server.tool("create-blog", "add a new blog", {
    title: z.string(),
    description: z.string(),
}, async ({ title, description }) => {
    try {
        console.error(`[MCP] Starting Gemini generation for titled: ${title}`);

        const prompt = `Write a concise 3-paragraph professional blog post titled '${title}'. It should be about: ${description}. Return only plain text. Do NOT use any HTML tags, markdown symbols, or code blocks. Separate paragraphs with a blank line. Keep the total length under 1000 words however dont abruptly stop the sentence.`;
        const AI_GENERATED_BLOG = await openrouter([{ role: "user", content: prompt }]);

        console.error(`[MCP] Gemini generation complete. Length: ${AI_GENERATED_BLOG.length}`);

        const insertBlogData = await InsertBlogToDB(title, AI_GENERATED_BLOG)

        const chunkData = await storeBlogInVectorDB(insertBlogData._id.toString(), AI_GENERATED_BLOG)

        console.log(chunkData)
        console.error(`[MCP] Database insertion complete. ID: ${insertBlogData._id}`);

        return {
            content: [
                { type: "text" as const, text: `Blog successfully created with Gemini AI!` }
            ]
        }
    } catch (error: any) {
        console.error(`[MCP] Gemini Tool Error: ${error.message}`);
        return {
            content: [
                { type: "text" as const, text: `Blog creation failed: ${error.message}` }
            ]
        }
    }
})

server.tool("analyze-blog", "analyze a existing blog", { id: z.string() }, async ({ id }) => {
    try {
        const blog = await FetchBlogFromDBById(id)

        if (!blog) {
            return {
                content: [{ type: "text" as const, text: "Blog not found in database. Please check the ID." }]
            }
        }

        console.error(`[MCP] Analyzing blog: ${blog.title}`);

        const prompt = `Provide a concise (maximum 150 words) professional analysis of this blog content: ${blog.description}. Focus on key takeaways and tone.`

        const AI_ANALYSIS_TEXT = await openrouter([{ role: "user", content: prompt }]);

        const analysisEntry = await blogAnalysisSchemaTable.create({
            blogId: id,
            blogAnalysis: AI_ANALYSIS_TEXT
        });

        console.error(`[MCP] Analysis saved to database for blog ID: ${id}`);

        return {
            content: [
                { type: "text" as const, text: `Successfully analyzed "${blog.title}".\n\n${AI_ANALYSIS_TEXT}` }
            ]
        }

    } catch (error: any) {
        console.error(`[MCP] Analysis Tool Error: ${error.message}`);
        return {
            content: [
                { type: "text" as const, text: `Blog analysis failed: ${error.message}` }
            ]
        }
    }
})


server.tool("rewrite-blog", "Rewrite the existing blog", {
    id: z.string(),
    highlightedText: z.string()
}, async ({ id, highlightedText }) => {
    try {
        const findBlogByID = await FetchBlogFromDBById(id)

        if (!findBlogByID) {
            return {
                content: [{ type: "text", text: "Blog Not Found" }]
            }
        }
        const examples = [
            {
                originalText: "A closure is a function that remembers variables from its outer scope.",
                targetRewrittenText: "A closure in JavaScript is created when a function retains access to variables from its lexical scope even after the outer function has finished execution. It allows functions to preserve state and continue accessing values from their creation context. Closures commonly occur when inner functions are returned or used as callbacks and are widely used for encapsulation, state management, and functional programming patterns."
            },
            {
                originalText: "Closures help store values between function calls.",
                targetRewrittenText: "Closures enable functions to preserve state across multiple executions by maintaining access to variables defined in their outer scope. This capability makes them useful for implementing private variables, maintaining internal state, and building reusable functional patterns."
            }
        ]

        // Format the examples into a clean string so the LLM can read them perfectly
        const formattedExamples = examples.map((ex, index) =>
            `Example ${index + 1}:\n- Original Text: "${ex.originalText}"\n- Desired Expansion: "${ex.targetRewrittenText}"`
        ).join("\n\n")

        const prompt = `You are a professional technical editor. Your job is to expand the highlighted text to make it more detailed, logically structured, and professionally written. Improve clarity, coherence, and depth while maintaining the original intent.
        
        ### Examples of Desired Quality:
        ${formattedExamples}
        
        ### Text to Expand:
        "${highlightedText}"
        
        ### Strict Instructions:

        1. Maintain the original core meaning and intent of the selected text.
        2. Return ONLY the final expanded plain text. 
        3. Do NOT include any quotation marks around the final response.
        4. Do NOT include any conversational introduction, explanation, or conversational outro (e.g. do NOT say "Here is your refined text:").`

        const aiRewriteResponse = await openrouter([{ role: "user", content: prompt }]);


        await RewriteBlogInDB(id, highlightedText, aiRewriteResponse)


        return {
            content: [
                { type: "text" as const, text: `Successfully Rewriten` }
            ]
        }

    } catch (error: any) {
        console.error(`[MCP] rewrite-blog error:`, error.message)
        return {
            content: [
                { type: "text" as const, text: `Failed: ${error.message}` }
            ]
        }
    }
})

server.resource("all-blogs", "blogs://all", async (uri) => {
    const fetchBlogs = await FetchBlogFromDB()

    return {
        contents: [
            {
                uri: uri.href,
                mimeType: "application/json",
                text: JSON.stringify(fetchBlogs)
            }
        ]
    }
})

server.prompt("prompt-analysis", "detailed analysis of prompts", { text: z.string() }, async ({ text }) => {

    const messages = [
        {
            role: "user",
            content: "You are an expert in creating blogs. Please analyze this text: " + text
        }
    ]

    const aiAnswer = await openrouter(messages)

    return {
        messages: [
            {
                role: "assistant",
                content: {
                    type: "text",
                    text: aiAnswer
                }
            }
        ]
    }

})