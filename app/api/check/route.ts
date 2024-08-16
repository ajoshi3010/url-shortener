import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { auth, currentUser } from '@clerk/nextjs/server'
async function checkUrlExists(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url, {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      },
    });

    // console.log(`Status code: ${response.status}`);

    // Consider these status codes as "URL exists"
    const validStatusCodes = [200, 301, 302, 303, 307, 308, 401, 403, 406, 429];

    return validStatusCodes.includes(response.status);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      // console.log(`Error status: ${err.response?.status}`);
      // console.log(`Error message: ${err.message}`);
    } else {
      // console.log(`Unexpected error: ${err}`);
    }
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json(); // Extract the URL from the request body
    // console.log(`url:${url}`)
    const isValid = await checkUrlExists(url); // Await the result of the asynchronous function
    return NextResponse.json({ valid: isValid });
  } catch (error) {
    // console.error("Error processing the request", error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}
