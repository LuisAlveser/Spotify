import { Button } from "@/app/components/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function Create({ setIsOpen }: Props) {
  const[name,setNome]= useState<string>("")
  const[slug,setSlug]= useState<string>("")
  const[description,setDescription]= useState<string>("")
  const[cover,setCover]= useState<string>("")
 
  useEffect(()=>{
   console.log(name,slug,description,cover)
  },[name,slug,description,cover])

  const handleSubmit =(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(validateForm()){
      console.log("Podemos enviar o formulário")
    }
      console.log(e)
  }

  const validateForm=()=>{
    let formIsValid:boolean=true 
    const validateErros:
    {name:null|string
     slug:null|string
    
     cover:null|string
    }={
      name:null,
      slug:null,
      
      cover:null
    }

    
    if(!name.trim()){
      validateErros.name='O nome é obrigátorio'
      formIsValid=false
    }
    if(!slug.trim()){
      validateErros.name='O slug é obrigátorio'
       formIsValid=false
    }
    if(!cover){
      validateErros.name='A capa  é obrigátoria'
      formIsValid=false
    }
     return formIsValid
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

        <form action="" onSubmit={(e)=>handleSubmit(e)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Nome:</span>
              <input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5" required value={name } onChange={(e)=>setNome(e.target.value)}/>
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Slug:</span>
              <input type="text" className="w-full p-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5" required value={slug} onChange={(e)=>setSlug(e.target.value)} />
            </label>
            
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Descrição:</span>
              <textarea className="w-full p-3 border border-gray-300 rounded-xl min-h-[100px] resize-y focus:outline-none focus:ring-2 focus:ring-black/5" value={description } onChange={(e)=>setDescription(e.target.value)}/>
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-semibold text-sm text-gray-700">Capa:</span>
              
              <input type="file" className="w-full p-2 border border-gray-300 rounded-xl file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 cursor-pointer" accept=".png,.jpg, .jpeg" required value={cover} onChange={(e)=>setCover(e.target.value)} />
            </label>

          </div>

          <div className="flex justify-end gap-3 mt-2">
            <Button>Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}