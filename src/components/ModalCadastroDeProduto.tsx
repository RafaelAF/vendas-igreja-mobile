import { useContext, useEffect, useState } from "react"
import { 
    ButtonsContainer,
    ControlsContainer,
    FooterContainer, 
    HeaderContainer, 
    ListAvaliableProducts, 
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
    CadastroContainer, 
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
    const [price, setPrice] = useState('')
    const [qtd, setQtd] = useState('')

    const [listProducts, setListProducts] = useState<Product[]>([])


    const handleCloseModal = () => {
        modaisCrx?.dispatch({type:"OPEN_CADASTRO", payload: {acao: false}})
    }

    const handleSaveProduct = () => {
        if(parseFloat(price) && parseInt(qtd)){
            if(name && parseFloat(price) > 0 && parseInt(qtd) > 0){
                saveProduct(name, parseFloat(price), parseInt(qtd))
                setName('')
                setPrice('')
                setQtd('')
                alert("Produto cadastrado com sucesso!")
            }else{
                alert("Preencha todos os campos")
            }
        }else{
            alert("Preencha com valores validos")
        }
        
    }

    const saveProduct = (name: string, price: number, qtd: number, avaliable = true) => {
        const dataStorage = localStorage.getItem("NewProducts")

        if(dataStorage){ // se tiver algo salvo
            const products: Product[] = JSON.parse(dataStorage)

            const hasProduct = products.filter(item => item.name == name ? true : false)
            if(hasProduct.length == 0){
                localStorage.setItem("NewProducts", JSON.stringify([...products, {id: new Date().getTime(), name, price, qtd, avaliable}]))
            }else{
                alert("Ja tem no cadastro")
            }
        }
        else{ // salvar pela primeira vez
            const products: Product[] = []
            localStorage.setItem("NewProducts", JSON.stringify([...products, {id: new Date().getTime(), name, price, qtd, avaliable}]))
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
                                <CadastroContainer>
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
                                                setPrice(e.target.value)
                                            }} />
                                        </LabelContent>
                                        <LabelContent>
                                            Quantidade
                                            <InputCustom value={qtd} placeholder="" type="number" onChange={(e)=>{
                                                setQtd(e.target.value)
                                            }} />
                                        </LabelContent>
                                    </InputGroup>
                                    <ButtonCadastro onClick={()=>{
                                        handleSaveProduct()
                                    }}>Cadastrar</ButtonCadastro>
                                </CadastroContainer>
                            }
                            {modaisCrx?.modais.cadastroProduto && modaisCrx.modais.listagem &&
                                <>
                                    {listProducts.map((item) => (
                                        <ListAvaliableProducts avaliable={item.avaliable} key={item.id} onClick={()=>{
                                            modaisCrx.dispatch({type: "OPEN_EDIT", payload: {acao: true}})
                                            localStorage.setItem("product_edit", JSON.stringify(item))
                                        }}>
                                            <ListItem>
                                                <Text>{item.name}</Text>
                                                <ControlsContainer>
                                                    <span>R$ {(item.price).toFixed(2)}</span>
                                                    <ButtonsContainer>- qtd. {item.qtd}</ButtonsContainer>
                                                </ControlsContainer>
                                            </ListItem>
                                        </ListAvaliableProducts>
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