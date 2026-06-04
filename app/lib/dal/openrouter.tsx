
export default async function openrouter(messages: { role: string, content: string }[]) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${process.env.OPEN_ROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:3000",
        },
        body: JSON.stringify({
            model: "google/gemini-2.5-flash",
            // Disable thinking mode so content is never null on thinking models
            reasoning: { effort: "none" },
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

