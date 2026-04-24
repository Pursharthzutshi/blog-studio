"use server"

import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js"
import { server as myLocalServer } from "../mcp/index"

export async function AnalyzeBlogAction(prevState: any, formData: FormData) {
    try {
        const blogId = formData.get("blog-id") as string

        if (!blogId) {
            return { state: "error", message: "Please provide a valid Blog ID", data: null }
        }

        // ✅ Using Direct Memory Pipelines for Vercel compatibility
        const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()

        try {
            // 1. Ensure server is not already connected
            try {
                await (myLocalServer as any).transport?.close();
            } catch (e) { }

            // 2. Connect the local server
            await myLocalServer.connect(serverTransport)

            // 3. Initialize and connect the Client
            const client = new Client(
                { name: "blog-website", version: "1.0.0" },
                { capabilities: {} }
            )
            await client.connect(clientTransport)

            // 4. Call the 'analyze-blog' tool
            const result: any = await client.callTool({
                name: "analyze-blog",
                arguments: { id: blogId }
            })

            return {
                state: "success",
                message: result.content[0].text,
                data: result
            }
        } finally {
            // ⭐ Always close the transports
            await clientTransport.close().catch(console.error)
            await serverTransport.close().catch(console.error)
        }

    } catch (err: any) {
        console.error("MCP ERROR:", err)

        return {
            state: "error",
            message: err.message || "Something went wrong",
            data: null
        }
    }
}
