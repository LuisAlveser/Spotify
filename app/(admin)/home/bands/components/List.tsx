import { Button } from "@/app/components/Button";

interface Props{
   
    name:string,
    status:string,

}
export function TableRow({name,status}:Props){
    return (
       
        <tr>
            <td className="px-6 py-4 text-green-800  whitespace-nowrap ">{name}</td>
            <td  className="px-6 py-4 text-green-800  whitespace-nowrap ">
                 <span className="inline-flex itens-center px-2 py-0.5 rounded bg-green-100 text-green-900">
                   {status}
                  </span>
                </td>
            <td className=" text-center  font-medium  space-x-5 whitespace-nowrap">
                <Button>Editar</Button>
                <Button>Excluir </Button>
            </td>
        </tr>
        
    )
}


export function List(){
    return(
       <section className=" overflow-x-auto p-4">
        <header className="flex justify-end mb-4">
         <Button>Adicinar</Button>
        </header>
          <table className="min-w-full border border-gray-200 rounded-sm">
            <thead className="bg-gray-800 text-gray-50  uppercase text-left text-sm">
              <tr>
                 <th scope="col" className="px-6 py-3" >Nome</th>
                  <th scope="col"  className="px-6 py-3" >Status</th>
                   <th scope="col"  className="px-6 py-3 text-center" >Ações</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <TableRow  name="Henrique & Juliano" status="Ativo" ></TableRow>
               <TableRow name="Capital Inicial" status="Ativo" ></TableRow>
            </tbody>
          </table>
       </section>
    )
}