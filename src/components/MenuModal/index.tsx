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
                    <MenuItem>
                        <Text>Controle de vendas</Text>
                        <img src={IconCash} alt="" />
                    </MenuItem>
                    <MenuItem onClick={()=>{
                        handleDeleteProductData()
                    }}>
                        <Text>Apagar Produtos cadastrados</Text>
                    </MenuItem>
                </MenuList>
            </MenuBox>
            {/* <ModalCadastro /> */}
            {modaisCtx?.modais.cadastroProduto && modaisCtx.modais.menu && <ModalCadastro />}
        </MenuContainer>
    )
}