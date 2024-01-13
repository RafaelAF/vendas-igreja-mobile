banco de dados json

usuario existe?
    sim
        abre banco relacionado
    nao
        cria o banco


        317b x 1,2kB

{
    "users": [
        {
            "id": "user 1",
            "products": [
                {
                    "id": "1465498794546",
                    "name": "Lorem ipsum",
                    "price": 123,
                    "qtd": 99
                }
            ],
            "vendas": [
                {
                    "idVenda": 1645798,
                    "produtos": [
                        {
                            "idProduct": "1",
                            "precoUni": 10,
                            "qtdEscolhida": 3,
                            "subtotal": 30,
                            "valorPago": 50,
                            "formaPagamento": "dinheiro",
                            "troco": 20,
                            "ticketsUsados": [
                                {
                                    "dot1": 0,
                                    "dot2": 1,
                                    "dot3": 0,
                                    "dot4": 2,
                                    "dot5": 4
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}