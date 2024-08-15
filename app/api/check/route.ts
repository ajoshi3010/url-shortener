import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

async function checkUrlExists(url: string): Promise<boolean> {
  try {
    const response = await axios.get(url);
    console.log("url exists")
    return response.status === 200;
  } catch (err) {
    console.log(err)
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json(); // Extract the URL from the request body
    console.log(`url:${url}`)
    const isValid = await checkUrlExists(url); // Await the result of the asynchronous function
    return NextResponse.json({ valid: isValid });
  } catch (error) {
    console.error("Error processing the request", error);
    return NextResponse.json({ valid: false }, { status: 500 });
  }
}