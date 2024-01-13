import { Product } from "../@types/produto"

type EditAction = {
    type: "EDIT",
    payload: {
        id: number | string,
        name: string,
        price: number,
        qtd: number
    }
}

type DeleteAction = {
    type: "DELETE",
    payload: {
        id: number | string,
        name: string,
        price: number,
        qtd: number
    }
}


export type ConfigProductActions = EditAction | DeleteAction;

export const configProductReducer = (state: Product, action: ConfigProductActions) => {
    switch (action.type) {
        case "EDIT":
            
            return state
        case "DELETE":
            return state
        default:
            return state
    }
}