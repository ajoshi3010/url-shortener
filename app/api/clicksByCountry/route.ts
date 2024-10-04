import client from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Function to get clicks grouped by country for a given shortUrlId
const getClicksByCountry = async (shortUrlId: string) => {
  const clicks = await client.click.groupBy({
    by: ['country'],
    where: {
      shortUrlId: shortUrlId,
    },
    _count: {
      country: true,
    },
  });

  return clicks.map(click => ({
    country: click.country,
    clicks: click._count.country,
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

  // Fetch clicks grouped by country
  const clicks = await getClicksByCountry(shortUrlId);

  // Return the clicks data as JSON
  return NextResponse.json({ clicks });
}
