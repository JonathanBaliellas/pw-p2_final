import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../pedidos/pedido.model';
import { Observable } from 'rxjs';
import { IProdutoCarrinho } from '../produtos';
import { PedidoProduto } from '../pedidos/pedido-produto.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  public inserir(pedido: Pedido){
    this.http.post<String>("http://localhost:8081/api/pedido", pedido).subscribe();
  }
  /*
  public inserir(pedido: Pedido, itensCarrinho: IProdutoCarrinho[]){
    this.http.post<number>("http://localhost:8081/api/pedido2", pedido).subscribe(
      (msg: number) => {
        console.log("id pedido: " + msg);
        itensCarrinho.forEach(element => {
          let pedidoProduto: PedidoProduto = new PedidoProduto();
          pedidoProduto.pedido_id = msg;
          pedidoProduto.quant = element.quantidade;
          pedidoProduto.produto_id = element.id;
          pedidoProduto.valor = element.preco;

          //Insere o produto ao pedido
          
          console.log(element.descricao);
          console.log(pedidoProduto.pedido_id + " quant: " + pedidoProduto.quant + " id_produto: " + pedidoProduto.produto_id);
          // console.log(this.http.post<String>("http://localhost:8081/api/pedido-produto", pedidoProduto).subscribe());
        });
      }
    );
  }
  */
  public atualizar(pedido: Pedido){
    this.http.put<String>("http://localhost:8081/api/pedido", pedido).subscribe();
  }

  public consultar(id: number): Observable<Pedido>{
    return this.http.get<Pedido>("http://localhost:8081/api/pedido/" + id);
  }

  //Lista todos os pedidos de um determinado cliente
  public listar(cliente_id: number): Observable<Pedido[]>{
    return this.http.get<Pedido[]>("http://localhost:8081/api/pedido/lista/" + cliente_id);
  }
}
