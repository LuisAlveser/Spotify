import {BandSchema} from "../../schema/band.shama" 
import  {prisma} from "../../lib/prisma"
import {mkdir,writeFile} from "node:fs/promises"
import z, { file } from "zod"
import path from "node:path"
import crypto from "node:crypto"
import { NextResponse } from "next/server";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

import { NextRequest } from "next/server"




export async function GET(request:NextRequest) {
    try {
     const url =new URL(request.url)
     const {searchParams}=url
  
       
        const currentPage:number= parseInt(searchParams.get("page")||"1")
        const take :number= parseInt(searchParams.get("take")||"10")//Total de itens exibidos
        const skip:number=(currentPage-1)*take
        
        const totalItems =await prisma.band.count()
        const totalPages=Math.ceil(totalItems/take)

        const bandas = await prisma.band.findMany({
            skip:skip,take:take,orderBy:{created_at:"desc"}
        })
      
        if(!bandas){
             return NextResponse.json({msg:"API rest GET"},{status:404})
        }
         return NextResponse.json({pagination:{currentPage,totalItems,totalPages}, bands:bandas})
    } catch (error) {
       console.error(error)
         return NextResponse.json({msg:"Erro no servidor"},{status:500})
    }
    
}
export async function POST(request: Request) {
  try {
    const formdata = await request.formData();
    
    
    const data = {
      name: formdata.get("name"),
      slug: formdata.get("slug"),
      description: formdata.get("description") || "",
      status: formdata.get("status"),
      cover: null 
    };

   
    const validador = BandSchema.parse(data);

    
    const file = formdata.get("cover") as unknown as File;

    if (!file || typeof file === "string" || file.size === 0) {
      return NextResponse.json({ error: "Arquivo de capa é obrigatório ou inválido" }, { status: 400 });
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json({ error: "O tamanho máximo permitido é de 5MB" }, { status: 400 });
    }

    if (!ACCEPTED_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Tipo inválido. Permitidos: JPEG e PNG" }, { status: 400 });
    }

   
    const bandsexists = await prisma.band.findFirst({
      where: { name: validador.name },
    });
    
    if (bandsexists) {
      return NextResponse.json({ error: "Essa banda já está cadastrada" }, { status: 400 });
    }

   
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadbuffer = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadbuffer, { recursive: true });

    const uniqueName = crypto.randomUUID();
    const extension = path.extname(file.name);
    const fileName = `${uniqueName}${extension}`;
    const filepath = path.join(uploadbuffer, fileName);
    
    await writeFile(filepath, buffer);

    
    const insertedItem = await prisma.band.create({
      data: {
        name: validador.name,
        slug: validador.slug,
        description: validador.description,
        status: validador.status,
        cover_url: fileName,
      },
    });

    return NextResponse.json({
      msg: "Banda cadastrada com sucesso!",
      insertedItem,
      filePath: `/uploads/${fileName}`
    });

  } catch (error: unknown) {
    console.error("Erro na rota POST:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Erro na validação de campos"}, { status: 400 });
    }

    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
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

