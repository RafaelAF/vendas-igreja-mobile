import { useContext, useEffect, useState } from "react"
import { HeaderContainer, LabelPagamento, MiniModal, ModalContainer } from "../styles"
import { ModaisContext } from "../contexts/modaisContext"

import IconClose from '../assets/X.svg'
import { ButtonCadastro, ButtonConfirmTickets, CadastroContainer, CountTicket, FinishIcon, FishTitle, InputCustom, LabelContent, PaymentContainer, PaymentItem, PaymentItemActive, SelectTicketsContainer, SpinnerContainer, TicketItem } from "./styles/styles"
import { usePagamento } from "../hooks/usePagamento"
import { ProdutoSelecionado } from "../@types/produto"

import loadIcon from '../assets/CircleNotch.svg'
import AprovedIcon from '../assets/PaymentAproved.svg'



type Props = {
    selecao: ProdutoSelecionado[],
    total: number,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    closeAll: any
}

type Operation = 'PLUS' | 'MINUS'

export const ModalPagamento = ({selecao, total, closeAll}: Props) => {
    const modaisCtx = useContext(ModaisContext)

    const [valorPago, setValorPago] = useState('')
    const [troco, setTroco] = useState(0)

    const [totalTicket, setTotalTicket] = useState(0)

    const [ticket, setTicket] = useState({
        ticket1: 0,
        ticket2: 0,
        ticket3: 0,
        ticket4: 0,
        ticket5: 0
    })

    // const [canSele] = useState(true)

    const [hasAllTickets, setHasAllTickets] = useState(false)


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

    const checkCanReduce = (ticketValue: number, restTiticket: number) => {
        if(restTiticket <= ticketValue) return true
        return false
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
            }, 500)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[payment.pago])

    useEffect(()=>{
        setTotalTicket(total)

        
    },[total])

    useEffect(()=>{
        if(totalTicket == 0){
            setHasAllTickets(true)
        }else{
            setHasAllTickets(false)
        }
    },[totalTicket])

    const handleCloseAll = () => {
        closeAll.setSelectedList([])
        closeAll.setQuantidades({})
        modaisCtx?.dispatch({type:"OPEN_PAGAMENTO", payload: {acao: false}})
        modaisCtx?.dispatch({type:"OPEN_SELECIONADOS", payload: {acao: false}})
        // selecao = []
    }

    const handleChoseTicket = (value: number, operation: Operation) => {
        switch (value) {
            case 1:
                if(operation == 'PLUS'){
                    if(totalTicket > 0){
                        if(checkCanReduce(totalTicket, value)){
                            setTicket({...ticket, ticket1: ticket.ticket1 + 1})
                            updateRestValue(totalTicket, value, operation)
                        }
                    }
                }else{
                    if(ticket.ticket1 > 0){
                        setTicket({...ticket, ticket1: ticket.ticket1 - 1})
                        updateRestValue(totalTicket, value, operation)
                        console.log("VAlor aqui", value)
                    }
                }
                
                return;
            case 2:
                if(operation == 'PLUS'){
                    if(totalTicket > 0){
                        if(checkCanReduce(totalTicket, value)){
                            setTicket({...ticket, ticket2: ticket.ticket2 + 1})
                            updateRestValue(totalTicket, value, operation)
                        }
                    }
                }else{
                    if(ticket.ticket2 > 0){
                        setTicket({...ticket, ticket2: ticket.ticket2 - 1})
                        updateRestValue(totalTicket, value, operation)
                    }
                }
                return;
            case 3:
                if(operation == 'PLUS'){
                    if(totalTicket > 0){
                        if(checkCanReduce(totalTicket, value)){
                            setTicket({...ticket, ticket3: ticket.ticket3 + 1})
                            updateRestValue(totalTicket, value, operation)
                        }
                    }
                }else{
                    if(ticket.ticket3 > 0){
                        setTicket({...ticket, ticket3: ticket.ticket3 - 1}) 
                        updateRestValue(totalTicket, value, operation)
                    }
                }
                return;
            case 4:
                if(operation == 'PLUS'){
                    if(totalTicket > 0){
                        if(checkCanReduce(totalTicket, value)){
                            setTicket({...ticket, ticket4: ticket.ticket4 + 1})
                            updateRestValue(totalTicket, value, operation)
                        }
                    }
                }else{
                    if(ticket.ticket4 > 0){
                        setTicket({...ticket, ticket4: ticket.ticket4 - 1})
                        updateRestValue(totalTicket, value, operation)
                    }
                }
                return;
            case 5:
                if(operation == 'PLUS'){
                    if(totalTicket > 0){
                        if(checkCanReduce(totalTicket, value)){
                            setTicket({...ticket, ticket5: ticket.ticket5 + 1})
                            updateRestValue(totalTicket, value, operation)
                        }
                    }
                }else{
                    if(ticket.ticket5 > 0){
                        setTicket({...ticket, ticket5: ticket.ticket5 - 1})
                        updateRestValue(totalTicket, value, operation)
                    }
                }
                return;
            default:
                return;
        }
    }

    const updateRestValue = (amountValue: number, ticketValue: number, operation: Operation) => {
        console.log(amountValue, ticketValue, operation)
        if(operation == "PLUS"){
            if(totalTicket > 0){
                setTotalTicket(totalTicket - ticketValue)
            }
        }else{
            setTotalTicket(totalTicket + ticketValue)
        }
        
    }

    return (
        <ModalContainer>
            <MiniModal>
                <HeaderContainer>
                        <span></span>
                        {!payment.load && !payment.pago && !payment.selectTicket &&
                            <img onClick={handleCloseModal} src={IconClose} style={{width: "32px"}} alt="" />
                        }
                        {!payment.load && payment.pago && payment.selectTicket &&
                            <img onClick={handleCloseAll} src={IconClose} style={{width: "32px"}} alt="" />
                        }
                </HeaderContainer>
                {!payment.pago && !payment.load && !payment.selectTicket && 
                    <CadastroContainer>
                        <LabelContent>
                            <LabelPagamento>Forma de pagamento</LabelPagamento>
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
                            <LabelPagamento>Valor Pago</LabelPagamento>
                            <InputCustom value={valorPago} placeholder="Digite apenas numeros" type="number" onChange={(e)=>{
                                setValorPago(e.target.value)
                            }} />
                        </LabelContent>
                        <LabelContent>
                            <LabelPagamento>Troco</LabelPagamento>
                            <InputCustom disabled={true} value={troco < 0 ? "Valor inferior ao total" : `R$ ${troco.toFixed(2)}`} placeholder="R$ 0,00" type="text" />
                        </LabelContent>
                        
                        <ButtonCadastro onClick={()=>{
                            if(troco >= 0){
                                handleFinishSell()
                            }
                        }}>Finalizar</ButtonCadastro>
                    </CadastroContainer>
                }
                {payment.pago && payment.load && !payment.selectTicket && 
                    <SpinnerContainer>
                        <img src={loadIcon} alt="" />
                    </SpinnerContainer>
                }
                {payment.pago && !payment.load && !payment.selectTicket && 
                    <>  
                        <SelectTicketsContainer>
                            <LabelPagamento style={{width: '50%'}}>Selecao de  tickets Valor restante</LabelPagamento>
                            <LabelPagamento>R$ {totalTicket}</LabelPagamento>
                            {/* <Title>R$ {troco}</Title> */}
                        </SelectTicketsContainer>
                        <SelectTicketsContainer>
                            <TicketItem>TICKET 1</TicketItem>
                            <div>
                                <TicketItem onClick={()=>{
                                    handleChoseTicket(1, "MINUS")
                                }}>-</TicketItem>
                                <CountTicket>{ticket.ticket1}</CountTicket>
                                <TicketItem onClick={()=>{
                                    handleChoseTicket(1, "PLUS")
                                }}>+</TicketItem>
                            </div>
                        </SelectTicketsContainer>
                        <SelectTicketsContainer>
                            <TicketItem>TICKET 2</TicketItem>
                            <div>
                                <TicketItem onClick={()=>{
                                    handleChoseTicket(2, "MINUS")
                                }}>-</TicketItem>
                                <CountTicket>{ticket.ticket2}</CountTicket>
                                <TicketItem onClick={()=>{
                                    handleChoseTicket(2, "PLUS")
                                }}>+</TicketItem>
                            </div>
                        </SelectTicketsContainer>
                        <SelectTicketsContainer>
                            <TicketItem>TICKET 3</TicketItem>
                            <div>
                                <TicketItem onClick={()=>{
                                    handleChoseTicket(3, "MINUS")
                                }}>-</TicketItem>
                                <CountTicket>{ticket.ticket3}</CountTicket>
                                <TicketItem onClick={()=>{
                                    handleChoseTicket(3, "PLUS")
                                }}>+</TicketItem>
                            </div>
                        </SelectTicketsContainer>
                        <SelectTicketsContainer>
                            <TicketItem>TICKET 4</TicketItem>
                            <div>
                                <TicketItem onClick={()=>{
                                    handleChoseTicket(4, "MINUS")
                                }}>-</TicketItem>
                                <CountTicket>{ticket.ticket4}</CountTicket>
                                <TicketItem onClick={()=>{
                                    handleChoseTicket(4, "PLUS")
                                }}>+</TicketItem>
                            </div>
                        </SelectTicketsContainer>
                        <SelectTicketsContainer>
                            <TicketItem>TICKET 5</TicketItem>
                            <div>
                                <TicketItem onClick={()=>{
                                    handleChoseTicket(5, "MINUS")
                                }}>-</TicketItem>
                                <CountTicket>{ticket.ticket5}</CountTicket>
                                <TicketItem onClick={()=>{
                                    handleChoseTicket(5, "PLUS")
                                }}>+</TicketItem>
                            </div>
                        </SelectTicketsContainer>
                        <SelectTicketsContainer>
                            <ButtonConfirmTickets disabled={!hasAllTickets} onClick={()=>{
                                payment.setSelectTicket(true)
                            }}>Finalizar</ButtonConfirmTickets>
                        </SelectTicketsContainer>
                    </>
                    
                }
                {payment.pago && !payment.load && payment.selectTicket && 
                    <>
                        <FishTitle>Muito Obrigado</FishTitle>
                        <FinishIcon src={AprovedIcon} alt="" />
                    </>
                }
            </MiniModal>
        </ModalContainer>
    )
}