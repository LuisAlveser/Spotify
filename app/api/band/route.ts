import {BandSchema} from "../../schema/band.shama" 
import  {prisma} from "../../lib/prisma"
import {mkdir,writeFile} from "node:fs/promises"
import z, { file } from "zod"
import path from "node:path"
import crypto from "node:crypto"

import { PrismaClientUnknownRequestError } from "@/app/generated/prisma/runtime/client"
import { NextRequest } from "next/server"




export async function GET(request:NextRequest) {
    try {
     const url =new URL(request.url)
     const {searchParams}=url
  
       
        const currentPage:number= parseInt(searchParams.get("page")||"1")
        const take :number= parseInt(searchParams.get("take")||"10")
        const skip:number=(currentPage-1)*take
        
        const totalItems =await prisma.band.count()
        const totalPages=Math.ceil(totalItems/take)

        const bandas = await prisma.band.findMany({
            skip:skip,take:take,orderBy:{created_at:"desc"}
        })
      
        if(!bandas){
             return Response.json({msg:"API rest GET"},{status:404})
        }
         return Response.json({pagination:{currentPage,totalItems,totalPages}, bands:bandas})
    } catch (error) {
         return Response.json({msg:"Erro no servidor"},{status:500})
    }
    
}
export async function POST(request:Request) {
     try {
         const formdata = await request.formData()
         const data={
            name:formdata.get("name"),
            slug:formdata.get("slug"),
            description:formdata.get("description") ||"",
            status:formdata.get("status"),
            cover:formdata.get("cover_url")

         }
          

         if(!(data.cover instanceof File)){
             throw new Error("Tipo inválido de arquivo")
         }
          const validador=BandSchema.parse(data)

          const bandsexists=await prisma.band.findFirst({where:{name:validador.name}})
          if(!bandsexists){
              return   Response.json({error:"Essa banda já está cadastrada"},{status:400})
          }
         const arryBuffer=await data.cover.arrayBuffer();
             const buffer=Buffer.from(arryBuffer)

             const uploadbuffer=path.join(process.cwd(),"public","uploads")
             await mkdir(uploadbuffer, { recursive: true });

             const uniqueName=crypto.randomUUID()
             const extension=path.extname(data.cover.name)
             const fileName=`${uniqueName}${extension}`
             const filepath=path.join(uploadbuffer,fileName)
             await writeFile(filepath,buffer)
         const  {cover,...datawithoutCover}=validador

          const insertedItem = await prisma.band.create({
            data:{
                name:validador.name,
                slug:validador.slug,
                description:validador.description,
                status:validador.status,
                cover_url:fileName
            }
        
        })
        return Response.json({
            msg:"FormaData",insertedItem,
            filePath:`/uploads/${data.cover.name}`})
         
     } catch (error:unknown) {
         if(error instanceof z.ZodError){
          
         return   Response.json({error:"Erro na validação"},{status:400})
         }
         if(error instanceof PrismaClientUnknownRequestError){
              return   Response.json({error:""},{status:400})
         }
         console.log(error)
        return   Response.json({error:"Erro no servidor"},{status:500})
     } 
   
      
        
}
export async function DELETE() {
    return Response.json({msg:"API rest GET"})
}
export async function PATH() {
    return Response.json({msg:"API rest GET"})
}
export async function HEAD() {
    return Response.json({msg:"API rest GET"})
}

