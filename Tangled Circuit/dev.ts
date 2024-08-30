#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import { load } from "https://deno.land/std@0.216.0/dotenv/mod.ts";

await load({ export: true, allowEmptyValues: true });
console.log("Environment variables:", Deno.env.toObject());
console.log("WORLD_NEWS_API_KEY:", Deno.env.get("WORLD_NEWS_API_KEY"));

await dev(import.meta.url, "./main.ts", config);
