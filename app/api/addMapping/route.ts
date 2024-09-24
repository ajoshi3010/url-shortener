import client from '@/app/lib/prisma';
import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { userId } = auth();  // `userId` is optional
    const { realUrl, userUrl } = await req.json();

    try {
        let createdShortURL;

        if (userId) {
            // Check if the user exists in the database
            let user = await client.user.findUnique({
                where: {
                    id: userId,
                },
            });

            // If user doesn't exist, create the user
            if (!user) {
                user = await client.user.create({
                    data: {
                        id: userId,
                    },
                });
            }

            // Create a ShortURL entry associated with the user
            createdShortURL = await client.shortURL.create({
                data: {
                    realUrl,
                    shortUrl: userUrl,
                    userId,
                },
            });
        } else {
            // Create a ShortURL entry without a userId (no user association)
            createdShortURL = await client.shortURL.create({
                data: {
                    realUrl,
                    shortUrl: userUrl,
                },
            });
        }

        return NextResponse.json({ done: true, data: createdShortURL });

    } catch (err) {
        console.error('Error creating short URL:', err);
        return NextResponse.json({ done: false, error: 'An error occurred while creating the short URL' }, { status: 500 });
    }
}
