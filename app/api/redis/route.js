import { NextResponse } from "next/server";
import { getRedisClient } from "@/lib/redis/client";

export async function GET() {
  try {
    const redis = await getRedisClient();

    await redis.set(
      "docflow:project",
      "DocFlow AI"
    );

    const project = await redis.get(
      "docflow:project"
    );

    return NextResponse.json({
      success: true,
      project,
      message: "Redis SET and GET are working.",
    });
  } catch (error) {
    console.error("Redis API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Redis operation failed.",
      },
      {
        status: 500,
      }
    );
  }
}