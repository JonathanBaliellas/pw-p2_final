export class Pedido {
    id: number = 0;
    cliente_id: number = 0;
    valorTotal: number = 0;
    valorFrete: number = 0;
    status: string = "";

    constructor(pedido?: Pedido){
        if (pedido != undefined) {
            this.id = pedido.id;
            this.cliente_id = pedido.cliente_id;
            this.valorTotal = pedido.valorTotal;
            this.valorFrete = pedido.valorFrete;
            this.status = pedido.status;
        }
    }
}
