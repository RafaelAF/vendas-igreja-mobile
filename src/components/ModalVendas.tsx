import { FooterContainer, HeaderContainer, TableContainer, Modal, ModalContainer, Text } from "../styles"

import IconClose from '../assets/X.svg'
import { useContext, useEffect, useState } from "react"
import { ModaisContext } from "../contexts/modaisContext"
import { ContainerTotalValor, HeadTitleVendas } from "./styles/styles"
import {  Venda } from "../@types/produto"


export const ModalVendas = () => {

    const modaisCtx = useContext(ModaisContext)

    // const [totalVendido, setTotalVendido] = useState(0)
    const [vendasFeitas, setVendasFeitas] = useState<Venda[]>([])
    const [vendasFiltradas, setVendasFiltradas] = useState<Venda[]>([])
    const [paymentSelected, setPaymentSelected] = useState<"pix" | "cartao" | "dinheiro" | "all">("all")


    const handleCloseModal = () => {
        modaisCtx?.dispatch({type:"OPEN_VENDAS", payload: {acao: false}})
    }

    useEffect(()=>{
        // const totalVendidoValue = localStorage.getItem("TotalVendido")
        const vendasData = localStorage.getItem("Vendas")
        if(vendasData){
            const vendas:Venda[] = JSON.parse(vendasData)
            const vendasHoje = vendas.filter((item)=>new Date(item.id).getDate() === new Date().getDate() && new Date(item.id).getMonth() === new Date().getMonth() && new Date(item.id).getFullYear() === new Date().getFullYear())
            const todasAsVendasHoje = vendasHoje.filter((item) => item.tipoPagamento === "dinheiro" || item.tipoPagamento === "cartao" || item.tipoPagamento === "pix")
            setVendasFeitas(todasAsVendasHoje)
            setVendasFiltradas(todasAsVendasHoje)
        }
        // setTotalVendido(Number(totalVendidoValue))
    },[])


    const filterPaymentMethod = (method: "pix" | "cartao" | "dinheiro" | "all") => {
        switch (method) {
            case "cartao":
                const vendasCart = vendasFeitas.filter((item)=>item.tipoPagamento === "cartao")
                setVendasFiltradas(vendasCart)
                break;
            case "dinheiro":
                const vendasCash = vendasFeitas.filter((item)=>item.tipoPagamento === "dinheiro")
                setVendasFiltradas(vendasCash)
                break;
            case "pix":
                const vendasPix = vendasFeitas.filter((item)=>item.tipoPagamento === "pix")
                setVendasFiltradas(vendasPix)

                break;
            case "all":
                const todasAsVendas = vendasFeitas.filter((item) => item.tipoPagamento === "dinheiro" || item.tipoPagamento === "cartao" || item.tipoPagamento === "pix")
                setVendasFiltradas(todasAsVendas)
                break;
        
            default:
                break;
        }
    }

    const extrairVendas = () => {
        const value = prompt("Digite a senha para compartilhar o relatorio com whatsapp")
        if(value === "rafael"){
            const valorTotalEntrada = vendasFiltradas.reduce((acc, cur)=> acc + cur.valorPago - cur.valorTroco, 0)

            const vendasTexto = vendasFiltradas.map((item, index)=>{
                return `Venda ${index+1} \n 🥪 Produto vendido: ${item.produtos.map((item)=>`${item.qtdEscolhida} ${item.name}`).join(", ")} \n💵 tipo de pagamento:  ${item.tipoPagamento} \nvalor total: R$ ${(item.valorPago - item.valorTroco).toFixed(2)} \n`
            })

            console.log(vendasTexto.join("\n"))

            const msg  =  `💰 Total vendido R$ ${(valorTotalEntrada).toFixed(2)}\n${(vendasTexto.join("===============================\n"))}`
            const mensagemCodificada = encodeURIComponent(msg);

            window.open(`https://api.whatsapp.com/send?phone=5511933325168&text=${mensagemCodificada}`, '_blank')
        }
    }

    return (
        <>
            <ModalContainer>
                <Modal>
                    <HeaderContainer>
                        <span></span>
                        <img onClick={handleCloseModal} src={IconClose} style={{width: "32px"}} alt="" />
                    </HeaderContainer>
                    <HeadTitleVendas>

                            <p>Vendas realizadas hoje</p>

                            <select value={paymentSelected as string} onChange={(e)=>{
                                const value = e.target.value as "pix" | "cartao" | "dinheiro" | "all"
                                setPaymentSelected(value)
                                filterPaymentMethod(value)
                                // console.log(e.target.value)
                            }}>
                                <option value="all" selected>Todas as vendas</option>
                                <option value="dinheiro" >Dinheiro</option>
                                <option value="cartao" >Cartao</option>
                                <option value="pix" >Pix</option>
                            </select>

                            <button onClick={extrairVendas}>Exportar relatorio</button>
                        
                    </HeadTitleVendas>
                    {/* <LabelPagamento>Data do dia</LabelPagamento> */}
                    <TableContainer>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Horario</th>
                                        <th>Produtos</th>
                                        <th>Total vendido</th>
                                        <th>Troco</th>
                                        <th>Metodo pagamento</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendasFiltradas.map((item, index)=>(
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
                                            <td>{item.tipoPagamento}</td>
                                        </tr>
                                        ))

                                    }
                                    
                                </tbody>
                            </table>
                    </TableContainer>
                    <FooterContainer>
                        <ContainerTotalValor>
                            <Text>Total vendido ({vendasFiltradas.length})</Text>
                            <Text>R$ {(vendasFiltradas.reduce((acc, cur)=> acc + cur.valorPago - cur.valorTroco, 0)).toFixed(2).replace(".", ",")}</Text>
                        </ContainerTotalValor>
                    </FooterContainer>
                </Modal>
            </ModalContainer>
        </>
    )
}