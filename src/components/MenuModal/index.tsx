import { HeaderContainer, MenuIconContainer, Title } from "../../styles"
import { MenuBox, MenuContainer, MenuItem, MenuList, MenuText } from "./style"
import { Text } from "../../styles"

import closeIcon2 from '../../assets/closeIcon2.svg'
// import IconPencil from '../../assets/PencilLine.svg'
// import IconCash from '../../assets/cashIcon.svg'
import { useContext } from "react"
import { ModaisContext } from "../../contexts/modaisContext"
import { ModalCadastro } from "../ModalCadastroDeProduto"

export const MenuModal = () => {
    
    const modaisCtx = useContext(ModaisContext)

    const handleCloseMenu = () => {
        modaisCtx?.dispatch({type: "OPEN_MENU", payload: {acao: false}})
    }

    const handleDeleteProductData = () => {
        if(confirm("Deseja apagar os produtos cadastrados?")){
            localStorage.setItem("NewProducts", "")
        }
    }
    const handleDeleteVendasData = () => {
        if(confirm("Deseja apagar as vendas cadastradas?")){
            localStorage.setItem("Vendas", "")
            localStorage.setItem("TotalVendas", "")
        }
    }

    return (
        <MenuContainer>
            <MenuBox>
                <HeaderContainer>
                    <Title>Caixa de Produtos Rainha da paz</Title>
                    <MenuIconContainer>
                        <img onClick={handleCloseMenu} src={closeIcon2}  alt="" />

                    </MenuIconContainer>
                </HeaderContainer>
                <MenuList>
                    <MenuItem onClick={()=>{
                            modaisCtx?.dispatch({type: "OPEN_CADASTRO", payload: {acao: true}})
                        }}>
                        <MenuText>Cadastrar produtos</MenuText>
                        {/* <img  src={IconPencil} alt="" /> */}
                    </MenuItem>
                    <MenuItem onClick={()=>{
                        modaisCtx?.dispatch({type: "OPEN_VENDAS", payload: {acao: true}})
                    }}>
                        <MenuText>Controle de vendas</MenuText>
                        {/* <img src={IconCash} alt="" /> */}
                    </MenuItem>
                    <MenuItem onClick={()=>{
                        handleDeleteProductData()
                    }}>
                        <MenuText>Apagar Produtos cadastrados</MenuText>
                    </MenuItem>
                    <MenuItem onClick={()=>{
                        handleDeleteVendasData()
                    }}>
                        <MenuText>Apagar Vendas</MenuText>
                    </MenuItem>
                    
                </MenuList>
            </MenuBox>
            
            {modaisCtx?.modais.cadastroProduto && <ModalCadastro />}
        </MenuContainer>
    )
}