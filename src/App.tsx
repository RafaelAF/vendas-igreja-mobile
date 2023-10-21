import { 
  BlocoApp, 
  ContainerApp, 
  HeaderContainer, 
  Container, 
  Title, 
  ListContainer, 
  Title2, 
  ListItem, 
  FooterContainer, 
  ListContent, 
  ButtonConfirm, Text, ControlsContainer, ButtonsContainer } from "./styles"

import MenuIcon from './assets/List.svg'
import { ModaisStateType } from "./@types/modais"
import { MenuModal } from "./components/MenuModal"
import { useReducer } from "react"
import { modaisReducer } from "./reducers/modaisReducer"
import { ModalSelecionados } from "./components/ModalSelecionados"
// import { useState } from "react"

function App() {
  const modaisState: ModaisStateType = {
    menu: false,
    cadastroProduto: false,
    pagamento: false,
    listagem: false,
    selecionados: false,
    vendas: false
  }

  const [modais, dispatch] = useReducer(modaisReducer, modaisState)


  const handleOpenMenu = () => {
    dispatch({type: "OPEN_MENU", payload: {acao: true}})
  }

  const handleOpenSelecionados = () => {
    dispatch({type: "OPEN_SELECIONADOS", payload: {acao: true}})
  }

  return (
    <ContainerApp>
      <BlocoApp>
        <HeaderContainer>
          <Title>Caixa de Produtos</Title>
          <img onClick={handleOpenMenu} src={MenuIcon} alt="" />
        </HeaderContainer>
        <Container>
          <ListContainer>
            <Title2>Lista de Produtos</Title2>
            <ListContent>
              <ListItem>
                <Text>Pastel de Flango</Text>
                <ControlsContainer>
                  <span>R$ 4,00</span>
                  <ButtonsContainer><button>-</button>0<button>+</button></ButtonsContainer>
                </ControlsContainer>
              </ListItem>
            </ListContent>
            <FooterContainer>
              <Title>Total: R$300,00</Title>
              <ButtonConfirm onClick={handleOpenSelecionados}>VER PEDIDOS</ButtonConfirm>
            </FooterContainer>
          </ListContainer>
        </Container>
        {modais.menu && <MenuModal />}
        {modais.selecionados && <ModalSelecionados />}

      </BlocoApp>
    </ContainerApp>
  )
}

export default App
