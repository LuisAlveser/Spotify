"use client"
import { Button } from "@/app/components/Button";
import { Band } from "@/app/generated/prisma";
import { useEffect, useState } from "react";

export function TableRow({ band }: { band: Band }) {
  return (
    <tr>
      <td className="px-6 py-4 text-green-800 whitespace-nowrap">
        {band.name}
        </td>
        
      <td className="px-6 py-4 text-green-800 whitespace-nowrap">
         <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-900">
          {band.description && band.description.length>30 
          ?`${band.description.slice(0,30)}...`  
          : band.description}
        </span>
      </td>
     
      <td className="px-6 py-4 text-green-800 whitespace-nowrap">
        <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-900">
          {band.status}
        </span>
      </td>
      <td className="text-center font-medium space-x-5 whitespace-nowrap">
        <Button>Editar</Button>
        <Button>Excluir</Button>
      </td>
    </tr>
  );
}

export  function ManageCSR() {
 const [bands,setbands]=useState<Band[]|null>(null)
 useEffect(()=>{
   const fetchbands=async()=>{
    try {
       const response = await fetch("http://localhost:3001/api/band");
       const bands: Band[] = await response.json();
     
       setbands(bands)
       
    } catch (error) {
       Response.json({mgm:"Erro no servidor",status:500})
    }
      
   }
   fetchbands()
 },[])
 

  return (
    <section className="overflow-x-auto p-4">
      <header className="flex justify-end mb-4">
       
        <Button>Adicionar</Button>
      </header>
      <table className="min-w-full border border-gray-200 rounded-sm">
        <thead className="bg-gray-800 text-gray-50 uppercase text-left text-sm">
          <tr>
            <th scope="col" className="px-6 py-3">Nome</th>
            <th scope="col" className="px-6 py-3">Descrição</th>
            <th scope="col" className="px-6 py-3">Status</th>
            <th scope="col" className="px-6 py-3 text-center">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array.isArray(bands) && bands.length > 0 ? (
            bands.map((item) => (
              <TableRow key={item.id} band={item} />
            ))
          ) : (
            <tr>
             
              <td colSpan={3} className="text-center text-gray-500 py-4">
                Nenhum registro encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}