import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pedido } from '../pedidos/pedido.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http: HttpClient) { }

  public inserir(pedido: Pedido){
    this.http.post<String>("http://localhost:8081/api/pedido", pedido).subscribe();
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
