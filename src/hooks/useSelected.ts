import { useEffect, useState } from "react"
import { ProdutoSelecionado, Product } from "../@types/produto";

export const useSelected = (produtos: Product[]) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [quantidades, setQuantidades] = useState<any>({})
    const [selectedList, setSelectedList] = useState<ProdutoSelecionado[]>([])
    const [total, setTotal] = useState(0)
    // const [productList, setProductList] = useState<Product[]>([])


    useEffect(()=>{
        calcTotal(selectedList)
    },[selectedList])


    const handleMinusClick = (id: number) => {
        // Obtenha a quantidade atual do produto com base no ID
        const currentQuantity = quantidades[id] || 0;
        
        // Verifique se a quantidade atual é maior que 0 antes de diminuí-la
        if (currentQuantity > 0) {
        const newQuantity = currentQuantity - 1;
        // Atualize o estado com a nova quantidade
        setQuantidades({
            ...quantidades,
            [id]: newQuantity,
        });
      updateSelectedItems(id, "REMOVE", 1)
    }

    };
    
    const handlePlusClick = (id: number) => {
        // Obtenha a quantidade atual do produto com base no ID
        const currentQuantity = quantidades[id] || 0;
        
        const newQuantity = currentQuantity + 1;
        // Atualize o estado com a nova quantidade
        setQuantidades({
            ...quantidades,
            [id]: newQuantity,
        });
        updateSelectedItems(id, "ADD", newQuantity)
    };

    const updateSelectedItems = (itemId: number, action: string, quantidade: number) => {
        switch (action){
            case 'REMOVE':
                setSelectedList(prevList => {
                    // Encontre o item pelo id
                    const selectedItem = prevList.find(item => item.id === itemId);
            
                    if (!selectedItem) {
                    // Se o item não for encontrado, retorne a lista original
                        return prevList;
                    }
            
                    if (selectedItem.qtdEscolhida > 1) {
                    // Se o valor do item for maior que 1, apenas decremente-o
                        return prevList.map(item =>
                            item.id === itemId ? { ...item, qtdEscolhida: item.qtdEscolhida - 1 } : item
                        );
                    } else {
                    // Se o valor do item for igual a 1, remova-o da lista
                        return prevList.filter(item => item.id !== itemId);
                    }
                });
                
                break;
            case 'ADD':
                // console.log("Objeto de saida", {itemId, action, quantidade})
                // console.log("Adicionando flanvers", selectedList.findIndex(element => element.id == itemId))
                if((selectedList.findIndex(element => element.id == itemId)) != -1){
                    // let novaQtd = element
                    setSelectedList(prevItems => prevItems.map(item => {
                        if(item.id === itemId){
                            return {...item, qtdEscolhida: quantidade}
                        }
                        return item
                    }))
                }else{
                    const itemSelecionado = produtos.filter(item => item.id == itemId )
                    // adicionar item
                    const copyList = selectedList;
                    copyList.push({
                        id: Number(itemSelecionado[0].id),
                        name: itemSelecionado[0].name,
                        qtdEscolhida: quantidade,
                        precoUni: itemSelecionado[0].price
                    })
                    setSelectedList(copyList)
                    
                }
                calcTotal(selectedList)
                break;
            default:
                break;
        }
    }

    const calcTotal = (selectedList: ProdutoSelecionado[]) => {
        setTotal(selectedList.reduce((acumulador, currentValue)=> {
            return acumulador + currentValue.precoUni * currentValue.qtdEscolhida
        }, 0))
    }

    return {
        quantidades,
        selectedList,
        total,
        setQuantidades,
        handleMinusClick,
        handlePlusClick,
        setSelectedList
    }
}