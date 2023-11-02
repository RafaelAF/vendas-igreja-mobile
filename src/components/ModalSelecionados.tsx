import { 
    ButtonConfirm,
    Text , 
    FooterContainer, 
    HeaderContainer, 
    ListContent, 
    ListItem, 
    Modal, 
    ModalContainer, 
    Title, 
    Title2, 
    ControlsContainer 
} from "../styles"

import IconClose from '../assets/X.svg'
import { useContext } from "react"
import { ModaisContext } from "../contexts/modaisContext"
import { ProdutoSelecionado } from "../@types/produto"
import { ModalPagamento } from "./ModalPagamento"


type Props = {
    selecao: ProdutoSelecionado[],
    total: number,
    closeAll: any
}


export const ModalSelecionados = ({selecao, total, closeAll}: Props) => {

    const modaisCtx = useContext(ModaisContext)
    console.log("selectedList", selecao)

    const handleCloseModal = () => {
        modaisCtx?.dispatch({type: "OPEN_SELECIONADOS", payload: {acao: false}})
    }

    const handleOpenModalPagamento = () => {
        modaisCtx?.dispatch({type: "OPEN_PAGAMENTO", payload: {acao: true}})
    }

    return (
        <>
            <ModalContainer>
                <Modal>
                    <HeaderContainer>
                        <span></span>
                        <img onClick={handleCloseModal} src={IconClose} style={{width: "32px"}} alt="" />
                    </HeaderContainer>
                    <Title2>Produtos selecionados</Title2>
                    <ListContent>
                        {selecao.map((item)=>(
                            <ListItem>
                                <Text>{item.name}</Text>
                                <ControlsContainer>
                                    <span>R$ {(item.precoUni).toFixed(2)}  X{item.qtdEscolhida}</span>
                                </ControlsContainer>
                            </ListItem>
                        ))}

                    </ListContent>
                    <FooterContainer>
                        <Title>Total: R${total.toFixed(2)}</Title>
                        <ButtonConfirm  onClick={handleOpenModalPagamento}>CONFIRMAR</ButtonConfirm>
                    </FooterContainer>
                </Modal>
            </ModalContainer>
            {modaisCtx?.modais.pagamento && <ModalPagamento closeAll={closeAll} selecao={selecao} total={total} />}
        </>
    )
}