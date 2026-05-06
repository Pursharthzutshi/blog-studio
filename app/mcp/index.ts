import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { InsertBlogToDB, FetchBlogFromDB, FetchBlogFromDBById, RewriteBlogInDB } from "../lib/dal/blog"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { blogAnalysisSchemaTable, blogChunkSchemaTable } from "../models/db"
import { storeBlogInVectorDB } from "../lib/dal/rag"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
    model: "gemini-flash-latest",
    generationConfig: {
        maxOutputTokens: 800,
        temperature: 0.7,
    }
});

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

    const result = await embedModel.embedContent(userQuestion);
    const questionEmbedding = result.embedding.values;


    const relevantChunks = await blogChunkSchemaTable.aggregate([
        {
            "$vectorSearch": {
                "index": "vector_index",
                "path": "embedding",
                "queryVector": questionEmbedding,
                "numCandidates": 10,
                "limit": 3
            }
        }
    ]);


    const context = relevantChunks.map((c) => c.description).join("\n\n")

    const finalPrompt = `Answer the question using ONLY the context provided below. If the answer is not in the context, say you don't know.
      
      Context: 
      ${context}
      
      Question: ${userQuestion}`

    const chatModel = genAI.getGenerativeModel({ model: "gemini-flash-latest" })

    const response = await chatModel.generateContent(finalPrompt)
    const text = response.response.text()

    return {
        state: "success",
        message: text,
        data: null
    }

}

server.tool("create-blog", "add a new blog", {
    title: z.string(),
    description: z.string(),
}, async ({ title, description }) => {
    try {
        console.error(`[MCP] Starting Gemini generation for titled: ${title}`);

        const prompt = `Write a concise 3-paragraph professional blog post titled '${title}'. It should be about: ${description}. Return only plain text. Do NOT use any HTML tags, markdown symbols, or code blocks. Separate paragraphs with a blank line. Keep the total length under 400 words.`;
        const aiResult = await model.generateContent(prompt);
        const AI_GENERATED_BLOG = aiResult.response.text().trim();

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

        const aiPromptAnalysis = await model.generateContent(prompt);
        const AI_ANALYSIS_TEXT = aiPromptAnalysis.response.text();

        // Match the schema in models/db.ts (blogId, blogAnalysis)
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

        const prompt = `Expand the highlighted text to make it more detailed, logically structured, and professionally written. Improve clarity, coherence, and depth while maintaining the original intent : \n\n${highlightedText}`

        const aiPromptRewrite = await model.generateContent(prompt)
        const aiRewriteResponse = aiPromptRewrite.response.text()


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

    return {
        messages: [
            {
                role: "user",
                content: {
                    type: "text",
                    text: "You are an expert in creating blogs. Please analyze this text: " + text
                }
            }
        ]
    }
})

// Uncomment this block below ONLY if you want to connect Claude Desktop to this file later!
// async function main() {
//     const transport = new StdioServerTransport()
//     await server.connect(transport)
// }
// 
// main().catch((error) => {
//     console.error("Fatal error running MCP server:", error)
// })