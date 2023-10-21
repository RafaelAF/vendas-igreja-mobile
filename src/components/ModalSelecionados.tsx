import { ButtonConfirm,Text , FooterContainer, HeaderContainer, ListContent, ListItem, Modal, ModalContainer, Title, Title2, ControlsContainer, ButtonsContainer } from "../styles"

import IconClose from '../assets/X.svg'


export const ModalSelecionados = () => {
    return (
        <>
            <ModalContainer>
                <Modal>
                    <HeaderContainer>
                        <span></span>
                        <img src={IconClose} style={{width: "32px"}} alt="" />
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