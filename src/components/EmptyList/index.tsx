import { ListEmptyContainer } from "./styles"

import EmptyListImage from '../../assets/ListEmpty.svg'

export const EmptyList = () => {
    return (
        <ListEmptyContainer>
            <img src={EmptyListImage} />
            <p>Lista vazia</p>
            <p>Cadastre algum produto ou atualize a pagina</p>
        </ListEmptyContainer>
    )
}