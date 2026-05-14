import * as z from "zod"; 



 export const BandSchema =z.object({
    name: z.string(),
    slug:z.string().min(1),
    description:z.string().optional(),
    status:z.enum(["ative","inactive"])
})
export  const BandSchemaArray=z.array(BandSchema).min(1)

