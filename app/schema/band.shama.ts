import * as z from "zod"; 

 export const BandSchema =z.object({
    name: z.string(),
    slug:z.string().min(1),
    description:z.string().optional(),
    status:z.enum(["ative","inactive"]),
    cover:z.instanceof(File).refine((file)=> file.size>0,{message:"Arquivo  é obrigatório"})
    

})
export  const BandSchemaArray=z.array(BandSchema).min(1)

