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
import { ButtonsEditContainer, CheckBoxCustom, EditContainer, InputCustom, InputGroup, LabelContent } from "./styles/styles"
import { useEditProd } from "../hooks/useEditProd"

export const ModalEdit = () => {

    const modaisCtx = useContext(ModaisContext)
    const productCtx = useContext(ProductContext)

    const { changeProduct, deleteProduct } = useEditProd()

    const [produto, setProduto] = useState<Product | null>(null)

    const [productName, setProductName] = useState(produto?.name)
    const [productPrice, setProductPrice] = useState(produto?.price)
    const [productQtd, setProductQtd] = useState(produto?.qtd)
    const [isActive, setIsActive] = useState(produto?.avaliable)

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
            setIsActive(produto.avaliable)
        }
    },[produto])




    const handleCloseModal = () => {
        modaisCtx?.dispatch({type: "OPEN_EDIT", payload: {acao: false}})
        localStorage.setItem("product_edit", "")
    }

    if(produto === null) return null

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
                        <InputGroup>
                            <LabelContent>
                                Preco
                                <InputCustom type="number" value={productPrice} onChange={e => {
                                    setProductPrice(Number(e.target.value))
                                }} />
                            </LabelContent>
                            <LabelContent >
                                Quantidade
                                <InputCustom type="number" value={productQtd} onChange={e => {
                                    setProductQtd(Number(e.target.value))
                                }} />
                            </LabelContent>
                        </InputGroup>
                        <div>

                            <CheckBoxCustom>
                                Ativo
                                <input type="checkbox" checked={isActive} onClick={()=>{
                                    setIsActive(!isActive)
                                }} />
                                <span></span>
                                {/* <CheckBoxCustom type="checkbox" name="" id="" />; */}
                            </CheckBoxCustom>
                        </div>
                        <ButtonsEditContainer>
                            <button onClick={()=>{
                                deleteProduct()
                            }}>Excluir</button>
                            <button onClick={ ()=>{
                                // if(productName, productPrice, productQtd){
                                //     changeProduct(productName, productPrice, productQtd)
                                // }
                                changeProduct(productName ?? '', productPrice ?? 0, productQtd ?? 0, isActive ?? true) 

                                
                            }}>Salvar</button>
                        </ButtonsEditContainer>
                    </EditContainer>
                </MiniModal>
            </ModalContainer>
        </>
    )
}