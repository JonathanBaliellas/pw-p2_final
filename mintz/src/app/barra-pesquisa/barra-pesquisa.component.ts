import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barra-pesquisa',
  templateUrl: './barra-pesquisa.component.html',
  styleUrls: ['./barra-pesquisa.component.css']
})
export class BarraPesquisaComponent {
  descricao = "";

  constructor(
    private router: Router
  ){}
  ngOnInit(): void{}

  pesquisar(){//Faz a pesquisa e redireciona para a página de produtos
    //Se houver uma descrição, o redirecionamento será acompanhado do parâmetro (texto) digitado na barra de busca
    if(this.descricao){
      this.router.navigate(["produtos"], {queryParams: {descricao: this.descricao}});
      return;
    }

    //Se não houver descrição, o redirecionamento ocorre sem parâmetros, trazendo todos os produtos (pesquisa vazia)
    this.router.navigate(["produtos"]);
  }
}
