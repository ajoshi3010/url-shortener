import { NextRequest, NextResponse } from "next/server";
import client from "@/app/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "Please sign in" }, { status: 401 });
    }

    // Fetch all user URLs along with their real URLs in a single database query
    const userUrls = await client.shortURL.findMany({
      where: { userId: userId },
      select: {
        shortUrl: true,
        realUrl: true,
      },
    });

    // If no URLs are found
    if (userUrls.length === 0) {
      return NextResponse.json({ urls: [], message: "No URLs found for this user" });
    }

    // Return the list of URLs directly
    const result = userUrls.map((url) => ({
      userUrl: url.shortUrl,
      realUrl: url.realUrl,
    }));

    return NextResponse.json({ urls: result, message: "Success" });
  } catch (error) {
    console.error("Error fetching user URLs:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
