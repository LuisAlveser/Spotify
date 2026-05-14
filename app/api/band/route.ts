import {BandSchema,BandSchemaArray} from "../../schema/band.shama" 
import  {prisma} from "../../lib/prisma"




export async function GET() {
    try {
        const bandas = await prisma.band.findMany()
        if(!bandas){
             return Response.json({msg:"API rest GET"},{status:404})
        }
         return Response.json(bandas)
    } catch (error) {
        
    }
    
}
export async function POST(request:Request) {
      const data = await request.json()

      if(typeof data ==="object" && data!==null){
         const validadeShema=BandSchema.parse(data)
         return Response.json({msg:"Json único",validadeShema})
      }else{
        return Response.json({error:"Dados encaminhados em formato inválido"},{status:400})
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

