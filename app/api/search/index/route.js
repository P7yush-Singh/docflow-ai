import { NextResponse } from "next/server";

import { indexDocs } from "@/lib/search/indexDocs";

export async function POST() {
  try {
    const result = await indexDocs();

    return NextResponse.json({
      success: true,

      message: "Documentation indexed successfully.",

      indexed: result.indexed,
    });
  } catch (error) {
    console.error(
      "Documentation indexing failed:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to index documentation.",
      },
      {
        status: 500,
      }
    );
  }
}