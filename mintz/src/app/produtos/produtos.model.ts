export class Produtos {
    id: number = 0;
    descricao: string = "";
    preco: number = 0;
    descricaoPreco: string = "";
    imagem: string = "";
    quantEstoque: number = 0;

    constructor(obj?: Produtos){
        if (obj != undefined) {
            this.id = obj.id;
            this.descricao = obj.descricao;
            this.preco = obj.preco;
            this.descricaoPreco = obj.descricaoPreco;
            this.imagem = obj.imagem;
            this.quantEstoque = obj.quantEstoque;
        }
    }
}
