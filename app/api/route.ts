import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const client = new PrismaClient();

export async function POST(req: NextRequest) {
    const { customUrl } = await req.json();
    console.log(customUrl)
    try {
        const realUrl = await client.urlmap.findUnique({
            where: {
                userUrl: customUrl,
            },
            select: {
                realUrl: true,
            },
        });

        if (realUrl) {
            console.log(realUrl)
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
