import { useContext, useEffect, useState } from "react"
import { Product } from "../@types/produto"
import { ModaisContext } from "../contexts/modaisContext"
// import { Product } from "../@types/produto"


export const useEditProd = () => {

    const [prodSelected, setProdSelected] = useState<Product | null>(null)
    const [totalProd, setTotalProd] = useState<Product[] | null>(null)

    const modaisCtx = useContext(ModaisContext)
    useEffect(()=>{
        const data: Product = JSON.parse(localStorage.getItem("product_edit") ?? '')
        const totalData = JSON.parse(localStorage.getItem("NewProducts") ?? '')
        if(data || totalData){
            setProdSelected(data)
            setTotalProd(totalData)
        }
    }, [])

    const changeProduct = (name: string, price: number, qtd: number) => {
        const confirmacao = confirm("Deseja salvar as alteracoes?")
        if(confirmacao){
            const newList = totalProd?.map((element)=>{
                if(element.id == prodSelected?.id){
                    return {
                        id: prodSelected.id,
                        name,
                        price,
                        qtd
                    }
                }
                return element
            }) ?? null
            // setTotalProd(newList)
            localStorage.setItem("NewProducts", JSON.stringify(newList))
            // console.log(newList)
            modaisCtx?.dispatch({type: "OPEN_EDIT", payload: {acao: false}})
        } 
    }

    const deleteProduct = () => {
        const confirmacao = confirm("Deseja realmente exclir o produto?")
        if(confirmacao){
            const newList = totalProd?.filter((element)=>{
                if(element.id != prodSelected?.id){
                    return element
                }
            }) ?? null
            // setTotalProd(newList)
            localStorage.setItem("NewProducts", JSON.stringify(newList))
            // console.log(newList)
            modaisCtx?.dispatch({type: "OPEN_EDIT", payload: {acao: false}})
        }
        
        
    }

    return {
        changeProduct,
        deleteProduct
    }
}