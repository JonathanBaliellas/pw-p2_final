import { Injectable } from '@angular/core';
import { IProduto, produtos } from '../produtos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produtos } from '../produtos/produtos.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {
  /* Versão antiga P1
  produtos: IProduto[] = produtos;
  constructor() { }

  getAll(){return this.produtos}
  getOne(produtoId: number){return this.produtos.find(produto => produto.id == produtoId)}
  */

  //VERSÃO P2
  constructor(private http: HttpClient){}

  public consultar(id: number): Observable<Produtos>{
    return this.http.get<Produtos>("http://localhost:8081/api/produto/" + id);
  }

  public listar(): Observable<Produtos[]>{
    return this.http.get<Produtos[]>("http://localhost:8081/api/produto/lista");
  }
}
