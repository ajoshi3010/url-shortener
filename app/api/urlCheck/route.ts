import { NextRequest, NextResponse } from "next/server";
// import { PrismaClient } from "@prisma/client";
import client from "@/app/lib/prisma";
export async function POST(req:NextRequest){
    const {customUrl}=await req.json();
    const umap=await client.urlmap.findUnique({
        where:{
            userUrl:customUrl
        }
    })
    return NextResponse.json({check:umap==null})
}