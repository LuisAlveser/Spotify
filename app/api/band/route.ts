import {BandSchema,BandPathSchema} from "../../schema/band.shama" 
import  {prisma} from "../../lib/prisma"
import {mkdir,writeFile} from "node:fs/promises"
import z from "zod"
import path from "node:path"
import crypto from "node:crypto"
import { NextResponse } from "next/server";

const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

import { NextRequest } from "next/server"
import { unlink } from "node:fs"




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
      
    },{status:201});

  } catch (error: unknown) {
    console.error("Erro na rota POST:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Erro na validação de campos"}, { status: 400 });
    }

    return NextResponse.json({ error: "Erro interno no servidor" }, { status: 500 });
  }
}



export async function DELETE(request:NextRequest) {
     try {
      const data = await request.json()
      if (!data.id) {
      return NextResponse.json({ msg: "Id não informado" }, { status: 400 })
    }
    
         await prisma.band.delete({where:{id:data.id}})
         return NextResponse.json({ msg: "Banda excluida com sucesso " }, { status: 200 })
     
      
     } catch (error) {
        console.log(error)
       return NextResponse.json({ msg: "Erro no servidor" }, { status: 500 })
      
     }
}


export async function PATCH(request: NextRequest) {
  try {
    const uploadFolder = path.join(process.cwd(), "public", "uploads");
    const formdata = await request.formData()
    const data = {
      id: formdata.get("id"),
      name: formdata.get("name"),
      slug: formdata.get("slug"),
      description: formdata.get("description") || "",
      status: formdata.get("status"),
      cover: null 
    };

    const validador = BandPathSchema.parse(data);
    const file = formdata.get("cover") as unknown as File;
    const coverold = await prisma.band.findFirst({ where: { id: validador.id } })

   
    if (file && coverold?.cover_url) {
      const filepathdel = path.join(uploadFolder, coverold.cover_url);
      
     
      try {
        await unlink(filepathdel,()=>{}); 
      } catch (unlinkError: any) {
        if (unlinkError.code === "ENOENT") {
          console.warn(`Aviso: O arquivo ${coverold.cover_url} não foi encontrado no disco, prosseguindo...`);
        } else {
          throw unlinkError; 
        }
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

      const update = await prisma.band.update({
        where: { id: validador.id },
        data: {
          name: validador.name,
          slug: validador.slug,
          description: validador.description,
          status: validador.status,
          cover_url: fileName
        }
      })

      return NextResponse.json({ msg: "Banda updated" }, { status: 200 })
    }

   
    if (file === null && coverold?.cover_url) {
      const update = await prisma.band.update({
        where: { id: validador.id },
        data: {
          name: validador.name,
          slug: validador.slug,
          description: validador.description,
          status: validador.status,
          cover_url: coverold.cover_url
        }
      })

      return NextResponse.json({ msg: "Banda atualizada" }, { status: 200 })
    }

    
    if (file === null && !coverold?.cover_url) {
      const update = await prisma.band.update({
        where: { id: validador.id },
        data: {
          name: validador.name,
          slug: validador.slug,
          description: validador.description,
          status: validador.status,
          cover_url: null
        }
      })

      return NextResponse.json({ msg: "Banda atualizada" }, { status: 200 })
    }


    if (file && !coverold?.cover_url) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadbuffer = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadbuffer, { recursive: true });

      const uniqueName = crypto.randomUUID();
      const extension = path.extname(file.name);
      const fileName = `${uniqueName}${extension}`;
      const filepath = path.join(uploadbuffer, fileName);

      await writeFile(filepath, buffer);
      
      const update = await prisma.band.update({
        where: { id: validador.id },
        data: {
          name: validador.name,
          slug: validador.slug,
          description: validador.description,
          status: validador.status,
          cover_url: fileName
        }
      })

      return NextResponse.json({ msg: "Banda atualizada" }, { status: 200 })
    }

  } catch (error: unknown) {
    console.log(error)
    return NextResponse.json({ msg: "Erro no servidor" }, { status: 500 })
  }
}

export async function HEAD() {
    return NextResponse.json({msg:"API rest GET"})
}

