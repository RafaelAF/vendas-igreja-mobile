// import { 
//     FooterContainer, 
//     HeaderContainer, 
//     ListContent, 
//     Modal, 
//     ModalContainer, 
//     Title2 
// } from "../../styles"

import { /*FooterContainer,*/ HeaderContainer, MiniModal/*, Modal*/, ModalContainer, Title2/*, Text */} from "../styles"
// import { ContainerTotalValor } from "./styles/styles"

import IconClose from '../assets/X.svg'
import { useContext, useEffect, useState } from "react"
import { ModaisContext } from "../contexts/modaisContext"
import { ProductContext } from "../contexts/configProductContext"
import { Product } from "../@types/produto"

export const ModalEdit = () => {

    const modaisCtx = useContext(ModaisContext)
    const productCtx = useContext(ProductContext)

    const [produto, setProduto] = useState<Product | null>(null)

    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem("product_edit") ?? '')

        if(data){
            setProduto(data)
        }

    }, [productCtx])


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
                    <Title2>Configuracao de produto</Title2>
                    {produto?.name}
                    {/* <FooterContainer>
                        <ContainerTotalValor>
                            <Text>Total vendido</Text>
                            <Text></Text>
                        </ContainerTotalValor>
                    </FooterContainer> */}
                </MiniModal>
            </ModalContainer>
        </>
    )
}