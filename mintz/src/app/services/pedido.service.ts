import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../pedidos/pedido.model';
import { Observable, concatMap, forkJoin, from, switchMap } from 'rxjs';
import { IProdutoCarrinho } from '../produtos';
import { PedidoProduto } from '../pedidos/pedido-produto.model';
import { PedidoProdutoService } from './pedido-produto.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(
    private http: HttpClient,
    private pedidoProdutoService: PedidoProdutoService
  ) { }

  public inserir(pedido: Pedido, itensCarrinho: IProdutoCarrinho[]): void {
    let pedido_id: number = 0;

    // Insere o pedido e, em seguida, insere os produtos
    this.http.post<number>("http://localhost:8081/api/pedido2", pedido).pipe(
      switchMap(
        (resposta: number) => {
          console.log("id pedido: " + resposta);
          pedido_id = resposta;
          console.log("var pedido_id no switchMap: " + pedido_id);

          // Retorna um novo observable para a inserção dos produtos
          return this.pedidoProdutoService.inserir(itensCarrinho, pedido_id);
        }
      )
    ).subscribe(
      () => {
        console.log("Operação concluída com sucesso!");
      },
      (erro) => {
        console.error("Erro ao inserir pedido:", erro);
      }
    );
  }
  
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
