import { HeaderContainer } from "../../styles"
import { MenuBox, MenuContainer, MenuItem, MenuList } from "./style"
import { Text } from "../../styles"

import IconClose from '../../assets/X.svg'
import IconPencil from '../../assets/PencilLine.svg'
import IconCash from '../../assets/cashIcon.svg'
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
                    <span></span>
                    <img onClick={handleCloseMenu} src={IconClose} style={{width: "32px"}} alt="" />
                </HeaderContainer>
                <MenuList>
                    <MenuItem onClick={()=>{
                            modaisCtx?.dispatch({type: "OPEN_CADASTRO", payload: {acao: true}})
                        }}>
                        <Text>Cadastrar produtos</Text>
                        <img  src={IconPencil} alt="" />
                    </MenuItem>
                    <MenuItem onClick={()=>{
                        modaisCtx?.dispatch({type: "OPEN_VENDAS", payload: {acao: true}})
                    }}>
                        <Text>Controle de vendas</Text>
                        <img src={IconCash} alt="" />
                    </MenuItem>
                    <MenuItem onClick={()=>{
                        handleDeleteProductData()
                    }}>
                        <Text>Apagar Produtos cadastrados</Text>
                    </MenuItem>
                    <MenuItem onClick={()=>{
                        handleDeleteVendasData()
                    }}>
                        <Text>Apagar Vendas</Text>
                    </MenuItem>
                    
                </MenuList>
            </MenuBox>
            
            {modaisCtx?.modais.cadastroProduto && <ModalCadastro />}
        </MenuContainer>
    )
}