import { ModaisStateType } from "../@types/modais"

type ActionOpenMenu = {
    type: 'OPEN_MENU',
    payload: {
        acao: boolean
    }
}
type ActionOpenCadastro = {
    type: 'OPEN_CADASTRO',
    payload: {
        acao: boolean
    }
}
type ActionOpenListagem = {
    type: 'OPEN_LISTAGEM',
    payload: {
        acao: boolean
    }
}
type ActionOpenPagamento = {
    type: 'OPEN_PAGAMENTO',
    payload: {
        acao: boolean
    }
}
type ActionOpenSelecionados = {
    type: 'OPEN_SELECIONADOS',
    payload: {
        acao: boolean
    }
}
type ActionOpenVendas = {
    type: 'OPEN_VENDAS',
    payload: {
        acao: boolean
    }
}

export type ListActions = ActionOpenMenu | ActionOpenCadastro | ActionOpenListagem | ActionOpenPagamento | ActionOpenSelecionados | ActionOpenVendas;


export const modaisReducer = (state: ModaisStateType, action: ListActions) => {
    switch (action.type) {
        case "OPEN_CADASTRO":
            return {...state, cadastroProduto: action.payload.acao}
        case "OPEN_LISTAGEM":
            return {...state, listagem: action.payload.acao}
        case "OPEN_MENU":
            return {...state, menu: action.payload.acao}
        case "OPEN_PAGAMENTO":
            return {...state, pagamento: action.payload.acao}
        case "OPEN_SELECIONADOS":
            return {...state, selecionados: action.payload.acao}
        case "OPEN_VENDAS":
            return {...state, vendas: action.payload.acao}
        default:
            return state
    }
}