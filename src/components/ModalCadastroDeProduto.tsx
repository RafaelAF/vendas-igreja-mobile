import { useContext } from "react"
import { 
    FooterContainer, 
    HeaderContainer, 
    ListContainer, 
    ListContent, 
    Modal, 
    ModalContainer, 
    Title2 
} from "../styles"

import IconClose from '../assets/X.svg'
// import { Cadastro } from "../../ModalCadastroDeProduto"
// import { Listagem } from "../ModalListagem"
import { ButtonCadastro, ButtonToggle, ButtonToggleSelected, CadastroCointainer, InputCustom, InputGroup, LabelContent, SelectButtons } from "./styles/styles"
import { ModaisContext } from "../contexts/modaisContext"

export const ModalCadastro = () => {

    const modaisCrx = useContext(ModaisContext) 


    const handleCloseModal = () => {
        modaisCrx?.dispatch({type:"OPEN_CADASTRO", payload: {acao: false}})
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
                            {modaisCrx?.modais.cadastroProduto && !modaisCrx.modais.listagem &&
                                <CadastroCointainer>
                                    <LabelContent>
                                        Nome do Produto
                                        <InputCustom />
                                    </LabelContent>
                                    <InputGroup>
                                        <LabelContent>
                                            Preco 
                                            <InputCustom />
                                        </LabelContent>
                                        <LabelContent>
                                            Quantidade
                                            <InputCustom />
                                        </LabelContent>
                                    </InputGroup>
                                    <ButtonCadastro>Cadastrar</ButtonCadastro>
                                </CadastroCointainer>
                            }
                            {modaisCrx?.modais.cadastroProduto && modaisCrx.modais.listagem &&
                                <ListContainer>
                                    Listagem
                                </ListContainer>
                            }
                    </ListContent>
                    <FooterContainer>
                        <SelectButtons>
                            {modaisCrx?.modais.cadastroProduto && !modaisCrx.modais.listagem &&
                                <>
                                    <ButtonToggleSelected>Cadastro</ButtonToggleSelected>
                                    <ButtonToggle onClick={()=>{
                                        modaisCrx.dispatch({type:"OPEN_LISTAGEM", payload: {acao: true}})
                                    }}>Produtos</ButtonToggle>
                                </>
                            }
                            {modaisCrx?.modais.cadastroProduto && modaisCrx.modais.listagem &&
                                <>
                                    <ButtonToggle onClick={()=>{
                                        modaisCrx.dispatch({type:"OPEN_LISTAGEM", payload: {acao: false}})
                                    }}>Cadastro</ButtonToggle>
                                    <ButtonToggleSelected>Produtos</ButtonToggleSelected>
                                </>
                            }
                        </SelectButtons>
                        {/* <Title>Total: R$300,00</Title>
                        <ButtonConfirm>CONFIRMAR</ButtonConfirm> */}
                    </FooterContainer>
                </Modal>
            </ModalContainer>
        </>
    )
}