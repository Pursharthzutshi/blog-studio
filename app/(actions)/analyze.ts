"use server"

import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js"

export async function AnalyzeBlogAction(prevState: any, formData: FormData) {
    try {
        const blogId = formData.get("blog-id") as string

        if (!blogId) {
            return { state: "error", message: "Please provide a valid Blog ID", data: null }
        }

        // 1. Tell the Client to spawn your MCP server file as a background process
        const transport = new StdioClientTransport({
            command: "npx",
            args: ["tsx", "app/mcp/index.ts"]
        })

        // 2. Initialize the MCP Client
        const client = new Client(
            { name: "my-nextjs-frontend", version: "1.0.0" },
            { capabilities: {} }
        )

        // 3. Connect to the background process
        await client.connect(transport)

        // 4. Request the 'analyze-blog' tool with the exact ID from your web form!
        const response: any = await client.callTool({
            name: "analyze-blog",
            arguments: { id: blogId }
        })

        // Grab the string response sent back by the MCP Tool
        const mcpAnalysisResult = response.content[0].text

        return {
            state: "success",
            message: mcpAnalysisResult,
            data: null
        }

    } catch (error) {
        console.error("MCP Client Error:", error)
        return {
            state: "error",
            message: "Failed to analyze blog with MCP Tool.",
            data: null
        }
    }
}
