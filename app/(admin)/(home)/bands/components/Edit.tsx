import { Button } from "@/app/components/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import {BandPathSchema, BandSchema} from "@/app/schema/band.shama"
import z from "zod"
import Loading from "@/app/components/Loading";
import toast, { Toaster } from 'react-hot-toast';
import { Band } from "@/app/generated/prisma";
import Image from "next/image";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>,
  setCurrentPage:Dispatch<SetStateAction<number>>
   bandToEdit:Band|null,
    onSuccess :()=>void
}
type BandFormData = z.infer< typeof  BandPathSchema> //( z.infer< typeof BandSchema>)infere o tipo de SCHEMA para o BandFormdata


export function Edit({ setIsOpen ,onSuccess,bandToEdit}: Props) {
    const [isLoading,setIsLoading]=useState<boolean>(false)
   const [changecover,setChangeCover]=useState<boolean>(false)


    const {register,handleSubmit,formState:{errors},reset}=useForm<BandFormData>({
        resolver:zodResolver(BandPathSchema),
        shouldUnregister:true,
        defaultValues:{
            status:"active",
            id:bandToEdit?.id,
            name:bandToEdit?.name,
            description:bandToEdit?.description||"",
            cover:bandToEdit?.cover_url||"",
            slug:bandToEdit?.slug

           
        }
    })
  


    const onSubmit=async (data:BandFormData)=>{
        try {
            setIsLoading(true)
                const idFinal = data.id || bandToEdit?.id;
    
    if (!idFinal) {
      toast.error("ID da banda não encontrado");
      return;
    }

       
      const bandFormData= new FormData()
      bandFormData.append("id",idFinal)
      bandFormData.append("name",data.name)
      bandFormData.append("slug",data.slug)
      bandFormData.append("status",data.status)
      bandFormData.append("description",data.description||"")

      if(data.cover){
     const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
         if (fileInput && fileInput.files && fileInput.files.length > 0) {

            bandFormData.append("cover", fileInput.files[0]); 

    } else {
      alert("Por favor, selecione uma imagem de capa.");
      return;
    }
      }

   

      const response =await fetch(`http://localhost:3001/api/band`,{
        method:"PATCH",
        body:bandFormData,
        
        
       })
       console.log(response)
       
       if(response.status===200){
        toast.success(`Banda atualizada com suceso!`)
        onSuccess()
          setIsLoading(false)
          setIsOpen(false)
       }
       
       

        } catch (error) {
             setIsLoading(false)
            console.log(error)
           if(error instanceof Error){
             toast.error(error.message)
           }else{
              toast.error("Erro ao atualizar banda")
           }
        }finally{
            setIsLoading(false)
        }
    }
    
  return (
    <>
    
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 ">
     
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl relative">
        
        <button 
          onClick={() => setIsOpen(false)} 
          className="absolute top-4 right-6 text-gray-400 hover:text-gray-700 text-2xl font-semibold cursor-pointer transition-colors"
          aria-label="Fechar"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-gray-800 mb-6">
          Editar Banda
        </h2>

        <form action="" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
             <input type="hidden" {...register("id")} />
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Nome:</span>
              <input {...register("name")} type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5"  />
              {errors.name&&(<p className="text-red-500">{errors.name.message}</p>)}
            </label>
              <input type="hidden"{...register("status")} />
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
              <span className="font-semibold text-sm text-gray-700">Status:</span>
              
              <select  {...register("status")} className="w-full p-2 border border-gray-300 rounded-xl ">
                <option value="active">Active</option>
                 <option value="inactive">Inactive</option>
              </select>
              {errors.slug&&(<p className="text-red-500">{errors.status?.message}</p>)}

              <div>
                 <span className="font-semibold text-sm text-gray-700">Capa Atual:</span>
                 <div className="space-y-2">
                  <div className="relative  w-full h-48 rounded-2xl overflow-hidden "> 
                     <Image 
                     src={`/uploads/${bandToEdit?.cover_url||null}`}
                      alt={"Capa Atual"}
                      width={420}
                      height={420}
                      className="w-full h-full object-cover"
                      />
                      </div>
                 </div>
              </div>
            
           </label>
       
        <a  className="cursor-pointer" onClick={()=>setChangeCover(!changecover)}>Alterar Capa</a>
            { changecover&&(  
              <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Capa:</span>
              
              <input  {...register("cover")} type="file" className="w-full p-2 border border-gray-300 rounded-xl file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" accept=".png,.jpg, .jpeg"/>
            
           </label>)
          
}
          </div>

          <div className="flex justify-end gap-3 mt-2">
           
            <Button  disabled={isLoading} className=" flex w-[120px] justify-center" >
                {isLoading?<Loading width={20} heigth={20} />:"Editar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
}


