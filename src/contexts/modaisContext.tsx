import { ReactNode, createContext, useReducer } from "react";
import { ModaisStateType } from "../@types/modais";
import { ListActions, modaisReducer } from "../reducers/modaisReducer";


type ModaisContextType = {
    modais: ModaisStateType,
    dispatch: React.Dispatch<ListActions>
}


export const ModaisContext = createContext<ModaisContextType | null>(null)

type Props = {
    children: ReactNode
}

export const ModaisProvider = ({children}: Props) => {

    const modaisState: ModaisStateType = {
        menu: false,
        cadastroProduto: true,
        pagamento: false,
        listagem: false,
        selecionados: false,
        vendas: false
      }

    const [modais, dispatch] = useReducer(modaisReducer, modaisState)

    return (
        <ModaisContext.Provider value={{modais, dispatch}}>
            {children}
        </ModaisContext.Provider>
    )
}