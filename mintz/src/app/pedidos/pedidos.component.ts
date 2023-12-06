import { Component } from '@angular/core';
import { Pedido } from './pedido.model';
import { PedidoService } from '../services/pedido.service';
import { Cliente } from '../cliente/cliente.model';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { PedidoProduto } from './pedido-produto.model';
import { PedidoProdutoService } from '../services/pedido-produto.service';
import { IProdutoCarrinho } from '../produtos';
import { ProdutosService } from '../services/produtos.service';
import { Produtos } from '../produtos/produtos.model';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  listaPedidos: Pedido[] = [];
  listaPedidoProdutos: PedidoProduto[] = [];
  listaProdutos: IProdutoCarrinho[] = []
  cliente: Cliente = new Cliente();
  tbody = document.getElementById('tbody');

  constructor(
    public pedidoService: PedidoService,
    public pedidoProdutoService: PedidoProdutoService,
    public produtoService: ProdutosService,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    const clienteLogado = localStorage.getItem("cliente");
    this.tbody = document.getElementById('tbody');
    if (clienteLogado != null) {
      this.cliente = JSON.parse(clienteLogado);

      this.route.queryParams.pipe(
        // switchMap troca para um novo observable
        switchMap(() => this.pedidoService.listar(this.cliente.id))
      ).subscribe(pedidos => {
        // O resultado final é atribuído a this.produtos
        this.listaPedidos = pedidos;
      });
    }
  }

  mostrarDetalhesPedido(pedido_id: number){
    //Limpa as variáveis
    this.listaPedidoProdutos = [];
    this.listaProdutos = [];

    //Limpa a tabela
    if (this.tbody) {
      while (this.tbody.firstChild) {
        this.tbody.removeChild(this.tbody.firstChild);
      }
    }

    //Consulta a lista de produtos do pedido
    try {
      this.route.queryParams.pipe(
        switchMap(() => this.pedidoProdutoService.listar(pedido_id))
      ).subscribe(listaProdutos => {
          this.listaPedidoProdutos = listaProdutos;
          console.log(listaProdutos);
          this.consultarProduto();
        }
      )
    } catch (error) {
      
    }
  }

  consultarProduto(){
    this.listaPedidoProdutos.forEach(element => {
      try {
        //Recupera informações do produto
        this.produtoService.consultar(element.produto_id).subscribe(
          (resposta: Produtos) => {
            this.adicionarProduto(resposta, element);
          }
        );
          
          
      } catch (error) {
        
      }
    });

    this.mostrarModal();
  }

  adicionarProduto(produto: Produtos, element: PedidoProduto){
    //Adiciona a quantidade no pedido
    const pedidoProduto: IProdutoCarrinho = {
      ...produto,
      quantidade: element.quant
    }
      
    //Insere o produto na lista
    this.listaProdutos.push(pedidoProduto);

    const tr = document.createElement('tr');
    for (let i = 0; i < 4; i++) {
      const td = document.createElement('td');
      tr.appendChild(td);
      switch (i) {
        case 0:
          const img = document.createElement('img');
          img.width = 100;
          img.src = pedidoProduto.imagem;
          td.appendChild(img);
          break;

        case 1:
          td.innerHTML = pedidoProduto.descricao;
          break;

        case 2:
          td.innerHTML = pedidoProduto.quantidade.toString();
          break;

        case 3:
          td.innerHTML = "R$ " + pedidoProduto.preco.toString();
      }
    }
    this.tbody?.append(tr);
  }

  mostrarModal(){
    //Mostra o modal
    (document.getElementById('divDetalhesPedido') as HTMLElement).style.display='block';
  }
}
    