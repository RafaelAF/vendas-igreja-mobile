import { createContext, ReactNode, useEffect, useState } from "react";
import { Product } from "../@types/produto";

type ListProductContextType = {
    listGlobalProducts: Product[],
    setListGlobalProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

export const ListProductsContext = createContext<ListProductContextType | null>(null)

type Props = {
    children: ReactNode
}

export const ListProductsProvider = ({children}: Props) => {

    const [listGlobalProducts, setListGlobalProducts] = useState<Product[]>([])

    useEffect(() => {
        const products = localStorage.getItem('NewProducts')
        if(products){
            setListGlobalProducts(JSON.parse(products))
        }else{
            setListGlobalProducts([])
        }
    }, [])

    return (
        <ListProductsContext.Provider value={{listGlobalProducts, setListGlobalProducts}}>
            {children}
        </ListProductsContext.Provider>
    )
}