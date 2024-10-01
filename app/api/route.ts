// import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import client from '../lib/prisma';

// Helper function to get the OS info from the user-agent
const getOSInfo = (userAgent: string): string => {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Macintosh')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    return 'Unknown OS';
};

export async function POST(req: NextRequest) {
    // Extract the user-agent and IP address
    const userAgent = req.headers.get('user-agent') || '';
    const ipAddress = req.headers.get('x-forwarded-for') || req.ip;

    // Get the OS info
    const osInfo = getOSInfo(userAgent);

    // Get the request body
    const { customUrl } = await req.json();


    // Enqueue the data
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
            fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/click`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ osInfo, ipAddress, customUrl }),
            });
            return NextResponse.json(realUrl.realUrl);
        } else {
            return NextResponse.json({ error: 'URL not found' }, { status: 404 });
        }
    } catch (error) {
        // Handle any errors that occur during the query or redirection
        console.error('Error handling POST request:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
