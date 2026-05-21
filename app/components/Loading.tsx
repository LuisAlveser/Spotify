import Image from "next/image"
interface Props{
    
     width?:number
     heigth?:number
    
}
export default function Loading({width,heigth}:Props){
    return(
        <div className=" flex flex-col items-center">
            <Image src={"loading.svg"} width={width} height={heigth} alt="Carrregando"/>
        </div>
    )
}