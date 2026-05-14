


import  {prisma} from "../../lib/prisma"

export async function GET() {
    try {
        const tracks= await prisma.band.findMany()
        if(!tracks){
             return Response.json({msg:"API rest GET"},{status:404})
        }
         return Response.json(tracks)
    } catch (error) {
        
    }
    
}
export async function POST() {
    return Response.json({msg:"API rest GET"})
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

