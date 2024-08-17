import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

const prisma = new PrismaClient();

async function getUserUrlsWithCount(userId: string) {
  // Step 1: Get all userUrls for the given userId
  const userUrls = await prisma.userurls.findMany({
    where: {
      userId: userId,
    },
    select: {
      userUrl: true,
    },
  });
  console.log(userUrls);

  // Step 2: Fetch counts for these userUrls and await all promises
  const result = await Promise.all(
    userUrls.map(async (url) => {
      const count = await prisma.urlcount.findUnique({
        where: {
          userUrl: url.userUrl,
        },
        select: {
          count: true,
        },
      });
      return { userUrl: url.userUrl, count: count ? count.count : 0 }; // Handle case where count may be null
    })
  );

  return result;
}

export async function GET(req: NextRequest) {
  const { userId } = auth();
  if (userId) {
    const data = await getUserUrlsWithCount(userId); // Await the result
    console.log(data);

    return NextResponse.json({ data });
  }
  return NextResponse.json({ data: null });
}