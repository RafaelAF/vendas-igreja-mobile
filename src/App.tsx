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
 Text, ControlsContainer, ButtonsContainer, 
  FooterTitle,
  ButtonNextStep,
  MenuIconContainer} from "./styles"

  import { Analytics } from "@vercel/analytics/react"

import { useContext, useEffect, useState } from "react"

import { MenuModal } from "./components/MenuModal"
import { ModalSelecionados } from "./components/ModalSelecionados"
import { ModaisContext } from "./contexts/modaisContext"

import MenuIcon2 from './assets/MenuIcon2.svg'
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
      console.log("Producst =>", JSON.parse(products))
    }

    // Para pular o build
  },[])

  const selectItem = useSelected(listProducts)

  return (
    <ContainerApp>
      <Analytics />
        <BlocoApp>
          <HeaderContainer>
            <Title>Caixa de Produtos Rainha da paz</Title>
            <MenuIconContainer>
              <img onClick={handleOpenMenu} src={MenuIcon2} alt="" />
            </MenuIconContainer>
          </HeaderContainer>
          <Container>
            <ListContainer>
              <Title2>Lista de Produtos</Title2>
              <ListContent>
                {listProducts.map((item)=>{
                  if(item.avaliable){
                    return (
                      <ListItem>
                        <Text>{item.name}</Text>
                        <ControlsContainer>
                          <span>R$ {(item.price).toFixed(2)}</span>
                          <ButtonsContainer>
                            <button onClick={()=>{
                              selectItem.handleMinusClick(Number(item.id))
                            }}>-</button>
                            {selectItem.quantidades[item.id] ?? 0}
                            <button onClick={()=>{
                              selectItem.handlePlusClick(Number(item.id))
                            }}>+</button>
                          </ButtonsContainer>
                        </ControlsContainer>
                      </ListItem>
                    )
                  }
                })
                }
                {listProducts.length == 0 &&
                  <EmptyList />
                }
              </ListContent>
              <FooterContainer>
                <FooterTitle>Total: R${(selectItem.total).toFixed(2)}</FooterTitle>
                {selectItem.total > 0 &&  <ButtonNextStep onClick={handleOpenSelecionados}>VER ITEMS</ButtonNextStep>}
                
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
