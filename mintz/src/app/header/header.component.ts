import { Component } from '@angular/core';
import { CarrinhoService } from '../services/carrinho.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  clienteLogado: string | null = "";

  constructor(
    public carrinhoService: CarrinhoService
  ){}

  ngOnInit(){
    this.clienteLogado = localStorage.getItem("cliente");
  }

  logoff(): void{
    localStorage.clear();
    window.location.href = "/produtos";
  }
}
