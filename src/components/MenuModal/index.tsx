import { HeaderContainer } from "../../styles"
import { MenuBox, MenuContainer, MenuItem, MenuList } from "./style"
import { Text } from "../../styles"

import IconClose from '../../assets/X.svg'
import IconPencil from '../../assets/PencilLine.svg'
import IconCash from '../../assets/cashIcon.svg'

export const MenuModal = () => {
    return (
        <MenuContainer>
            <MenuBox>
                <HeaderContainer>
                    <span></span>
                    <img src={IconClose} style={{width: "32px"}} alt="" />
                </HeaderContainer>
                <MenuList>
                    <MenuItem>
                        <Text>Cadastrar produtos</Text>
                        <img src={IconPencil} alt="" />
                    </MenuItem>
                    <MenuItem>
                        <Text>Controle de vendas</Text>
                        <img src={IconCash} alt="" />
                    </MenuItem>
                </MenuList>
            </MenuBox>
        </MenuContainer>
    )
}