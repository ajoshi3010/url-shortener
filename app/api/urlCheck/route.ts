import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const client=new PrismaClient();
export async function POST(req:NextRequest){
    const {customUrl}=await req.json();
    const umap=await client.urlmap.findUnique({
        where:{
            userUrl:customUrl
        }
    })
    return NextResponse.json({check:umap==null})
}