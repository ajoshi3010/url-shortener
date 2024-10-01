import { NextRequest, NextResponse } from 'next/server';
import client from '../lib/prisma';

// Helper function to get the OS info from the user-agent
const getOSInfo = (userAgent: string): string => {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Macintosh')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('like Mac')) return 'iOS'; // iPad or iPhone
    if (userAgent.includes('CrOS')) return 'Chrome OS'; // Chrome OS devices
    if (userAgent.includes('FreeBSD')) return 'FreeBSD';
    if (userAgent.includes('NetBSD')) return 'NetBSD';
    if (userAgent.includes('OpenBSD')) return 'OpenBSD';
    if (userAgent.includes('SunOS')) return 'Solaris';
    if (userAgent.includes('BlackBerry')) return 'BlackBerry';
    if (userAgent.includes('BB10')) return 'BlackBerry 10';
    if (userAgent.includes('IEMobile')) return 'Windows Phone';
    if (userAgent.includes('Opera Mini')) return 'Opera Mini';
    
    return 'Unknown OS'; // Default value for unrecognized OS
};


export async function POST(req: NextRequest) {
    try {
        // Extract the user-agent and IP address
        const userAgent = req.headers.get('user-agent') || '';
        const ipAddress = req.headers.get('x-forwarded-for') || req.ip;

        // Get the OS info
        const osInfo = getOSInfo(userAgent);

        // Get the request body
        const { customUrl } = await req.json();

        // Check for the real URL
        const realUrl = await client.shortURL.findUnique({
            where: {
                shortUrl: customUrl,
            },
            select: {
                realUrl: true,
            },
        });
        
        if (realUrl) {
            const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/click`;
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ osInfo, ipAddress, customUrl }),
            });

            if (!response.ok) {
                console.error('Failed to invoke /api/click:', await response.text());
            }

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
