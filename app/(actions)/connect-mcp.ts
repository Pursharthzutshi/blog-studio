import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory"
import { server as myLocalServer } from "../mcp/index"
import { Client } from "@modelcontextprotocol/sdk/client"

export async function connectMcp() {
    try {
        const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair()

        try {
            await (myLocalServer as any).transport?.close()
        } catch (e) {}

        await myLocalServer.connect(serverTransport)

        const client = new Client(
            { name: "blog-website", version: "1.0.0" },
            { capabilities: {} }
        )

        await client.connect(clientTransport)

        return client
    } catch (error) {
        console.error("[MCP] connectMcp failed:", error)
        throw error
    }
}