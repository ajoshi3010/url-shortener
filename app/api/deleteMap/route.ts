// app/api/shortUrls/deleteUrl/route.ts

import { NextRequest, NextResponse } from "next/server";
import client from "@/app/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    // Parse the incoming request body
    const { userUrl } = await req.json();

    // Validate userUrl
    if (!userUrl) {
      return NextResponse.json(
        { message: "userUrl is required." },
        { status: 400 }
      );
    }

    // Attempt to delete the short URL
    const deleteUrl = await client.shortURL.delete({
      where: {
        shortUrl: userUrl,
      },
    });

    return NextResponse.json(
      { message: `Successfully deleted user URL: ${userUrl}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting URL:", error); // Log the error for debugging

    return NextResponse.json(
      { message: "Failed to delete the URL. It may not exist." },
      { status: 500 }
    );
  }
}
