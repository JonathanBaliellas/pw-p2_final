export class Cliente {
    id: number = 0;
    nome: string = "";
    cpf: string = "";
    email: string = "";
    senha: string = "";
    cep: string = "";
    logradouro: string = "";
    complemento: string = "";
    bairro: string = "";
    cidade: string = "";
    uf: string = "";

    constructor(cliente?: Cliente){
        if (cliente != undefined) {
            this.id = cliente.id;
            this.nome = cliente.nome;
            this.cpf = cliente.cpf;
            this.email = cliente.email;
            this.senha = cliente.senha;
            this.cep = cliente.cep;
            this.logradouro = cliente.logradouro;
            this.complemento = cliente.complemento;
            this.bairro = cliente.bairro;
            this.cidade = cliente.cidade;
            this.uf = cliente.uf;
        }
    }
}
