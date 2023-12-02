import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NaoEncontradaComponent } from './nao-encontrada/nao-encontrada.component';
import { LoginComponent } from './login/login.component';
import { ClienteComponent } from './cliente/cliente.component';
import { PedidosComponent } from './pedidos/pedidos.component';

const routes: Routes = [
  {path: '', redirectTo: 'produtos', pathMatch: 'full'},
  {path: 'produtos', loadChildren: () => import('./produtos/produtos.module').then(m => m.ProdutosModule)},
  {path: 'carrinho', loadChildren: () => import('./carrinho/carrinho.module').then(m => m.CarrinhoModule)},
  {path: 'login', component: LoginComponent},
  {path: 'minha-conta', component: ClienteComponent},
  {path: 'minha-conta/:id', component: ClienteComponent},
  {path: 'pedidos', component: PedidosComponent},
  {path: '**', component: NaoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
