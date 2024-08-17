// import { PrismaClient } from "@prisma/client"
import { NextRequest, NextResponse } from "next/server"
// import { auth} from '@clerk/nextjs/server'
// import { Result } from "postcss"
import client from "@/app/lib/prisma";
export async function POST(req:NextRequest){
    // const { userId } = auth()
    const {userId}=await req.json();
    console.log(userId)
    if(userId){
        
        const userUrls=await client.userurls.findMany({
            where:{
                userId:userId
            },
            select:{
                userUrl:true
            }
        })

        const result=await Promise.all(userUrls.map(async (url)=>{
            const realUrl=await client.urlmap.findFirst({
                where:{
                    userUrl:url.userUrl
                },
                select:{
                    realUrl:true
                }
            })
            return {userUrl:url.userUrl,realUrl:realUrl}
        }))
        return NextResponse.json({urls:result,message:"Success"});
    }
    return NextResponse.json({message:"Please sign in"})
}