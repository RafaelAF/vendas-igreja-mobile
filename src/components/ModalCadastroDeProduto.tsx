import { useContext, useEffect, useState } from "react"
import { 
    ButtonsContainer,
    ControlsContainer,
    FooterContainer, 
    HeaderContainer, 
    ListContent, 
    ListItem, 
    Modal, 
    ModalContainer, 
    Text, 
    Title2 
} from "../styles"

import IconClose from '../assets/X.svg'
import { 
    ButtonCadastro, 
    ButtonToggle, 
    ButtonToggleSelected, 
    CadastroCointainer, 
    InputCustom, 
    InputGroup, 
    LabelContent, 
    SelectButtons 
} from "./styles/styles"
import { ModaisContext } from "../contexts/modaisContext"

import { Product } from "../@types/produto"

export const ModalCadastro = () => {

    const modaisCrx = useContext(ModaisContext) 

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [qtd, setQtd] = useState(0)

    const [listProducts, setListProducts] = useState<Product[]>([])


    const handleCloseModal = () => {
        modaisCrx?.dispatch({type:"OPEN_CADASTRO", payload: {acao: false}})
    }

    const handleSaveProduct = () => {
        if(name && price > 0 && qtd > 0){
            saveProduct(name, price, qtd)
            setName('')
            setPrice(0)
            setQtd(0)
        }
    }

    const saveProduct = (name: string, price: number, qtd: number) => {
        const dataStorage = localStorage.getItem("NewProducts")

        if(dataStorage){ // se tiver algo salvo
            const products: Product[] = JSON.parse(dataStorage)

            const hasProduct = products.filter(item => item.name == name ? true : false)
            if(hasProduct.length == 0){
                localStorage.setItem("NewProducts", JSON.stringify([...products, {id: products.length + 1, name, price, qtd}]))
            }else{
                alert("Ja tem no cadastro")
            }
        }
        else{ // salvar pela primeira vez
            const products: Product[] = []
            localStorage.setItem("NewProducts", JSON.stringify([...products, {id: products.length + 1, name, price, qtd}]))
        }
    }

    useEffect(()=>{
        const products = localStorage.getItem("NewProducts")
        if(products){
            setListProducts(JSON.parse(products))
        }
    }, [name])
    return (
        <>
            <ModalContainer>
                <Modal>
                    <HeaderContainer>
                        <span></span>
                        <img onClick={handleCloseModal} src={IconClose} style={{width: "32px"}} alt="" />
                    </HeaderContainer>
                    {modaisCrx?.modais.cadastroProduto && !modaisCrx.modais.listagem && 
                        <Title2>Cadastrar produto</Title2>
                    }
                    {modaisCrx?.modais.cadastroProduto && modaisCrx.modais.listagem && 
                        <Title2>Produtos cadastrados</Title2>
                    }
                    <ListContent>
                            {modaisCrx?.modais.cadastroProduto && !modaisCrx.modais.listagem &&
                                <CadastroCointainer>
                                    <LabelContent>
                                        Nome do Produto
                                        <InputCustom value={name} placeholder="Nome do produto" type="text" onChange={(e)=>{
                                            setName(e.target.value)
                                        }} />
                                    </LabelContent>
                                    <InputGroup>
                                        <LabelContent>
                                            Preco 
                                            <InputCustom value={price} placeholder="Digite apenas numeros" type="number" onChange={(e)=>{
                                                setPrice(Number(e.target.value))
                                            }} />
                                        </LabelContent>
                                        <LabelContent>
                                            Quantidade
                                            <InputCustom value={qtd} placeholder="" type="number" onChange={(e)=>{
                                                setQtd(Number(e.target.value))
                                            }} />
                                        </LabelContent>
                                    </InputGroup>
                                    <ButtonCadastro onClick={()=>{
                                        handleSaveProduct()
                                    }}>Cadastrar</ButtonCadastro>
                                </CadastroCointainer>
                            }
                            {modaisCrx?.modais.cadastroProduto && modaisCrx.modais.listagem &&
                                <>
                                    {listProducts.map((item) => (
                                        <ListContent key={item.id}>
                                            <ListItem>
                                                <Text>{item.name}</Text>
                                                <ControlsContainer>
                                                    <span>R$ {(item.price).toFixed(2)}</span>
                                                    <ButtonsContainer>- qtd. {item.qtd}</ButtonsContainer>
                                                </ControlsContainer>
                                            </ListItem>
                                        </ListContent>
                                    ))}
                                </>
                                    
                                
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
                    </FooterContainer>
                </Modal>
            </ModalContainer>
        </>
    )
}