import { Dispatch, SetStateAction } from "react"

interface Props{
    totalPages:number,
    currentPage:number,
    setCurrentPage:Dispatch<SetStateAction<number>>
}

export function Pagination({totalPages,currentPage,setCurrentPage}:Props){
    const surroudingPages=2
    let startPage=Math.max(currentPage-surroudingPages,1)//=>Pega o maior valor entre duas possibilídades
    let endPage=Math.min(currentPage+surroudingPages,totalPages)
    
    const handlePrev=()=> {
  if(currentPage>1){
    setCurrentPage((prev)=>prev-1)
  }
 }
  const handleNext=()=> {
    if(totalPages){
       if(currentPage<totalPages){
    setCurrentPage((prev)=>prev+1)
    console.log(currentPage)
  }
}

 }

    return(
       <>
      
        <div className="flex flex-row gap-3 justify-center items-center mt-3">

        <button className=" py-1 px-3 hover:cursor-pointer" onClick={handlePrev} disabled={currentPage===1}
         >voltar
         </button> 
       {Array.from({ length: endPage-startPage+1 }, (_, i) => i + startPage).map((pageNumber) => {
         const isActive=pageNumber===currentPage
 return (
    <button 
     key={pageNumber}
      className={`border rounded-2xl py-1 px-3 hover:cursor-pointer hover:bg-gray-800 hover:text-gray-50 ${isActive?"bg-gray-800 text-gray-50" :""}`}
     onClick={()=>setCurrentPage(pageNumber)}
    >
      {pageNumber}
    </button>
  );
})}
           <button className=" py-1 px-3 hover:cursor-pointer"  onClick={handleNext} disabled={currentPage===totalPages}>
            avançar
           </button>
      </div>
   </>
    )
}