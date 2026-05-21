import * as z from "zod"; 

const MAX_SIZE_MB = 5;
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

export const BandSchema = z.object({
  name: z.string().min(1, "O nome precisa ter pelo menos 1 caracter"),
  slug: z.string().min(1, "O slug precisa ter pelo menos 1 caracter"),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  cover: z.any() 
   
});

export const BandSchemaArray = z.array(BandSchema).min(1);