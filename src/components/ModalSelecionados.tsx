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


export const ModalSelecionados = () => {

    const modaisCtx = useContext(ModaisContext)

    const handleCloseModal = () => {
        modaisCtx?.dispatch({type: "OPEN_SELECIONADOS", payload: {acao: false}})
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
                        <ListItem>
                            <Text>Pastel de Flango</Text>
                            <ControlsContainer>
                                <span>R$ 4,00  X1</span>
                            </ControlsContainer>
                        </ListItem>
                    </ListContent>
                    <FooterContainer>
                        <Title>Total: R$300,00</Title>
                        <ButtonConfirm>CONFIRMAR</ButtonConfirm>
                    </FooterContainer>
                </Modal>
            </ModalContainer>
        </>
    )
}