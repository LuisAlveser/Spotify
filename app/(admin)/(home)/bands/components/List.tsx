"use client"
import { Button } from "@/app/components/Button";
import Loading from "@/app/components/Loading";
import { Band } from "@/app/generated/prisma";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { BandList } from "../types/common";
import { Remove} from "./Remove";
import { Edit} from "./Edit";



interface Props{
  data:BandList | null,
  loading:boolean,
  currentPage:number,
  setCurrentPage: Dispatch<SetStateAction<number>>,
   onSuccess:()=>void
}
export   function List({data,loading,currentPage,setCurrentPage,onSuccess}:Props) {
    const [editIsOpen,setEditIsOpen]=useState<boolean>(false)
    const [bandToEdit,setBandToEdit]=useState<Band|null>(null)

    const [bandToRemove,setBandToRemove]=useState<Band|null>(null)
     const [removeIsOpen,setRemoveIsOpen]=useState<boolean>(false)

 const handlePrev=()=> {
  if(currentPage>1){
    setCurrentPage((prev)=>prev-1)
  }

 }
  const handleNext=()=> {
    if(data?.pagination.totalPages){
       if(currentPage<data?.pagination.totalPages){
    setCurrentPage((prev)=>prev+1)
   
  }
}

 }

 const handleEditClick=(band:Band)=>{
     setBandToEdit(band)
     setEditIsOpen(true)
 }
  const handleRemoveClick=(band:Band)=>{
     setBandToRemove(band)
     setRemoveIsOpen(true)
 }
 function TableRow({ band }: { band: Band }) {
  return (
    <tr>
      <td className="px-6 py-4 text-green-800 whitespace-nowrap">
        {band.name}
        </td>
        
      <td className="px-6 py-4 text-green-800 whitespace-nowrap">
         <span className="inline-flex items-center px-2 py-0.5 rounded bg-green-100 text-green-900">
          {band.description && band.description.length>30 
          ?`${band.description.slice(0,30)}...`  
          : band.description }
        </span>
      </td>
     
      <td className={`${band.status==="active"?"px-6 py-4 text-green-800 whitespace-nowrap":"px-6 py-4 text-red-800 whitespace-nowrap"}`}>
        <span className={`inline-flex items-center px-2 py-0.5 rounded ${band.status==="active"?" bg-green-100 text-green-900": " bg-green-100 text-red-900"}`}>
          {band.status}
        </span>
      </td>
      <td className="text-center font-medium space-x-5 whitespace-nowrap">
        <Button  onClick={()=>handleEditClick(band) }>Editar</Button>
        <Button onClick={()=>handleRemoveClick(band)}>Excluir</Button>
      </td>
    </tr>
  );
}

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
               {loading?<Loading width={40} heigth={40}/>:"Nenhum registro encontrado"} 
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {data?.pagination.totalPages&&(
            <Pagination
             totalPages={data.pagination.totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      )}
      {editIsOpen&&
      (<Edit setIsOpen={setEditIsOpen} onSuccess={()=>{onSuccess}}  setCurrentPage={setCurrentPage} bandToEdit={bandToEdit} />
      )}
      {removeIsOpen&&bandToRemove&&
      (< Remove setRemoveIsOpen={setRemoveIsOpen} onSuccess={()=>{onSuccess}}  setCurrentPage={setCurrentPage} bandToRemove={bandToRemove} />
      )}
   
    </>
    
  );
}