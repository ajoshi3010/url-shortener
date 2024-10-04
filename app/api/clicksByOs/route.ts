import client from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Function to get clicks grouped by os for a given shortUrlId
const getClicksByos = async (shortUrlId: string) => {
  const clicks = await client.click.groupBy({
    by: ['os'],
    where: {
      shortUrlId: shortUrlId,
    },
    _count: {
      os: true,
    },
  });

  return clicks.map(click => ({
    os: click.os,
    clicks: click._count.os,
  }));
};

// Handler for GET requests
export async function GET(req: NextRequest) {
  // Extract shortUrlId from query parameters
  const { searchParams } = new URL(req.url);
  const shortUrlId = searchParams.get('shortUrlId');

  if (!shortUrlId) {
    return NextResponse.json({ error: "shortUrlId is required" }, { status: 400 });
  }

  // Fetch clicks grouped by os
  const clicks = await getClicksByos(shortUrlId);

  // Return the clicks data as JSON
  return NextResponse.json({ clicks });
}
