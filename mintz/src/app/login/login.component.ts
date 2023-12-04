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
  clienteNovo: Cliente = new Cliente();
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
    if (this.clienteNovo.senha.length > 0) {
      if (!this.senhasDiferentes) {
        try {
          this.clienteService.inserir(this.clienteNovo);
          this.msg = "Cadastro efetuado com sucesso"
          window.alert(this.msg);
          this.logar(this.clienteNovo);
        } catch (error) {
          this.msg = "Ops, parece que algo deu errado";
          this.notificacaoService.notificar(this.msg);
        }
        (document.getElementById('divCadastro') as HTMLElement).style.display = 'none';

      } else {
        this.notificacaoService.notificar("A senha e a confirmação não batem");
        return;
      }
    } else {
      this.notificacaoService.notificar("A senha não pode ser vazia");
      return;
    }
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
      if (!this.senhasDiferentes) {
        this.clienteRecuperacao.senha = this.senha;
      } else {
        this.notificacaoService.notificar("A senha e a confirmação não batem");
        return;
      }
    } else {
      this.notificacaoService.notificar("A senha não pode ser vazia");
      return;
    }
    try {
        this.clienteService.atualizar(this.clienteRecuperacao);
        this.cliente = this.clienteRecuperacao;
        /*
        localStorage.setItem("cliente", JSON.stringify(this.clienteRecuperacao));
        this.notificacaoService.notificar("Senha recuperada com sucesso! Bem-vindo, " + this.clienteRecuperacao.nome);
        window.location.href = "./produtos";
        */
        
        const aguardar = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
        aguardar(1000).then(() => {
          this.logar(this.clienteRecuperacao);
        });

        alert("Senha recuperada com sucesso");
    } catch (error) {
      this.notificacaoService.notificar("Ops, parece que algo deu errado");
    }
  }

  verificarSenhas(senha: string, confirmarSenha: string): void{
    this.senhasDiferentes = senha !== confirmarSenha;
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
