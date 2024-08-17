"use client"
import axios from "axios";
import Analysis from "../components/Analysis";

import React, { useEffect, useState } from "react";
// import React from "react";
export default function AnalysisComponent(){
    const [data,setData]=useState<any>([])
    
    useEffect(()=>{
        async function fetch(){

            try{
                const d=await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/urlCountData`)
                console.log(d.data.data)
                setData(d.data.data)
            }
            catch(error){
                console.error(error)
            }
        }
        fetch()
    },[])
    return(
        <Analysis data={data}/>
        // <p>hello</p>
    )
}