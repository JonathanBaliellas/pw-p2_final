export class PedidoProduto {
    id: number = 0;
    produto_id: number = 0
    pedido_id: number = 0;
    quant: number = 0;
    valor: number = 0;

    constructor(pedidoProduto?: PedidoProduto){
        if (pedidoProduto != undefined) {
            this.id = pedidoProduto.id;
            this.pedido_id = pedidoProduto.pedido_id;
            this.produto_id = pedidoProduto.produto_id;
            this.quant = pedidoProduto.quant;
            this.valor = pedidoProduto.valor;
        }
    }
}
