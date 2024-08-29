import { config } from "https://deno.land/x/dotenv@v3.2.2/mod.ts";
import { Handlers } from "$fresh/server.ts";

const env = config();
const API_KEY = env.NEWS_API_KEY || Deno.env.get("NEWS_API_KEY");
const ITEMS_PER_PAGE = 10;

export const handler: Handlers = {
  async GET(req) {
    const url = new URL(req.url);
    const page = url.searchParams.get('page') || '1';

    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=artificial+intelligence&apiKey=${API_KEY}&page=${page}&pageSize=${ITEMS_PER_PAGE}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  }
};