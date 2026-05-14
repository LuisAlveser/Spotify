import  {prisma} from "../app/lib/prisma"

async function main(){
    await prisma.band.create({
        data:{
            name:"Roupa Nova",
            slug:"roupa-nova",
            status:"ative",
            tracks:{
             create:[
                {title:"Dona",slug:"dona",duration_in_seconds:244},
                {title:"Linda Demais ",slug:"linda-demais",duration_in_seconds:281}
             ]
        }

        }
    
    })
}

main()
.then(async()=>{
   await prisma.$disconnect();
})
.catch(async(e)=>{
   console.log(e)
   await prisma.$disconnect();
   process.exit(1)
})