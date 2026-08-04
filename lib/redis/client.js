import { createClient } from "redis";

const globalForRedis = globalThis;

const redis =
  globalForRedis.redis ||
  createClient({
    url: process.env.REDIS_URL,
  });

redis.on("error", (error) => {
  console.error("Redis Client Error:", error);
});

if (process.env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}

export async function getRedisClient() {
  if (!redis.isOpen) {
    await redis.connect();
  }

  return redis;
}

export default redis;