import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory"
import { server as myLocalServer } from "../mcp/index"
import { Client } from "@modelcontextprotocol/sdk/client"

export async function connectMcp() {
    try {
        const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()

        await myLocalServer.connect(serverTransport)

        const client = new Client(
            { name: "blog-website", version: "1.0.0" },
            { capabilities: {} }
        )

        await client.connect(clientTransport)

        return client
    } catch (error) {
        console.error("[MCP] connectMcp failed:", error)
        throw error // ✅ throw so callers know it failed — don't return the Error as if it's a client!
    }
}