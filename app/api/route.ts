import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
// import { auth, currentUser } from '@clerk/nextjs/server'
import client from '../lib/prisma';

export async function POST(req: NextRequest) {
    // const { userId } = auth()
    const { customUrl } = await req.json();
    try {
        const realUrl = await client.shortURL.findUnique({
            where: {
                shortUrl: customUrl,
            },
            select: {
                realUrl: true,
            },
        });

        if (realUrl) {
            // console.log(realUrl.realUrl)
            // Redirect to the real URL
            return NextResponse.json(realUrl.realUrl);
        } else {
            // Handle case where the URL is not found
            return NextResponse.json({ error: 'URL not found' }, { status: 404 });
        }
    } catch (error) {
        // Handle any errors that occur during the query or redirection
        console.error('Error handling POST request:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
