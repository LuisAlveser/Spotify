import { Band } from "@/app/generated/prisma"

 export interface BandList{
  pagination:{
   currentPage:number,
   totalItems:number,
   totalPages:number
  }
  bands:Band[] //=> Model do prisma 
} 