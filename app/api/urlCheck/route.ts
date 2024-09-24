// app/api/shortUrls/checkUrl/route.ts

import { NextRequest, NextResponse } from "next/server";
import client from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { customUrl } = await req.json();

    // Validate customUrl
    if (!customUrl) {
      return NextResponse.json(
        { message: "customUrl is required." },
        { status: 400 }
      );
    }

    // Check if the URL exists in the database
    const urlEntry = await client.shortURL.findUnique({
      where: {
        shortUrl: customUrl,
      },
    });

    // Return the result in a clear format
    return NextResponse.json({
      exists: urlEntry !== null,
      message: urlEntry ? "URL exists." : "URL does not exist.",
    });
  } catch (error) {
    console.error("Error checking URL:", error); // Log the error for debugging

    return NextResponse.json(
      { message: "An error occurred while checking the URL." },
      { status: 500 }
    );
  }
}
