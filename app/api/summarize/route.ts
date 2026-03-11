export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: `Summarize this text in 3 sentences:\n\n${text}` }],
        max_tokens: 300
      })
    });

    const data = await response.json();
    console.log("Groq response:", JSON.stringify(data, null, 2));

    const summary = data.choices[0].message.content;
    return Response.json({ summary });

  } catch (error) {
    console.error("API Error:", error);
    return Response.json({ error: "Summarization failed" }, { status: 500 });
  }
}
