import { Component } from '@angular/core';
// import { IProduto } from '../produtos';
import { ProdutosService } from '../services/produtos.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { Produtos } from './produtos.model';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent {
  // produto: Produtos = new Produtos();
  lista: Produtos[] = [];

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void{
    
    this.route.queryParams.pipe(
      // switchMap troca para um novo observable
      switchMap(() => this.produtosService.listar()),
      map((produtos: Produtos[]) => {
        // Pega a descrição digitada e converte para letras minúsculas
        const descricao = this.route.snapshot.queryParams["descricao"]?.toLowerCase();
  
        // Verifica se o produto digitado está presente na lista de produtos
        if (descricao) {
          return produtos.filter(produto => produto.descricao.toLowerCase().includes(descricao));
        }
  
        // Se não estiver no filtro, retorna toda a lista de produtos
        return produtos;
      })
    ).subscribe(produtos => {
      // O resultado final é atribuído a this.produtos
      this.lista = produtos;
    });
    
  }
  
}
