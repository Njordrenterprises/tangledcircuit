import { FreshContext } from "$fresh/server.ts";

export const handler = async (_req: Request, _ctx: FreshContext): Promise<Response> => {
  try {
    const images = [];
    for await (const dirEntry of Deno.readDir('static/images')) {
      if (dirEntry.isFile) {
        images.push(dirEntry.name);
      }
    }
    return new Response(JSON.stringify(images), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error reading image directory:', error);
    return new Response(JSON.stringify([]), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};