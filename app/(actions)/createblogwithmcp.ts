"use server"

import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js"
import { server as myLocalServer } from "../mcp/index"

export async function CreateBlogWithMCP(prevState: any, formData: FormData) {
    try {
        const title = formData.get("title") as string
        const description = formData.get("description") as string

        if (!title || !description) {
            return { state: "error", message: "Missing fields", data: null }
        }

        const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()

        try {
            try {
                await (myLocalServer as any).transport?.close();
            } catch (e) { }

            await myLocalServer.connect(serverTransport)

            const client = new Client(
                { name: "blog-website", version: "1.0.0" },
                { capabilities: {} }
            )
            await client.connect(clientTransport)

            const result: any = await client.callTool({
                name: "create-blog",
                arguments: {
                    title,
                    description
                }
            })

            return {
                state: "success",
                message: result.content[0].text,
                data: result
            }
        } finally {
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