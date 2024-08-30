import { Handlers } from "$fresh/server.ts";
import { SYSTEM_PROMPT } from "../api/systemprompt.ts";

const API_KEY = Deno.env.get("PERPLEXITY_API_KEY");

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export const handler: Handlers = {
  async POST(req) {
    if (!API_KEY) {
      console.error("PERPLEXITY_API_KEY is not set");
      return new Response(JSON.stringify({ error: "API key is not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    try {
      const { message } = await req.json();
      console.log("Received message:", message);

      const messages: ChatMessage[] = [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ];

      const response = await fetch("https://api.perplexity.ai/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-70b-instruct",
          messages: messages
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("AI response:", data);

      return new Response(JSON.stringify({
        reply: data.choices[0].message.content
      }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return new Response(JSON.stringify({ error: "Failed to fetch AI response. Please try again later." }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
};