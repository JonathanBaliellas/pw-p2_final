import { Component } from '@angular/core';
import { Pedido } from './pedido.model';
import { PedidoService } from '../services/pedido.service';
import { Cliente } from '../cliente/cliente.model';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent {
  listaPedidos: Pedido[] = [];
  cliente: Cliente = new Cliente();

  constructor(
    public pedidoService: PedidoService,
    private route: ActivatedRoute
  ){}

  ngOnInit(){
    const clienteLogado = localStorage.getItem("cliente");
    if (clienteLogado != null) {
      this.cliente = JSON.parse(clienteLogado);


      this.route.queryParams.pipe(
        // switchMap troca para um novo observable
        switchMap(() => this.pedidoService.listar(this.cliente.id))
        /*
        ,
        map((pedidos: Pedido[]) => {
          // Pega a descrição digitada e converte para letras minúsculas
          const descricao = this.route.snapshot.queryParams["descricao"]?.toLowerCase();
    
          // Verifica se o produto digitado está presente na lista de produtos
          if (descricao) {
            return pedidos.filter(produto => produto.descricao.toLowerCase().includes(descricao));
          }
    
          // Se não estiver no filtro, retorna toda a lista de produtos
          return pedidos;
        })
        */
      ).subscribe(pedidos => {
        // O resultado final é atribuído a this.produtos
        this.listaPedidos = pedidos;
      });


      //this.listaPedidos = this.pedidoService.listar(this.cliente.id);
    }
  }
}
