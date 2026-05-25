'use server'

import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function feachBandsActions(page:number=1,take:number=10) {
     const response = await fetch(`http://localhost:3000/api/band?page=${page}&take=${take}`);
    
    try {
    
  
       
        const currentPage:number= page
        
        const skip:number=(page-1)*take
        
        const totalItems =await prisma.band.count()
        const totalPages=Math.ceil(totalItems/take)

        const bandas = await prisma.band.findMany({
            skip:skip,take:take,orderBy:{created_at:"desc"}
        })
      
        if(!bandas){
             return NextResponse.json({msg:"API rest GET"},{status:404})
        }
         return {pagination:{currentPage,totalItems,totalPages}, bands:bandas}
    } catch (error) {
       console.error(error)
        
    }
    

     return response.json()
}