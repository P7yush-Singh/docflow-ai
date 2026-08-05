import { getAllDocs } from "@/lib/mdx/getAllDocs";
import { getRedisClient } from "@/lib/redis/client";
import { cleanContent } from "./cleanContent";

export async function indexDocs() {
  const redis = await getRedisClient();

  const docs = getAllDocs();

  for (const doc of docs) {
    const key = `docflow:doc:${doc.slug}`;

    await redis.hSet(key, {
      slug: doc.slug,

      title: doc.title,

      description: doc.description,

      content: cleanContent(doc.content),
    });
  }

  return {
    indexed: docs.length,
  };
}