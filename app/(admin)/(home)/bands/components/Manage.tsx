'use client'

import { Button } from "@/app/components/Button";
import { Create } from "@/app/(admin)/(home)/bands/components/Create";
import { useState } from "react";
import { List } from "@/app/(admin)/(home)/bands/components/List";


export   function Manage() {
 const[isOpen,setIsOpen]=useState<boolean>(false)
 
  return (
    <section className="overflow-x-auto p-4">
      <header className="flex justify-end mb-4">
         <Button onClick={()=>setIsOpen(true)}>Adicionar</Button>
     
      </header>
       <List/>
       {isOpen&&(<Create setIsOpen={setIsOpen}/>)
       }
        
    </section>
  );
}