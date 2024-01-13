import { useContext, useEffect, useState } from "react"
import { HeaderContainer, MiniModal, ModalContainer, Title } from "../styles"
import { ModaisContext } from "../contexts/modaisContext"

import IconClose from '../assets/X.svg'
import { ButtonCadastro, CadastroContainer, InputCustom, LabelContent, PaymentContainer, PaymentItem, PaymentItemActive } from "./styles/styles"
import { usePagamento } from "../hooks/usePagamento"
import { ProdutoSelecionado } from "../@types/produto"


type Props = {
    selecao: ProdutoSelecionado[],
    total: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    closeAll: any
}

export const ModalPagamento = ({selecao, total, closeAll}: Props) => {
    const modaisCtx = useContext(ModaisContext)

    const [valorPago, setValorPago] = useState('')
    const [troco, setTroco] = useState(0)

    const handleCloseModal = () => {
        modaisCtx?.dispatch({type: "OPEN_PAGAMENTO", payload: {acao: false}})
    }

    const payment = usePagamento()

    const handleFinishSell = () => {
        if(parseFloat(valorPago) && payment.paymentMethod.method){
            // console.log("Finalizando compra", valorPago, payment.paymentMethod.method)
            // console.log("Troco", parseFloat(valorPago) - total)
            // console.log("Salvar venda...")

            payment.finishPagamento(selecao, parseFloat(valorPago), troco, payment.paymentMethod)
            payment.setLoad(true)
            payment.changeMethod({method: "pix"})
            setValorPago('')
        }
    }

    useEffect(()=>{
        if(parseFloat(valorPago)){
            setTroco(parseFloat(valorPago) - total)
        }else{
            setTroco(0)
        }
    },[valorPago, total])


    useEffect(()=>{
        if(payment.pago && payment.load){
            setTimeout(()=>{
                payment.setLoad(false)
                // modaisCtx?.dispatch({})
            }, 2000)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[payment.pago])

    const handleCloseAll = () => {
        closeAll.setSelectedList([])
        closeAll.setQuantidades({})
        modaisCtx?.dispatch({type:"OPEN_PAGAMENTO", payload: {acao: false}})
        modaisCtx?.dispatch({type:"OPEN_SELECIONADOS", payload: {acao: false}})
        // selecao = []
    }

    return (
        <ModalContainer>
            <MiniModal>
                <HeaderContainer>
                        <span></span>
                        {!payment.load && !payment.pago &&
                            <img onClick={handleCloseModal} src={IconClose} style={{width: "32px"}} alt="" />
                        }
                        {!payment.load && payment.pago &&
                            <img onClick={handleCloseAll} src={IconClose} style={{width: "32px"}} alt="" />
                        }
                </HeaderContainer>
                {!payment.pago && !payment.load && 
                    <CadastroContainer>
                        <LabelContent>
                            <Title>Forma de pagamento</Title>
                            <PaymentContainer>
                                {payment.paymentMethod.method == "pix" &&
                                    <PaymentItemActive onClick={()=>{payment.changeMethod({method: "pix"})}}>PIX</PaymentItemActive>
                                }
                                {payment.paymentMethod.method != "pix" &&
                                    <PaymentItem onClick={()=>{payment.changeMethod({method: "pix"})}}>PIX</PaymentItem>
                                }
                                {payment.paymentMethod.method == "cartao" &&
                                    <PaymentItemActive onClick={()=>{payment.changeMethod({method: "cartao"})}}>CARTAO</PaymentItemActive>
                                }
                                {payment.paymentMethod.method != "cartao" &&
                                    <PaymentItem onClick={()=>{payment.changeMethod({method: "cartao"})}}>CARTAO</PaymentItem>
                                }
                                {payment.paymentMethod.method == "dinheiro" &&
                                    <PaymentItemActive onClick={()=>{payment.changeMethod({method: "dinheiro"})}}>DINHEIRO</PaymentItemActive>
                                }
                                {payment.paymentMethod.method != "dinheiro" &&
                                    <PaymentItem onClick={()=>{payment.changeMethod({method: "dinheiro"})}}>DINHEIRO</PaymentItem>
                                }
                            </PaymentContainer>
                        </LabelContent>
                        <LabelContent>
                            <Title>Valor Pago</Title>
                            <InputCustom value={valorPago} placeholder="Digite apenas numeros" type="text" onChange={(e)=>{
                                setValorPago(e.target.value)
                            }} />
                        </LabelContent>
                        <LabelContent>
                            <Title>Troco</Title>
                            <InputCustom disabled={true} value={troco < 0 ? "Valor inferior ao total" : `R$ ${troco.toFixed(2)}`} placeholder="R$ 0,00" type="text" />
                        </LabelContent>
                        
                        <ButtonCadastro onClick={()=>{
                            if(troco >= 0){
                                handleFinishSell()
                            }
                        }}>Finalizar</ButtonCadastro>
                    </CadastroContainer>
                }
                {payment.pago && payment.load && 
                    <div>Carregando ...</div>
                }
                {payment.pago && !payment.load && 
                    <div>Muito Obrigado</div>
                }
            </MiniModal>
        </ModalContainer>
    )
}