import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CarrinhoService } from '../services/carrinho.service';
import { IProdutoCarrinho } from '../produtos';
import { PedidoService } from '../services/pedido.service';
import { Cliente } from '../cliente/cliente.model';
import { Pedido } from '../pedidos/pedido.model';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent {
  itensCarrinho: IProdutoCarrinho[] = [];
  total: number = 0.00;
  cliente: Cliente = new Cliente();

  constructor(
    public carrinhoService: CarrinhoService,
    private router: Router,
    public pedidoService: PedidoService
  ){}

  ngOnInit():void{
    this.consultarCarrinho();
    this.calcularTotal();
  }

  removerItem(itemId: number){
    this.carrinhoService.removerCarrinho(itemId);
    this.consultarCarrinho();
    this.calcularTotal();
  }

  calcularTotal(){
    this.total = this.itensCarrinho.reduce((prev, curr) => prev + (curr.preco * curr.quantidade), 0);
  }

  consultarCarrinho(){
    this.itensCarrinho = this.carrinhoService.obterCarrinho();
  }

  atualizarCarrinho(){
    this.carrinhoService.atualizarCarrinho();
  }

  comprar(){
    const clienteLogado = localStorage.getItem("cliente");
    if (clienteLogado != null) {
      this.cliente = JSON.parse(clienteLogado);

      //Gera o pedido
      let pedido = new Pedido();
      pedido.cliente_id = this.cliente.id;
      pedido.status = "Pagamento confirmado";
      pedido.valorFrete = 10;
      pedido.valorTotal = this.total;
      
      //Envia o pedido
      this.pedidoService.inserir(pedido);

      //Finaliza a compra
      alert('Obrigado pela compra, ' + this.cliente.nome + '!');
      this.carrinhoService.limparCarrinho();
      this.router.navigate(['produtos']);
    } else {
      alert('Você não está logado');
    }
  }

  limparCarrinho(){
    this.carrinhoService.limparCarrinho();
    this.consultarCarrinho();
  }
}
