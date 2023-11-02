import { useState } from "react"
import { ProdutoSelecionado, TypePaymentMethod, Venda } from "../@types/produto"

export const usePagamento = () => {

    const [paymentMethod, setPaymentMethod] = useState<TypePaymentMethod>({method: "pix"})

    const [pago, setPago] = useState(false)

    const [load, setLoad] = useState(false)

    const changeMethod = (metodo: TypePaymentMethod) => {
        switch (metodo.method) {
            case "pix":
                setPaymentMethod({method: metodo.method})
                break;
            case "cartao":
                setPaymentMethod({method: metodo.method})
                break;
            case "dinheiro":
                setPaymentMethod({method: metodo.method})
                break;
            default:
                break;
        }
    }

    const finishPagamento = (selectedList: ProdutoSelecionado[], valorPago: number, troco: number, metodoPagamento: TypePaymentMethod) => {
        const dataVendas = localStorage.getItem("Vendas")
        const totalVendido = localStorage.getItem("TotalVendido")

        const venda: Venda = {
            id: new Date().getTime(),
            produtos: selectedList,
            tipoPagamento: metodoPagamento.method,
            valorPago,
            troco: troco > 0 ? true : false,
            valorTroco: troco
        }

        if(dataVendas){
            const vendas = JSON.parse(dataVendas)
            console.log("Valor da venda", valorPago - troco)
            vendas.push(venda)
            localStorage.setItem("Vendas", JSON.stringify(vendas))
        }else{
            const vendas = []
            vendas.push(venda)
            console.log("Valor da venda", valorPago - troco)
            localStorage.setItem("Vendas", JSON.stringify(vendas))
        }
        if(totalVendido){
            localStorage.setItem("TotalVendido", JSON.stringify(Number(totalVendido)+ (valorPago - troco)))
        }else{
            localStorage.setItem("TotalVendido", JSON.stringify(valorPago - troco))
        }
        // console.log("venda feita", venda)
        // salvar a venda aqui
        setPago(true)
    }


    return {
        paymentMethod,
        pago,
        load,
        finishPagamento,
        changeMethod,
        setLoad
    }
}