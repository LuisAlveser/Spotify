'use client'

import { Button } from "@/app/components/Button";
import { Create } from "@/app/(admin)/(home)/bands/components/Create";
import { useEffect, useState } from "react";
import { List } from "@/app/(admin)/(home)/bands/components/List";
import { Edit } from "@/app/(admin)/(home)/bands/components/Edit";
import { Band } from "@/app/generated/prisma";
import { BandList } from "../types/common";
import toast, { Toaster } from 'react-hot-toast';


export   function Manage() {
 const[isOpen,setIsOpen]=useState<boolean>(false)
  const [data,setData]=useState<BandList|null>(null)
  const [loading,setloading]=useState<boolean>(true)
  const [currentPage,setCurrentPage]=useState<number>(1)

  
   const fetchbands=async(page:number=1)=>{
      try {
       
        setloading(true)
         const response = await fetch(`http://localhost:3001/api/band?page=${page}&take=10`);
       
         const bandList: BandList = await response.json();
         console.log(bandList.bands)
         setData(bandList)
         
         setloading(false)
        
      } catch (error) {
        console.error("Erro ao carregar dados do servidor:", error);
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
       {isOpen&&(<Create setIsOpen={setIsOpen} onSuccess={()=>fetchbands()}/>)
       }
      
        
    </section>
    </>
  );
}