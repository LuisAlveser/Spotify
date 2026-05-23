import { Button } from "@/app/components/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import {BandPathSchema, BandSchema} from "@/app/schema/band.shama"
import z from "zod"

import toast, { Toaster } from 'react-hot-toast';
import { Band } from "@/app/generated/prisma";


interface Props {
 setRemoveIsOpen: Dispatch<SetStateAction<boolean>>,
  setCurrentPage:Dispatch<SetStateAction<number>>
   bandToRemove:Band|null,
    onSuccess :()=>void
}
type BandFormData = z.infer< typeof  BandPathSchema> //( z.infer< typeof BandSchema>)infere o tipo de SCHEMA para o BandFormdata


export function Remove({ setRemoveIsOpen ,onSuccess,bandToRemove}: Props) {
    const [isLoading,setIsLoading]=useState<boolean>(false)
   const [changecover,setChangeCover]=useState<boolean>(false)



    const handleRemove=async ()=>{
      try {
      setIsLoading(true) 

      const response = await fetch("http://localhost:3001/api/band", {
        method: "DELETE",
        body: JSON.stringify({ id: bandToRemove?.id }),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) { 
        toast.success(`Banda removida com sucesso!`)
        onSuccess()
        setRemoveIsOpen(false)
      } else {
        const errorData = await response.json()
        toast.error(errorData.msg || "Erro ao remover banda.")
      }
    } catch (error) {
      console.error(error)
      toast.error("Erro de conexão com o servidor.")
    } finally {
      setIsLoading(false) 
    }
  
    }
  
  return (
    <>
    
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 ">
     
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl relative">
        
        <button 
          onClick={() => setRemoveIsOpen(false)} 
          className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-2xl font-semibold cursor-pointer transition-colors"
          aria-label="Fechar"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Confirmar Remoção dessa  Banda ?
        </h2>
        <p>Banda{ bandToRemove?.name}</p>
        <Button   onClick={handleRemove} className=" flex w-[120px] justify-center" >
                       Confirmar
                    </Button>
      </div>
    </div>
    </>
  );
}


