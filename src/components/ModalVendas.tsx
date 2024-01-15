import { FooterContainer, HeaderContainer, TableContainer, Modal, ModalContainer, Title2, Text } from "../styles"

import IconClose from '../assets/X.svg'
import { useContext, useEffect, useState } from "react"
import { ModaisContext } from "../contexts/modaisContext"
import { ContainerTotalValor } from "./styles/styles"
import { Venda } from "../@types/produto"


export const ModalVendas = () => {

    const modaisCtx = useContext(ModaisContext)

    const [totalVendido, setTotalVendido] = useState(0)
    const [vendasFeitas, setVendasFeitas] = useState<Venda[]>([])

    const handleCloseModal = () => {
        modaisCtx?.dispatch({type:"OPEN_VENDAS", payload: {acao: false}})
    }

    useEffect(()=>{
        const totalVendidoValue = localStorage.getItem("TotalVendido")
        const vendasData = localStorage.getItem("Vendas")
        if(vendasData){
            setVendasFeitas(JSON.parse(vendasData))
        }
        setTotalVendido(Number(totalVendidoValue))
    },[])

    return (
        <>
            <ModalContainer>
                <Modal>
                    <HeaderContainer>
                        <span></span>
                        <img onClick={handleCloseModal} src={IconClose} style={{width: "32px"}} alt="" />
                    </HeaderContainer>
                    <Title2>Vendas realizadas</Title2>
                    <TableContainer>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Horario</th>
                                        <th>Produtos</th>
                                        <th>Total vendido</th>
                                        <th>Troco</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendasFeitas.map((item, index)=>(
                                        <tr key={index}>
                                            {/* <td>22:53</td> */}
                                            <td>
                                                {new Date(item.id).getHours()}:{new Date(item.id).getMinutes() < 10 ? `0${new Date(item.id).getMinutes()}` : new Date(item.id).getMinutes()}
                                            </td>
                                            <td>
                                                <div>
                                                {item.produtos.map((item, index2)=>(
                                                    <span key={index2}>{item.qtdEscolhida} {item.name}</span>
                                                ))}
                                                </div>
                                            </td>
                                            <td>R$ {(item.valorPago - item.valorTroco).toFixed(2)}</td>
                                            <td>R$ {(item.valorTroco).toFixed(2)}</td>
                                        </tr>
                                    ))

                                    }
                                    
                                </tbody>
                            </table>
                    </TableContainer>
                    <FooterContainer>
                        <ContainerTotalValor>
                            <Text>Total vendido</Text>
                            <Text>R$ {totalVendido.toFixed(2)}</Text>
                        </ContainerTotalValor>
                    </FooterContainer>
                </Modal>
            </ModalContainer>
        </>
    )
}