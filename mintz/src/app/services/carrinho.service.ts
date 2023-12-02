import { Injectable } from '@angular/core';
import { IProdutoCarrinho } from '../produtos';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {
  itens: IProdutoCarrinho[] = [];

  constructor() { }

  obterCarrinho(){
    this.itens = JSON.parse(localStorage.getItem("carrinho") || "[]");
    return this.itens;
  }
  adicionarCarrinho(produto: IProdutoCarrinho){
    this.itens.push(produto);
    this.atualizarCarrinho();
  }
  removerCarrinho(produtoId: number){
    this.itens = this.itens.filter(item => item.id !== produtoId);
    this.atualizarCarrinho();
  }
  atualizarCarrinho(){
    localStorage.setItem("carrinho", JSON.stringify(this.itens));
  }
  limparCarrinho(){
    this.itens = [];
    localStorage.removeItem("carrinho");
  }
}
