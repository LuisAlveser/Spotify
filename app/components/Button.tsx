import { ReactNode } from "react"

interface Props{
    children:ReactNode
}

export function Button({children}:Props){
    return <button className="inline-flex cursor-pointer itens-center text-white hover:bg-gray-950 px-4 py-2 border-transparent rounded-2xl bg-gray-800">{children}</button>
}