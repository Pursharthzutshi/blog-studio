
export default async function openrouter(messages: { role: string, content: string }[]) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
        },
        body: JSON.stringify({
            model: "openai/gpt-4o-mini", // Switched to a reliable pay-per-use model
            max_tokens: 1000, // Added to prevent OpenRouter from trying to reserve credits for 65,000 tokens
            messages: messages
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("[OpenRouter] HTTP error:", response.status, errorText);
        throw new Error(`OpenRouter API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("[OpenRouter] Response:", JSON.stringify(data, null, 2));

    const message = data?.choices?.[0]?.message;
    // content can be null on thinking models if reasoning is returned instead
    const text = message?.content ?? message?.reasoning ?? null;

    if (!text) {
        console.error("[OpenRouter] Empty content. Full response:", JSON.stringify(data));
        throw new Error("AI returned an empty response. Please try again.");
    }

    return text as string;
}

export async function getOpenRouterEmbedding(text: string): Promise<number[]> {
    const response = await fetch("https://openrouter.ai/api/v1/embeddings", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
        },
        body: JSON.stringify({
            model: "openai/text-embedding-3-small", // reliable pay-per-use embedding model
            input: text
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("[OpenRouter Embed] HTTP error:", response.status, errorText);
        throw new Error(`OpenRouter Embedding error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    return data.data[0].embedding;
}
