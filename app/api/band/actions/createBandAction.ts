'use server'
import { Band } from "@/app/generated/prisma";
import { prisma } from "@/app/lib/prisma";
import { BandSchema } from "@/app/schema/band.shama";

import { mkdir, writeFile } from "node:fs/promises";
import {z} from "zod";
import path from "node:path"
import crypto from "node:crypto"
import { NextResponse } from "next/server";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

import { NextRequest } from "next/server"
import { unlink } from "node:fs"
import { callbackify } from "node:util";
import { error } from "node:console";


type BandFormValues=z.infer<typeof  BandSchema>
 export type CreateBandFormSate={
  status:"idle"|"loading"| "success"|"error" ,
  ok:boolean,
  message?:string,
  errors?:Record<string,string[]>,
  values?:BandFormValues
}

export async function createfeacthaction( _prevstate:CreateBandFormSate,formData:FormData):Promise<CreateBandFormSate>{
        try {
           
             const data = {
      name: formData.get("name") as string,
      slug: formData.get("slug") as string,
      description: (formData.get("description") || "") as string,
      status: formData.get("status")||"active" as string,
      cover:null
    };
     const validador = BandSchema.safeParse(data); 
   
       if(!validador.success){
   const treeErrors= validador.error.flatten().fieldErrors
        
        return {
            ok:false,
            message:"Verifique os campos",
            errors:treeErrors as Record<string, string[]>,
            values:{...data,status:"active"},
            status:"error"
        }
       }
         //=> Retorna um objeto com os detalhes do erro
     const file = formData.get("cover") as unknown as File;
     
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
    
        const uploadbuffer = path.join(process.cwd(), "public", "uploads");
        await mkdir(uploadbuffer, { recursive: true  });
    
        const uniqueName = crypto.randomUUID();
        const extension = path.extname(file.name);
        const fileName = `${uniqueName}${extension}`;
        const filepath = path.join(uploadbuffer, fileName);
        
        await writeFile(filepath, buffer,);
        const bandsexists = await prisma.band.findFirst({
      where: { name: validador.data.name },
    });
    
    if (bandsexists) {
      return {ok:false,message:"Banda já cadastrada", status:"error"}
    }
    const insertedItem = await prisma.band.create({
      data: {
        name: validador.data.name,
        slug: validador.data.slug,
        description: validador.data.description,
        status: validador.data.status,
        cover_url: fileName,
      },
    });
    

     return{ok:true,message:"Banda cadastrada com sucesso ",status:"success"}



    
    
        } catch (error) {
            
           return{ok:false,message:"Erro no servidor",status:"error"}
        }
}