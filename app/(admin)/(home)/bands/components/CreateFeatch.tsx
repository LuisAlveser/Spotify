import { Button } from "@/app/components/Button";
import { Dispatch, SetStateAction, useActionState, useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import {BandSchema} from "@/app/schema/band.shama"
import z from "zod"
import Loading from "@/app/components/Loading";

import {createfeacthaction,CreateBandFormSate} from "@/app/api/band/actions/createBandAction"
import { ok } from "assert";


interface Props {
  setCurrentPage:Dispatch<SetStateAction<number>>
  setIsOpen: Dispatch<SetStateAction<boolean>>,
     onSuccess :()=>void
}
type BandFormData = z.infer< typeof BandSchema> //( z.infer< typeof BandSchema>)infere o tipo de SCHEMA para o BandFormdata


export function Createfeach({ setIsOpen ,onSuccess,setCurrentPage}: Props) {
    const [isLoading,setIsLoading]=useState<boolean>(false)
   
   const INITIAL_STATE:CreateBandFormSate={ok:false,status:"idle"}

    const [state,formAction]=useActionState(createfeacthaction,INITIAL_STATE)
    

     useEffect(()=>{

      if(state.status==="success"){
        if(state.message){
          onSuccess()
          setCurrentPage(1)
     state.message? 
     toast.success(state.message):
     toast.error("Banda cadastrada coom sucesso")
        }
        
      }else if(state.status==="error"){
       toast.error(state.message?state.message:"Erro ao  cadastrar banda")
      }

     },[state])
  return (
    <>
    
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
     
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl relative">
        
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-2xl font-semibold cursor-pointer transition-colors"
          aria-label="Fechar"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Cadastrar Banda com server action
        </h2>

        <form action={formAction} className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Nome:</span>
              <input defaultValue={state.values?.name} name="name" type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5"  />
            {state.errors?.name && (
                  <span className="text-red-500 text-xs mt-1">{state.errors.name[0]}</span>
                )}
            </label>
             
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Slug:</span>
              <input defaultValue={state.values?.slug} name="slug"  type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5"  />
              {state.errors?.slug&&(
                 <span className="text-red-500 text-xs mt-1">{state.errors.slug[0]}</span>
              )}
            </label>
            
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Descrição:</span>
              <textarea  defaultValue={state.values?.description} name="description"  className="w-full p-3 border border-gray-300 rounded-xl min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-black/5"/>
             
            </label>
            
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Capa:</span>
              
              <input name="cover" type="file" className="w-full p-2 border border-gray-300 rounded-xl file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" accept=".png,.jpg, .jpeg"/>
            
           </label>

          </div>

          <div className="flex justify-end gap-3 mt-2">
           
            <Button  disabled={isLoading} className=" flex w-[120px] justify-center" >
                {isLoading?<Loading width={20} heigth={20} />:"Adicionar"}
            </Button>
          
          </div>
        </form>
      </div>
    </div>
    </>
  );
}


