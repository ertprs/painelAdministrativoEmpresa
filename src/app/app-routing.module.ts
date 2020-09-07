import { CadastroPedidoComponent } from './delivery/pedidos/cadastro-pedido/cadastro-pedido.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { RecuperarContaComponent } from './recuperar-conta/recuperar-conta.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PainelPedidosComponent } from './delivery/pedidos/painel-pedidos/painel-pedidos.component';
import { TodosPedidosComponent } from './delivery/pedidos/todos-pedidos/todos-pedidos.component';
import { EditarItemCompletoComponent } from './home/editar-item-completo/editar-item-completo.component';
import { ItensAdicionaisComponent } from './delivery/itens-adicionais/itens-adicionais.component';
import { CategoriasAdicionaisComponent } from './delivery/categorias-adicionais/categorias-adicionais.component';
import { AvaliacoesComponent } from './delivery/avaliacoes/avaliacoes.component';
import { PedidosComponent } from './delivery/pedidos/pedidos.component';
import { PaineldeliveryComponent } from './delivery/paineldelivery/paineldelivery.component';
import { InicioDeliveryComponent } from './delivery/inicio-delivery/inicio-delivery.component';
import { HomeComponent } from './home/home.component';
import { DialogCadastroEntregaComponent } from './dialog-cadastro-entrega/dialog-cadastro-entrega.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { InicioComponent } from './inicio/inicio.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { EntregasComponent } from './entregas/entregas.component';
import { MototboysComponent } from './mototboys/mototboys.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';
import { EditarEntregaComponent } from './editar-entrega/editar-entrega.component';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { GuardaAtenticacaoService } from './guards/guarda-atenticacao.service';
import { ConfigComponent } from './config/config.component';

const routes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarContaComponent },
  { path: 'cadastro', component: CadastroEmpresaComponent, /*canActivate: [GuardaAtenticacaoService]*/ },

  {
    path: '', component: DashboardComponent, canActivate: [GuardaAtenticacaoService], children: [

      { path: 'inicio', component: InicioComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'relatorio', component: RelatoriosComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'meusclientes', component: ClientesComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'editar-cliente', component: EditarClienteComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'entregas', component: EntregasComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'editar-entrega', component: EditarEntregaComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'motoboys', component: MototboysComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'notificacoes', component: NotificacoesComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'perfil', component: PerfilComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'config', component: ConfigComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'cadastro-entrega', component: DialogCadastroEntregaComponent, canActivate: [GuardaAtenticacaoService] },
      // { path: 'cardapio', component: HomeComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'painel', component: PaineldeliveryComponent, canActivate: [GuardaAtenticacaoService], children: [
          { path: 'cardapio', component: HomeComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'categoriasadicionais', component: CategoriasAdicionaisComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'itensadicionais', component: ItensAdicionaisComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'avaliacoes', component: AvaliacoesComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'delivery', component: InicioDeliveryComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'usuarios', component: UsuariosComponent, canActivate: [GuardaAtenticacaoService] },

      ] },
      {
        path: 'painelpedidos', component: PainelPedidosComponent, canActivate: [GuardaAtenticacaoService], children: [
          { path: 'pedidos', component: PedidosComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'todospedidos', component: TodosPedidosComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'cadastro-pedido', component: CadastroPedidoComponent, canActivate: [GuardaAtenticacaoService] },
        ]
      },
      // { path: 'categoriasadicionais', component: CategoriasAdicionaisComponent, canActivate: [GuardaAtenticacaoService] },
      // { path: 'itensadicionais', component: ItensAdicionaisComponent, canActivate: [GuardaAtenticacaoService] },
       { path: 'configitem', component: EditarItemCompletoComponent, canActivate: [GuardaAtenticacaoService] },


    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
