import { ReactNode } from "react"

interface Props{
    children:ReactNode,
    onClick?: ()=>void
    className?:string
    disabled?:boolean
}

export function Button({children,onClick,className="",disabled}:Props){
    return <button disabled={disabled} onClick={onClick} className={`inline-flex cursor-pointer itens-center text-white hover:bg-gray-950 px-4 py-2 border-transparent rounded-2xl bg-gray-800 ${disabled ?"text-gray-950  bg-gray-100  hover:bg-gray-100":"  hover:bg-gray-950 px-4 py-2 border-transparent rounded-2xl  bg-gray-800"} ${className}`}>{children}</button>
}