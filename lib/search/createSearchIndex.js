import { getRedisClient } from "@/lib/redis/client";

const INDEX_NAME = "idx:docflow:docs";

export async function createSearchIndex() {
  const redis = await getRedisClient();

  // Check if index already exists
  try {
    await redis.ft.info(INDEX_NAME);

    return {
      created: false,
      message: "Search index already exists.",
    };
  } catch (error) {
    // This is expected when the index does not exist yet.
  }

  // Create Redis Search index
  await redis.ft.create(
    INDEX_NAME,
    {
      title: {
        type: "TEXT",
        WEIGHT: 5,
      },

      description: {
        type: "TEXT",
        WEIGHT: 3,
      },

      content: {
        type: "TEXT",
        WEIGHT: 1,
      },

      slug: {
        type: "TAG",
      },
    },
    {
      ON: "HASH",
      PREFIX: "docflow:doc:",
    }
  );

  return {
    created: true,
    message: "Search index created successfully.",
  };
}