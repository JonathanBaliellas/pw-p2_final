import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarrinhoService } from 'src/app/services/carrinho.service';
import { NotificacaoService } from 'src/app/services/notificacao.service';
import { IProduto, IProdutoCarrinho } from 'src/app/produtos';
import { ProdutosService } from 'src/app/services/produtos.service';
import { Produtos } from '../produtos.model';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhes-produto.component.html',
  styleUrls: ['./detalhes-produto.component.css']
})
export class DetalhesProdutoComponent {
  // produto: IProduto | undefined;
  // produto: Produtos | undefined;
  produto: Produtos = new Produtos();
  quant = 1;

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private notificacaoService: NotificacaoService,
    private carrinhoService: CarrinhoService
  ){}

  ngOnInit(): void{
    /*VERSÃO P1
    const routeParams = this.route.snapshot.paramMap;
    const produtoId = Number(routeParams.get("id"));
    this.produto =  this.produtosService.consultar(produtoId);
    console.log(produtoId);
    console.log(this.produto)
    */
   //VERSÃO P2
   let produtoId = this.route.snapshot.paramMap.get("id");
   if (produtoId != null) {
      this.produto.id = Number(produtoId);
      this.consultar();
   }
  }

  adicionarCarrinho(){
    this.notificacaoService.notificar("Produto adicionado ao carrinho");
    const produto: IProdutoCarrinho = {
      ...this.produto!,
      quantidade: this.quant
    }
    this.carrinhoService.adicionarCarrinho(produto);
  }

  //P2
  consultar(){
    try {
      this.produtosService.consultar(this.produto.id).subscribe(
        (retorno: Produtos) =>{
          this.produto.descricao = retorno.descricao;
          this.produto.descricaoPreco = retorno.descricaoPreco;
          this.produto.imagem = retorno.imagem;
          this.produto.preco = retorno.preco;
          this.produto.quantEstoque = retorno.quantEstoque;
          if (retorno.descricao == null) {
            console.log("Registro não encontrado");
            window.location.href = "./nao-encontrado"
          }
        }
      )
    } catch (error) {
      
    }
  }
}
