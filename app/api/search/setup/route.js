import { NextResponse } from "next/server";

import { createSearchIndex } from "@/lib/search/createSearchIndex";

export async function POST() {
  try {
    const result = await createSearchIndex();

    return NextResponse.json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error("Search setup error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create search index.",
      },
      {
        status: 500,
      }
    );
  }
}