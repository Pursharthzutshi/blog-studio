
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
            messages: messages
        })
    });

    const data = await response.json();
    console.log(data)
    return data?.choices?.[0]?.message?.content || "No response";
}

