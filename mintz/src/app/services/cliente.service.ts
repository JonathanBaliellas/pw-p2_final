import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../cliente/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  public inserir(cliente: Cliente){
    this.http.post<String>("http://localhost:8081/api/cliente", cliente).subscribe();
  }

  public atualizar(cliente: Cliente){
    this.http.put<String>("http://localhost:8081/api/cliente", cliente).subscribe();
  }

  public consultar(id: number): Observable<Cliente>{
    return this.http.get<Cliente>("http://localhost:8081/api/cliente/" + id);
  }

  public excluir(id: number){
    return this.http.delete<String>("http://localhost:8081/api/cliente/" + id).subscribe();
  }

  public logar(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>("http://localhost:8081/api/cliente/login", cliente);
  }

  public recuperarSenha(cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>("http://localhost:8081/api/cliente/recuperar-senha", cliente);
  }
}
