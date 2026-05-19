"use client"
import { Button } from "@/app/components/Button";
import Loading from "@/app/components/Loading";
import { Band } from "@/app/generated/prisma";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";


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
interface BandList{
  pagination:{
   currentPage:number,
   totalItems:number,
   totalPages:number
  }
  bands:Band[] //=> Model do prisma 
}
export  function List() {
 const [data,setData]=useState<BandList|null>(null)
 const [loading,setloading]=useState<boolean>(true)
 const [currentPage,setCurrentPage]=useState<number>(1)

 const handlePrev=()=> {
  if(currentPage>1){
    setCurrentPage((prev)=>prev-1)
  }

 }
  const handleNext=()=> {
    if(data?.pagination.totalPages){
       if(currentPage<data?.pagination.totalPages){
    setCurrentPage((prev)=>prev+1)
    console.log(currentPage)
  }
}

 }


 useEffect(()=>{
   const fetchbands=async(page:number)=>{
    try {
      setData(null)
      setloading(true)
       const response = await fetch(`http://localhost:3001/api/band?page=${page}&take=10`);
     
       const bandList: BandList = await response.json();
     
       setData(bandList)
       setloading(false)
      
    } catch (error) {
      console.error("Erro ao carregar dados do servidor:", error);
    }
      
   }
   fetchbands(currentPage)
 },[currentPage])//=>Escuta as alterações feitas nessa variável
 
 
  return (
   
     <>
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
          {Array.isArray(data?.bands) && data.bands.length > 0 ? (
            data.bands.map((item) => (
              <TableRow key={item.id} band={item} />
            ))
          ) : (
            <tr>
             
              <td colSpan={4} className="text-center text-gray-500 py-4">
               {loading?<Loading/>:"Nenhum registro encontrado"} 
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {data?.pagination.totalPages&&(
            <Pagination
             totalPages={data.pagination.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
   
    </>
    
  );
}