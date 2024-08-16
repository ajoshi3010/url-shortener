// import { NextApiRequest } from "next";
import { PrismaClient } from "@prisma/client";
import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from "next/server";
const client=new PrismaClient()
export async function POST(req:NextRequest){
    const { userId } = auth()
    const {realUrl,userUrl}=await req.json();
    try{

        const urlmap=await client.urlmap.create({
    
            data:{
                realUrl,
                userUrl
            }
        }
        )
        // console.log(urlmap);
        const urlCount=await client.urlcount.create({
            data:{
                userUrl:userUrl,
                count:0
            }
        })
        if(userId){
            const userUrls=await client.userurls.create({
                data:{
                    userId:userId,
                    userUrl:userUrl
                }
            })
        }
    }
    catch(err){
        return NextResponse.json({done:false,yourUrl:userUrl});
    }

    return NextResponse.json({done:true})
}