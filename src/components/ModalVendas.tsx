import { FooterContainer, HeaderContainer, TableContainer, Modal, ModalContainer, Title2, Text, LabelPagamento } from "../styles"

import IconClose from '../assets/X.svg'
import { useContext, useEffect, useState } from "react"
import { ModaisContext } from "../contexts/modaisContext"
import { ContainerTotalValor } from "./styles/styles"
import { Venda } from "../@types/produto"


export const ModalVendas = () => {

    const modaisCtx = useContext(ModaisContext)

    // const [totalVendido, setTotalVendido] = useState(0)
    const [vendasFeitas, setVendasFeitas] = useState<Venda[]>([])

    const handleCloseModal = () => {
        modaisCtx?.dispatch({type:"OPEN_VENDAS", payload: {acao: false}})
    }

    useEffect(()=>{
        // const totalVendidoValue = localStorage.getItem("TotalVendido")
        const vendasData = localStorage.getItem("Vendas")
        if(vendasData){
            const vendas:Venda[] = JSON.parse(vendasData)
            const vendasHoje = vendas.filter((item)=>new Date(item.id).getDate() === new Date().getDate() && new Date(item.id).getMonth() === new Date().getMonth() && new Date(item.id).getFullYear() === new Date().getFullYear())
            setVendasFeitas(vendasHoje)
        }
        // setTotalVendido(Number(totalVendidoValue))
    },[])

    return (
        <>
            <ModalContainer>
                <Modal>
                    <HeaderContainer>
                        <span></span>
                        <img onClick={handleCloseModal} src={IconClose} style={{width: "32px"}} alt="" />
                    </HeaderContainer>
                    <Title2>Vendas realizadas hoje</Title2>
                    <LabelPagamento>Data do dia</LabelPagamento>
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
                            <Text>R$ {(vendasFeitas.reduce((acc, cur)=> acc + cur.valorPago - cur.valorTroco, 0)).toFixed(2).replace(".", ",")}</Text>
                        </ContainerTotalValor>
                    </FooterContainer>
                </Modal>
            </ModalContainer>
        </>
    )
}