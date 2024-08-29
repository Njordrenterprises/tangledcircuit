import { FreshContext } from "$fresh/server.ts";

const IMAGES_PER_PAGE = 10;

export const handler = async (req: Request, _ctx: FreshContext): Promise<Response> => {
  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || String(IMAGES_PER_PAGE));

  try {
    const images = [];
    for await (const dirEntry of Deno.readDir('static/images')) {
      if (dirEntry.isFile) {
        images.push(dirEntry.name);
      }
    }

    // Shuffle the images array
    for (let i = images.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [images[i], images[j]] = [images[j], images[i]];
    }

    const start = (page - 1) * limit;
    const paginatedImages = images.slice(start, start + limit);
    const hasMore = images.length > start + limit;

    return new Response(JSON.stringify({ images: paginatedImages, hasMore }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error('Error reading image directory:', error);
    return new Response(JSON.stringify({ images: [], hasMore: false }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};