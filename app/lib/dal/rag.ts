import { blogChunkSchemaTable } from "@/app/models/db";
import { getOpenRouterEmbedding } from "./openrouter";

export async function storeBlogInVectorDB(blogId: string, description: string) {
    try {

        const sentences = description.split(/(?<=[.!?])\s+/);

        const chunks = []
        let current = ""
        let overlap = "";


        for (let sentence of sentences) {
            if ((current + sentence).length > 500) {

                chunks.push(current);

                overlap = current.split(". ").slice(-1).join(". ");

                current = overlap + " " + sentence;

            } else {

                current += " " + sentence;
            }

        }
        if (current) chunks.push(current)


        for (let chunk of chunks) {
            const embedding = await getOpenRouterEmbedding(chunk);

            console.log("embedding", embedding)

            await blogChunkSchemaTable.create({
                blogId,
                description: chunk,
                embeddings: embedding
            })
        }

    } catch (error) {
        console.log(error)
    }
}