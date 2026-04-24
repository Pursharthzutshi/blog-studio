import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod"
import { InsertBlogToDB, FetchBlogFromDB, FetchBlogFromDBById } from "../lib/dal/blog"
import fs from "fs"
import { GoogleGenerativeAI } from "@google/generative-ai"

process.on("uncaughtException", (err) => {
    fs.writeFileSync("mcp-debug.log", `CRASH: ${err.stack || err.message}\n`)
})

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export const server = new McpServer({
    name: "test",
    version: "1.0.0",
})
// @ts-ignore

server.tool("create-blog", "add a new blog", {
    title: z.string(),
    description: z.string(),
}, async ({ title, description }) => {
    try {
        console.error(`[MCP] Starting Gemini generation for titled: ${title}`);

        const prompt = `Write a 5-paragraph professional blog post titled '${title}'. It should be about: ${description}. Please format the response in clean HTML paragraphs without any markdown code blocks.`;
        const aiResult = await model.generateContent(prompt);
        const AI_GENERATED_BLOG = aiResult.response.text();

        console.error(`[MCP] Gemini generation complete. Length: ${AI_GENERATED_BLOG.length}`);

        const insertBlogData = await InsertBlogToDB(title, AI_GENERATED_BLOG)
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

        const fetchBlogs = await FetchBlogFromDBById(id)
        if (!fetchBlogs) {

            return {
                content: [
                    { type: "text" as const, text: "Blog not found" }
                ]
            }
        } else {

            const prompt = `Analyze this blog ${fetchBlogs[0].content.description}`
            const aiPromptAnalysis = await model.generateContent(prompt);
            const AI_GENERATED_Analysis = aiPromptAnalysis.response.text();

            return {
                content: [
                    { type: "text" as const, text: `${AI_GENERATED_Analysis} Blog successfully analyzed with Gemini AI!` }

                ]
            }
        }

    } catch (error) {
        return {
            content: [
                { type: "text" as const, text: "Blog analysis is failed" }
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