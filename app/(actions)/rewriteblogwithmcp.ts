"use server"

import { Client } from "@modelcontextprotocol/sdk/client/index.js"
import { connectMcp } from "./connect-mcp"


export async function RewriteBlogWithMCP(highlightedText: string, id: string, prevState: any, formData: FormData) {
    console.log("ID from action", id)
    console.log("Highlighted Text", highlightedText)
    console.log(formData)
    try {
        const client: any = await connectMcp()

        const result: any = await client.callTool({
            name: "rewrite-blog",
            arguments: {
                id,
                highlightedText
            }
        })

        return {
            state: "success",
            message: "Blog Rewritten Successfully",
            data: result
        }
    } catch (error: any) {
        console.error("[RewriteBlogWithMCP] Error:", error.message)
        return {
            state: "failed",
            message: `Blog Failed: ${error.message}`,
            data: null
        }
    }
}

