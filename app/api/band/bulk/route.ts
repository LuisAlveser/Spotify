import * as z from "zod"; 
import {BandSchema,BandSchemaArray} from "../../../schema/band.shama" 
import  {prisma} from "../../../lib/prisma"



export async function POST(request:Request) {
      const data = await request.json()

      if(Array.isArray(data)){
          const validador=  BandSchemaArray.parse(data)
           return Response.json({msg:"Json único",validador},{status:200})
           
      }else{
        return Response.json({error:"Dados encaminhados em formato inválido"},{status:400})
      }
        
}