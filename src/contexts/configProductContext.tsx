import { ReactNode, createContext, useReducer } from "react";
import { ConfigProductActions, configProductReducer } from "../reducers/configProductReducer";
import { Product } from "../@types/produto";


type ProductContextType = {
    product: Product,
    dispatch: React.Dispatch<ConfigProductActions>
}


export const ProductContext = createContext<ProductContextType | null>(null)

type Props = {
    children: ReactNode
}

export const ProductProvider = ({children}: Props) => {

    const configProductState: Product = {
        id: "",
        name: "",
        price: 0,
        qtd: 0
    }

    const [product, dispatch] = useReducer(configProductReducer, configProductState)

    return (
        <ProductContext.Provider value={{product, dispatch}}>
            {children}
        </ProductContext.Provider>
    )
}