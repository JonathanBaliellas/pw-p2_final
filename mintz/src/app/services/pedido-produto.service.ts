import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoProduto } from '../pedidos/pedido-produto.model';
import { IProdutoCarrinho } from '../produtos';
import { Observable, concatMap, forkJoin, from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoProdutoService {

  constructor(private http: HttpClient) { }
  
  public inserir(itensCarrinho: IProdutoCarrinho[], pedido_id: number): Observable<any> {
    // Cria um array de observables para inserir os produtos
    const observables: Observable<any>[] = itensCarrinho.map(element => {
        let pedidoProduto: PedidoProduto = new PedidoProduto();
        pedidoProduto.pedido_id = pedido_id;
        pedidoProduto.quant = element.quantidade;
        pedidoProduto.produto_id = element.id;
        pedidoProduto.preco = element.preco;

        console.log(element.descricao);
        console.log(pedidoProduto.pedido_id + " quant: " + pedidoProduto.quant + " id_produto: " + pedidoProduto.produto_id);

        // Retorna o observable para a inserção do produto
        return this.http.post<String>("http://localhost:8081/api/pedido-produto", pedidoProduto);
    });

    // Usa o forkJoin para aguardar a conclusão de todos os observables
    return forkJoin(observables);
  }

  public atualizar(produto: PedidoProduto){
    this.http.put<String>("http://localhost:8081/api/pedido-produto", produto).subscribe();
  }

  public listar(pedido_id: number): Observable<PedidoProduto[]>{
    return this.http.get<PedidoProduto[]>("http://localhost:8081/api/pedido-produto/listar/" + pedido_id);
  }
}
