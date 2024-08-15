// import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const client=new PrismaClient()
export async function POST(req:NextRequest){
    const {realUrl,userUrl}=await req.json();
    try{

        const urlmap=await client.urlmap.create({
    
            data:{
                realUrl,
                userUrl
            }
        }
        )
        console.log(urlmap);
    }
    catch(err){
        return NextResponse.json({done:false,yourUrl:userUrl});
    }

    return NextResponse.json({done:true})
}