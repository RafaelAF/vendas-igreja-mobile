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
import { EmptyList } from "./components/EmptyList"
import { useSelected } from "./hooks/useSelected"
import { ModalVendas } from "./components/ModalVendas"
import { ModalEdit } from "./components/ModalEdit"

function App() {
  
  const modaisCtx = useContext(ModaisContext)

  const [listProducts, setListProducts] = useState<Product[]>([])
  

  

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
  },[])

  const selectItem = useSelected(listProducts)

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
                      <ButtonsContainer><button onClick={()=>{
                        selectItem.handleMinusClick(Number(item.id))
                      }}>-</button>{selectItem.quantidades[item.id] ?? 0}<button onClick={()=>{
                        selectItem.handlePlusClick(Number(item.id))
                      }}>+</button></ButtonsContainer>
                    </ControlsContainer>
                  </ListItem>
                ))
                }
                {listProducts.length == 0 &&
                  <EmptyList />
                }
              </ListContent>
              <FooterContainer>
                <Title>Total: R${(selectItem.total).toFixed(2)}</Title>
                {selectItem.total > 0 &&  <ButtonConfirm onClick={handleOpenSelecionados}>VER PEDIDOS</ButtonConfirm>}
                
              </FooterContainer>
            </ListContainer>
          </Container>
          {modaisCtx?.modais.vendas && <ModalVendas />}
          {modaisCtx?.modais.edit && <ModalEdit />}
          {modaisCtx?.modais.menu && <MenuModal />}
          {modaisCtx?.modais.selecionados && <ModalSelecionados closeAll={selectItem} selecao={selectItem.selectedList} total={selectItem.total} />}
        </BlocoApp>
    </ContainerApp>
  )
}

export default App
