
interface Props{
    params:{
       id:string
    },
    searchParams:{
       model:string,
       showtitle:string
    }
}

export default  async function Page({searchParams,params}:Props){
    const p =await searchParams
    const l =await params
   console.log(l)
    return(
        <>
        <h1>Bands id {l.id} </h1>
         <h1>Model:{p.model} </h1>
          <h1>Showtitle:{p.showtitle} </h1>
        </>
        
    )
}