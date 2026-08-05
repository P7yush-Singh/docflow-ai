import { NextResponse } from "next/server";

import { getRedisClient } from "@/lib/redis/client";

const INDEX_NAME = "idx:docflow:docs";

function escapeQuery(value) {
  return value.replace(
    /[,.<>{}\[\]"':;!@#$%^&*()\-+=~|/\\]/g,
    " "
  );
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const rawQuery = searchParams.get("q")?.trim();

    if (!rawQuery) {
      return NextResponse.json({
        success: true,
        query: "",
        results: [],
      });
    }

    const safeQuery = escapeQuery(rawQuery);

    if (!safeQuery.trim()) {
      return NextResponse.json({
        success: true,
        query: rawQuery,
        results: [],
      });
    }

    const redis = await getRedisClient();

    const searchQuery = safeQuery
      .split(/\s+/)
      .filter(Boolean)
      .map((word) => `${word}*`)
      .join(" ");

    const response = await redis.ft.search(
      INDEX_NAME,
      searchQuery,
      {
        LIMIT: {
          from: 0,
          size: 10,
        },

        RETURN: [
          "slug",
          "title",
          "description",
        ],
      }
    );

    const results = response.documents.map(
      (document) => ({
        id: document.id,

        slug: document.value.slug,

        title: document.value.title,

        description:
          document.value.description,
      })
    );

    return NextResponse.json({
      success: true,
      query: rawQuery,
      total: response.total,
      results,
    });
  } catch (error) {
    console.error("Search API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Search failed.",
      },
      {
        status: 500,
      }
    );
  }
}