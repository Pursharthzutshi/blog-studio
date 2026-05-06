import { GoogleGenerativeAI } from "@google/generative-ai";
import { blogChunkSchemaTable } from "@/app/models/db";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const embedModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" })

export async function storeBlogInVectorDB(blogId: string, description: string) {
    try {

        const sentences = description.split(/(?<=[.!?])\s+/);

        const chunks = []
        let current = ""

        for (let sentence of sentences) {
            if ((current + sentence).length > 500) {

                chunks.push(current);
                current = "";
            }
            current += sentence + " ";
        }
        if (current) chunks.push(current)


        for (let chunk of chunks) {
            const result = await embedModel.embedContent(chunk);
            const embedding = result.embedding.values;

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