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

import { useContext, useEffect, useState } from "react"

import { MenuModal } from "./components/MenuModal"
import { ModalSelecionados } from "./components/ModalSelecionados"
import { ModaisContext } from "./contexts/modaisContext"

import MenuIcon from './assets/List.svg'
import { Product } from "./@types/produto"

function App() {
  
  const modaisCtx = useContext(ModaisContext)

  const [listProducts, setListProducts] = useState<Product[]>([])
  const [total, setTotal] = useState(0)

  const handleOpenMenu = () => {
    modaisCtx?.dispatch({type: "OPEN_MENU", payload: {acao: true}})
  }

  const handleOpenSelecionados = () => {
    modaisCtx?.dispatch({type: "OPEN_SELECIONADOS", payload: {acao: true}})
  }

  useEffect(()=>{
    const products = localStorage.getItem("NewProducts")

    if(products){
      setListProducts(JSON.parse(products))
    }

    // Para pular o build
    setTotal(0)
  },[])

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
                {listProducts.map((item)=>(
                  <ListItem>
                    <Text>{item.name}</Text>
                    <ControlsContainer>
                      <span>R$ {(item.price).toFixed(2)}</span>
                      <ButtonsContainer><button>-</button>0<button>+</button></ButtonsContainer>
                    </ControlsContainer>
                  </ListItem>
                ))
                }
                
              </ListContent>
              <FooterContainer>
                <Title>Total: R${total.toFixed(2)}</Title>
                <ButtonConfirm onClick={handleOpenSelecionados}>VER PEDIDOS</ButtonConfirm>
              </FooterContainer>
            </ListContainer>
          </Container>
          {modaisCtx?.modais.menu && <MenuModal />}
          {modaisCtx?.modais.selecionados && <ModalSelecionados />}
        </BlocoApp>
    </ContainerApp>
  )
}

export default App
