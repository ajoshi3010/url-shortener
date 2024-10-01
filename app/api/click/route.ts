// pages/api/click.ts
import client from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

// Function to fetch country from IP address
const getCountryFromIP = async (ip: string): Promise<string> => {
    // Check for localhost IP addresses
    if (ip === '127.0.0.1' || ip === '::1') {
        return 'Localhost'; // Return a specific value for local addresses
    }

    const response = await fetch(`http://ip-api.com/json/${ip}`);
    if (!response.ok) {
        throw new Error('Failed to fetch IP data');
    }
    const data = await response.json();
    return data.country || "Unknown"; // Default to "Unknown" if country is not returned
};

export async function POST(req: NextRequest) {
    try {
        // Parse incoming request data
        const { osInfo, ipAddress, customUrl } = await req.json();

        // Fetch country from the IP address
        const country = await getCountryFromIP(ipAddress);

        // Create a new entry in the database
        await client.click.create({
            data: {
                shortUrlId: customUrl,
                country: country || "India", // Fallback to "India" if country is not found
                os: osInfo,
            },
        });

        // Return a success message without additional data
        return NextResponse.json({
            message: 'Click recorded successfully',
        });
    } catch (error) {
        // Type assertion to handle error properly
        const errorMessage = (error as Error).message || 'Unknown error occurred';
        console.error('Error in /api/click:', errorMessage);
        return NextResponse.json({ error: 'Internal server error', details: errorMessage }, { status: 500 });
    }
}
