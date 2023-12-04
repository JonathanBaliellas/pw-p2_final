import { Component } from '@angular/core';
import { Cliente } from './cliente.model';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { NotificacaoService } from '../services/notificacao.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  msg: string = "";
  cliente: Cliente = new Cliente();
  senha: string = "";
  confirmarSenha: string = "";
  senhasDiferentes: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private routes: ActivatedRoute,
    private notificacaoService: NotificacaoService
  ){}
    

  ngOnInit(){
    const clienteLogado = localStorage.getItem("cliente");
    if (clienteLogado != null) {
      this.cliente = JSON.parse(clienteLogado);
    }
  }

  atualizar(): void{
    if (this.senha.length > 0) {
      if (this.senha == this.confirmarSenha) {
        this.cliente.senha = this.senha;
      } else {
        this.notificacaoService.notificar("A senha e a confirmação não batem");
        return;
      }
    }
    try {
        this.clienteService.atualizar(this.cliente);
        this.msg = "Dados atualizados com sucesso";
        this.notificacaoService.notificar(this.msg);
    } catch (error) {
      this.notificarErro();
    }
    //Atualiza as informações
    localStorage.setItem("cliente", JSON.stringify(this.cliente));
  }

  consultar(){
    this.msg = "";
    try {
      this.clienteService.consultar(this.cliente.id).subscribe(
        (resposta: Cliente) => {
          this.cliente.bairro = resposta.bairro;
          this.cliente.cep = resposta.cep;
          this.cliente.cidade = resposta.cidade;
          this.cliente.complemento = resposta.complemento;
          this.cliente.cpf = resposta.cpf;
          this.cliente.email = resposta.email;
          this.cliente.logradouro = resposta.logradouro;
          this.cliente.nome = resposta.nome;
          this.cliente.senha = resposta.senha;
          this.cliente.uf = resposta.uf;

          if (resposta.nome == null) {
            this.msg = "Registro não encontrado";
            this.notificacaoService.notificar(this.msg);
          }
        }
      );
    } catch (error) {
      this.notificarErro();
    }
  }

  excluir(): void{
    try {
      this.clienteService.excluir(this.cliente.id);
      this.msg = "Conta excluída com sucesso";
      window.alert(this.msg);
      localStorage.clear();
      window.location.href = "./produtos";
    } catch (error) {
      this.notificarErro();
    }
  }

  notificarErro(){
    this.msg = "Ops, parece algo deu errado";
    this.notificacaoService.notificar(this.msg);
  }

  verificarSenhas(): void{
    this.senhasDiferentes = this.senha !== this.confirmarSenha;
  }
}
