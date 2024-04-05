// import { 
//     FooterContainer, 
//     HeaderContainer, 
//     ListContent, 
//     Modal, 
//     ModalContainer, 
//     Title2 
// } from "../../styles"

import { /*FooterContainer,*/ HeaderContainer, MiniModal/*, Modal*/, ModalContainer/*, Text */} from "../styles"
// import { ContainerTotalValor } from "./styles/styles"

import IconClose from '../assets/X.svg'
import { useContext, useEffect, useState } from "react"
import { ModaisContext } from "../contexts/modaisContext"
import { ProductContext } from "../contexts/configProductContext"
import { Product } from "../@types/produto"
import { EditContainer, InputCustom, LabelContent } from "./styles/styles"

export const ModalEdit = () => {

    const modaisCtx = useContext(ModaisContext)
    const productCtx = useContext(ProductContext)

    const [produto, setProduto] = useState<Product | null>(null)

    const [productName, setProductName] = useState(produto?.name)
    const [productPrice, setProductPrice] = useState(produto?.price)
    const [productQtd, setProductQtd] = useState(produto?.qtd)

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("product_edit") ?? '')

        if(data){
            setProduto(data)
        }

    }, [productCtx])

    useEffect(()=>{
        if(produto){
            setProductName(produto.name)
            setProductPrice(produto.price)
            setProductQtd(produto.qtd)
        }
    },[produto])




    const handleCloseModal = () => {
        modaisCtx?.dispatch({type: "OPEN_EDIT", payload: {acao: false}})
        localStorage.setItem("product_edit", "")
    }

    return (
        <>
            <ModalContainer>
                <MiniModal>
                    <HeaderContainer>
                        <span></span>
                        <img onClick={handleCloseModal} src={IconClose} style={{width: "32px"}} alt="" />
                    </HeaderContainer>
                    {/* <Title2>Configuracao de produto</Title2> */}
                    <EditContainer>
                        <div>
                            <LabelContent>
                                Nome
                                <InputCustom type="text" name="" id="" value={productName} onChange={e => {
                                    setProductName(e.target.value)
                                }} />
                            </LabelContent>
                        </div>
                        <div>
                            <LabelContent>
                                Preco
                                <InputCustom type="text" value={productPrice} onChange={e => {
                                    setProductPrice(Number(e.target.value))
                                }} />
                            </LabelContent>
                            <LabelContent >
                                Quantidade
                                <InputCustom type="number" value={productQtd} onChange={e => {
                                    setProductQtd(Number(e.target.value))
                                }} />
                            </LabelContent>
                        </div>
                        <div>
                            <button>Excluir</button>
                            <button>Salvar</button>
                        </div>
                    </EditContainer>
                </MiniModal>
            </ModalContainer>
        </>
    )
}