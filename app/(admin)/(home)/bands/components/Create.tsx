import { Button } from "@/app/components/Button";
import { Dispatch, SetStateAction, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {BandSchema} from "@/app/schema/band.shama"
import z from "zod"
import Loading from "@/app/components/Loading";


interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
type BandFormData = z.infer< typeof BandSchema> //( z.infer< typeof BandSchema>)infere o tipo de SCHEMA para o BandFormdata


export function Create({ setIsOpen }: Props) {
    const [isLoading,setIsLoading]=useState<boolean>(false)

    const {register,handleSubmit,formState:{errors}}=useForm<BandFormData>({
        resolver:zodResolver(BandSchema),
        defaultValues:{
            status:"active"
        }
    })
    const onSubmit=async (data:BandFormData)=>{
        try {
            setIsLoading(true)
       
      const bandFormData= new FormData()
      bandFormData.append("name",data.name)
      bandFormData.append("slug",data.slug)
      bandFormData.append("status",data.status)
      bandFormData.append("description",data.description||"")

     const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files.length > 0) {
      
      bandFormData.append("cover", fileInput.files[0]); 
    } else {
      alert("Por favor, selecione uma imagem de capa.");
      return;
    }
    return   setTimeout(()=> setIsLoading(false),2000)
      const response =await fetch("http://localhost:3001/api/band",{
        method:"POST",
        body:bandFormData,
        
       })
       if(response.ok){
          setIsLoading(false)
       }
       

        } catch (error) {
             setIsLoading(false)
            console.log(error)
        }
    }
    
  return (
    
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
          Cadastrar Banda
        </h2>

        <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Nome:</span>
              <input {...register("name")} type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5"  />
              {errors.name&&(<p className="text-red-500">{errors.name.message}</p>)}
            </label>
             
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Slug:</span>
              <input {...register("slug")} type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5"  />
              {errors.slug&&(<p className="text-red-500">{errors.slug.message}</p>)}
            </label>
            
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Descrição:</span>
              <textarea  {...register("description")} className="w-full p-3 border border-gray-300 rounded-xl min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-black/5"/>
              {errors.description&&(<p className="text-red-500">{errors.description.message}</p>)}
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Capa:</span>
              
              <input  {...register("cover")} type="file" className="w-full p-2 border border-gray-300 rounded-xl file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" accept=".png,.jpg, .jpeg"/>
            
           </label>

          </div>

          <div className="flex justify-end gap-3 mt-2">
           
            <Button  disabled={isLoading} className=" flex w-[120px] justify-center" >
                {isLoading?<Loading width={20} heigth={20} />:"Salvar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}


