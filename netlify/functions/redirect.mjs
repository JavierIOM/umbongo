import { getStore } from "@netlify/blobs";

export default async (req, context) => {
  const slug = context.params.slug;
  const store = getStore("links");
  const record = await store.get(slug, { type: "json" });

  if (!record) {
    return new Response("Short link not found", {
      status: 404,
      headers: { "content-type": "text/plain" },
    });
  }

  return Response.redirect(record.url, 302);
};

export const config = { path: "/:slug" };
