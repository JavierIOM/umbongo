import { getStore } from "@netlify/blobs";

const EXPIRY_MS = 14 * 24 * 60 * 60 * 1000;

export default async (req, context) => {
  const slug = context.params.slug;
  const store = getStore({ name: "links", consistency: "strong" });
  const record = await store.get(slug, { type: "json" });

  if (!record) {
    return new Response("Short link not found", {
      status: 404,
      headers: { "content-type": "text/plain" },
    });
  }

  const age = Date.now() - new Date(record.created).getTime();
  if (age > EXPIRY_MS) {
    await store.delete(slug);
    return new Response("Short link has expired", {
      status: 404,
      headers: { "content-type": "text/plain" },
    });
  }

  return Response.redirect(record.url, 302);
};

export const config = { path: "/:slug" };
