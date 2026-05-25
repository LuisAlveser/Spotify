'use client'

import { Button } from "@/app/components/Button";
import { Createfeach } from "@/app/(admin)/(home)/bands/components/CreateFeatch";
import { useEffect, useState } from "react";
import { List } from "@/app/(admin)/(home)/bands/components/List";
import { Edit } from "@/app/(admin)/(home)/bands/components/Edit";
import { Band } from "@/app/generated/prisma";
import { BandList } from "../types/common";
import toast, { Toaster } from 'react-hot-toast';
import {feachBandsActions}from "@/app/api/band/actions/feachBandsAction"

export   function Manage() {
 const[isOpen,setIsOpen]=useState<boolean>(false)
  const [data,setData]=useState<BandList|null>(null)
  const [loading,setloading]=useState<boolean>(true)
  const [currentPage,setCurrentPage]=useState<number>(1)

  
   const fetchbands=async(page:number=1)=>{
      try {
       
        setloading(true)
           
         const bandList: BandList = await feachBandsActions(page)
         console.log(bandList.bands)
         setData(bandList)
         
         setloading(false)
        
      } catch (error) {
        console.error("Erro ao carregar dados do servidor:", error);
      

      }finally{
          setloading(false)
      }
     }
   useEffect(()=>{
   
     fetchbands(currentPage)
   },[currentPage])//=>Escuta as alterações feitas nessa variável
   
   
  return (
    <>
    <Toaster  position="bottom-right" />
    <section className="overflow-x-auto p-4">
      <header className="flex justify-end mb-4">
         <Button onClick={()=>setIsOpen(true)}>Adicionar</Button>
     
      </header>
       <List data={data} loading={loading} onSuccess={()=>fetchbands()} currentPage={currentPage} setCurrentPage={setCurrentPage} />
       {isOpen&&(<Createfeach setIsOpen={setIsOpen} onSuccess={()=>fetchbands()} setCurrentPage={setCurrentPage}/>)
       }
      
        
    </section>
    </>
  );
}