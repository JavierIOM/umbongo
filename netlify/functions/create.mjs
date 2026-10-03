import { getStore } from "@netlify/blobs";

const ALPHABET = "23456789abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const SLUG_LENGTH = 6;
const MAX_URL_LENGTH = 2048;

const RESERVED = new Set([
  "api",
  "images",
  "favicon-32",
  "favicon",
  "apple-touch-icon",
  "og-image",
  "index",
]);

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function randomSlug() {
  let s = "";
  for (let i = 0; i < SLUG_LENGTH; i++) {
    s += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return s;
}

function isValidUrl(value) {
  if (!value || value.length > MAX_URL_LENGTH) return false;
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function isValidSlug(slug) {
  return /^[a-zA-Z0-9-]{3,32}$/.test(slug) && !RESERVED.has(slug.toLowerCase());
}

export default async (req) => {
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return json({ error: "Invalid JSON body" }, 400);
  }

  const targetUrl = String(body.url || "").trim();
  const customSlug = String(body.slug || "").trim();

  if (!isValidUrl(targetUrl)) {
    return json({ error: "Enter a valid http(s) URL" }, 400);
  }

  const store = getStore("links");
  let slug = customSlug;

  if (slug) {
    if (!isValidSlug(slug)) {
      return json({ error: "Alias must be 3-32 letters, numbers or hyphens" }, 400);
    }
    const existing = await store.get(slug);
    if (existing) {
      return json({ error: "That alias is already taken" }, 409);
    }
  } else {
    for (let i = 0; i < 10; i++) {
      const candidate = randomSlug();
      if (!(await store.get(candidate))) {
        slug = candidate;
        break;
      }
    }
    if (!slug) return json({ error: "Could not generate a free slug, try again" }, 500);
  }

  await store.setJSON(slug, { url: targetUrl, created: new Date().toISOString() });

  return json({ slug, shortUrl: `https://umbo.ngo/${slug}` }, 200);
};

export const config = { path: "/api/create" };
