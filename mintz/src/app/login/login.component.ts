import { Component } from '@angular/core';
import { Cliente } from '../cliente/cliente.model';
import { ClienteService } from '../services/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { NotificacaoService } from '../services/notificacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  msg: string = "";
  cliente: Cliente = new Cliente();
  clienteRecuperacao: Cliente = new Cliente();
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
      window.location.href = "/minha-conta"
      
    }
  }
    
  cadastrar(): void{
    try {
      this.clienteService.inserir(this.cliente);
      this.msg = "Cadastro efetuado com sucesso"
    } catch (error) {
      this.msg = "Ops, parece que algo deu errado";
    }
    (document.getElementById('divCadastro') as HTMLElement).style.display = 'none';
    window.alert(this.msg);


  }

  recuperarSenha(): void{
    try {
      this.clienteService.recuperarSenha(this.clienteRecuperacao).subscribe(
        (resposta: Cliente) => {
          if (resposta.nome == null) {
            //Se a resposta for nula, significa que o usuário cujo email e senha informados não foi localizado
            this.msg = "Email não localizado";
            this.notificacaoService.notificar(this.msg);
          } else {
            //Se encontrar, recebe os valores
            this.clienteRecuperacao.id = resposta.id;
            this.clienteRecuperacao.bairro = resposta.bairro;
            this.clienteRecuperacao.cep = resposta.cep;
            this.clienteRecuperacao.cidade = resposta.cidade;
            this.clienteRecuperacao.complemento = resposta.complemento;
            this.clienteRecuperacao.cpf = resposta.cpf;
            this.clienteRecuperacao.email = resposta.email;
            this.clienteRecuperacao.logradouro = resposta.logradouro;
            this.clienteRecuperacao.nome = resposta.nome;
            this.clienteRecuperacao.senha = resposta.senha;
            this.clienteRecuperacao.uf = resposta.uf;

            //Chama o novo modal para atualizar a senha
            (document.getElementById('divNovaSenha') as HTMLElement).style.display='block';
          }
        }
      );
      
    } catch (error) {
      this.msg = "Ops, parece que algo deu errado"
      this.notificacaoService.notificar(this.msg);
    }

    (document.getElementById('divEsqueciSenha') as HTMLElement).style.display = 'none';
  }

  atualizarSenha(): void{
    if (this.senha.length > 0) {
      if (this.senha == this.confirmarSenha) {
        this.clienteRecuperacao.senha = this.senha;
      } else {
        this.notificacaoService.notificar("A senha e a confirmação não batem");
        return;
      }
    }
    try {
        this.clienteService.atualizar(this.clienteRecuperacao);
        this.cliente = this.clienteRecuperacao;
        /*
        localStorage.setItem("cliente", JSON.stringify(this.clienteRecuperacao));
        this.notificacaoService.notificar("Senha recuperada com sucesso! Bem-vindo, " + this.clienteRecuperacao.nome);
        window.location.href = "./produtos";
        */
        setTimeout(() => {
          console.log('Aguarda um pouco');
        }, 2000);
       this.logar(this.clienteRecuperacao);
    } catch (error) {
      this.notificacaoService.notificar("Ops, parece que algo deu errado");
    }
  }

  verificarSenhas(): void{
    this.senhasDiferentes = this.senha !== this.confirmarSenha;
  }

  logar(login: Cliente): void{
    try {
      this.clienteService.logar(login).subscribe(
        (resposta: Cliente) => {
          if (resposta.nome == null) {
            //Se a resposta for nula, significa que o usuário cujo email e senha informados não foi localizado
            this.msg = "Email ou senha incorretos";
            this.notificacaoService.notificar(this.msg);
          } else {
            //Se encontrar o usuário, salvará no local storage
            localStorage.setItem("cliente", JSON.stringify(resposta));
            this.notificacaoService.notificar("Login efetuado com sucesso. Bem-vindo, " + resposta.nome);
            window.location.href = "./produtos";
          }
        }
      );
      
    } catch (error) {
      this.msg = "Ops, parece que algo deu errado"
      this.notificacaoService.notificar(this.msg);
    }
  }
}
