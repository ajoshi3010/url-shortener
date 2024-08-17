// import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import client from "@/app/lib/prisma";
export async function DELETE(req:NextRequest){
    try{

        const{userUrl}=await req.json();
        const deleteUrl=await client.urlmap.delete({
            where:{
                userUrl:userUrl
            }
        })
        const deleteUrlcount=await client.urlcount.delete({
            where:{
                userUrl:userUrl
            }
        })
        const deleteUserUrl=await client.userurls.delete({
            where:{
                userUrl:userUrl
            }
        })
        return NextResponse.json({message:`Successfully deleted user url:${userUrl}`})
    }
    catch(error){
        return NextResponse.json({message:"failed to delete"})
    }
}