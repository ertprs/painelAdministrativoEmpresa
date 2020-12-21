import { PagamentoOnlineComponent } from './pagamento-online/pagamento-online.component';
import { CadastroEmpresaLojistaComponent } from './cadastro-empresa-lojista/cadastro-empresa-lojista.component';
import { CategoriasDestaqueComponent } from './categorias-destaque/categorias-destaque.component';
import { CategoriasEmpresasComponent } from './categorias-empresas/categorias-empresas.component';
import { FaturasComponent } from './faturas/faturas.component';
import { VerEmpresaComponent } from './main-nav-master/ver-empresa/ver-empresa.component';
import { ListaEmpresasComponent } from './main-nav/lista-empresas/lista-empresas.component';
import { PainelMasterComponent } from './main-nav-master/painel-master/painel-master.component';
import { AbatimentosEstoqueComponent } from './abatimentos-estoque/abatimentos-estoque.component';
import { EstoqueLogisticaComponent } from './estoque/estoque-logistica/estoque-logistica.component';
import { DataRetroativaComponent } from './delivery/paineldelivery/data-retroativa/data-retroativa.component';
import { HistoricoCaixaComponent } from './painel2-relatorio/historico-caixa/historico-caixa.component';
import { ConsolidacaoDinheiroComponent } from './finaceiro/consolidacao-dinheiro/consolidacao-dinheiro.component';
import { PaginaDefaultComponent } from './componentes/pagina-default/pagina-default.component';
import { ConsolidacaoCartaoComponent } from './finaceiro/consolidacao-cartao/consolidacao-cartao.component';
import { BancosComponent } from './bancos/bancos.component';
import { ConciliacaoBancariaComponent } from './finaceiro/conciliacao-bancaria/conciliacao-bancaria.component';
import { ControleFiadoComponent } from './finaceiro/controle-fiado/controle-fiado.component';
import { Painel2RelatorioComponent } from './painel2-relatorio/painel2-relatorio.component';
import { ConsolidacaoFinanceiraComponent } from './finaceiro/consolidacao-financeira/consolidacao-financeira.component';
import { ComprasClientesComponent } from './finaceiro/compras-clientes/compras-clientes.component';
import { ComissaoEntregasComponent } from './finaceiro/comissao-entregas/comissao-entregas.component';
import { CaixaFinanceiroComponent } from './finaceiro/caixa-financeiro/caixa-financeiro.component';
import { ItensEstoqueDetalhesComponent } from './estoque/itens-estoque-detalhes/itens-estoque-detalhes.component';
import { ListaMotoboysComponent } from './estoque/lista-motoboys/lista-motoboys.component';
import { FinaceiroComponent } from './finaceiro/finaceiro.component';
import { EstoqueMotoboyComponent } from './estoque/estoque-motoboy/estoque-motoboy.component';
import { ItensEstoqueComponent } from './estoque/itens-estoque/itens-estoque.component';
import { HistoricoComponent } from './estoque/historico/historico.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { RelatorioClientesComponent } from './painel-relatorio/relatorio-clientes/relatorio-clientes.component';
// tslint:disable-next-line: max-line-length
import { RelatorioPedidosCanceladosComponent } from './painel-relatorio/relatorio-faturamento/relatorio-pedidos-cancelados/relatorio-pedidos-cancelados.component';
import { RelatorioFaturamentoComponent } from './painel-relatorio/relatorio-faturamento/relatorio-faturamento.component';
import { RelatorioFretesComponent } from './painel-relatorio/relatorio-fretes/relatorio-fretes.component';
import { RelatorioEntregasComponent } from './painel-relatorio/relatorio-entregas/relatorio-entregas.component';
import { RelatorioFpComponent } from './painel-relatorio/relatorio-fp/relatorio-fp.component';
import { RelatorioItensComponent } from './painel-relatorio/relatorio-itens/relatorio-itens.component';
import { PainelRelatorioComponent } from './painel-relatorio/painel-relatorio.component';
import { CidadesSistemaComponent } from './cidades-sistema/cidades-sistema.component';
import { UsuariosFinaisComponent } from './usuarios-finais/usuarios-finais.component';
import { NotificacoesSistemaComponent } from './notificacoes-sistema/notificacoes-sistema.component';
import { CuponsComponent } from './cupons/cupons.component';
import { ItensPagamentoComponent } from './itens-pagamento/itens-pagamento.component';
import { FormasPagamentoComponent } from './formas-pagamento/formas-pagamento.component';
import { BairrosSistemaComponent } from './bairros-sistema/bairros-sistema.component';
import { GaleriaComponent } from './galeria/galeria.component';
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
import { GuardaConfigSistemaService } from './guards/guarda-config-sistema.service';
import { UsuarioPermissoesComponent } from './usuarios/usuario-permissoes/usuario-permissoes.component';
import { OrganizacaoEntregadorComponent } from './organizacao-entregador/organizacao-entregador.component';
import { MainNavMasterComponent } from './main-nav-master/main-nav-master.component';

const routes: Routes = [


  { path: 'login', component: LoginComponent },
  { path: 'recuperar', component: RecuperarContaComponent },

  /* SITE - Local de acesso nas paginas do SITE */
  { path: 'inicio', component: CadastroEmpresaLojistaComponent, children: [
    { path: 'cadastro', component: CadastroEmpresaLojistaComponent, /*canActivate: [GuardaAtenticacaoService]*/ },
  ] },
  /* FIM LINHA SITE -- Local de acesso nas paginas do SITE */

  /* DASH LOJISTA */
  {
    path: '', component: DashboardComponent, canActivate: [GuardaAtenticacaoService], children: [

      { path: 'mapa', component: InicioComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'fechar-caixa', component: CaixaFinanceiroComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'faturas', component: FaturasComponent, canActivate: [GuardaAtenticacaoService] },

      { path: 'financeiro', component: FinaceiroComponent, canActivate: [GuardaAtenticacaoService], children: [
          { path: 'consolidacao-financeira', component: ConsolidacaoFinanceiraComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'consolidacao-cartao', component: ConsolidacaoCartaoComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'consolidacao-dinheiro', component: ConsolidacaoDinheiroComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'comissao-entregas', component: ComissaoEntregasComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'controle-fiado', component: ControleFiadoComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'conciliacao-bancaria', component: ConciliacaoBancariaComponent, canActivate: [GuardaAtenticacaoService] },
      ] },

      { path: 'relatorio', component: Painel2RelatorioComponent, canActivate: [GuardaAtenticacaoService], children: [
        { path: 'posicao-estoque', component: ItensEstoqueDetalhesComponent, canActivate: [GuardaAtenticacaoService] },
        { path: 'historico-vendas', component: ComprasClientesComponent, canActivate: [GuardaAtenticacaoService] },
        { path: 'historico-caixa', component: HistoricoCaixaComponent, canActivate: [GuardaAtenticacaoService] },
    ] },

      { path: 'estoque', component: EstoqueComponent, canActivate: [GuardaConfigSistemaService], children: [
            { path: '', component: PaginaDefaultComponent, canActivate: [GuardaConfigSistemaService] },
            { path: 'historico', component: HistoricoComponent, canActivate: [GuardaConfigSistemaService] },
            { path: 'itens-estoque', component: ItensEstoqueComponent, canActivate: [GuardaConfigSistemaService] },
            { path: 'estoque-motoboy', component: EstoqueMotoboyComponent, canActivate: [GuardaConfigSistemaService] },
            { path: 'lista-motoboys', component: ListaMotoboysComponent, canActivate: [GuardaConfigSistemaService] },
            { path: 'logistica', component: EstoqueLogisticaComponent, canActivate: [GuardaConfigSistemaService] },
            { path: 'batimentos-estoque', component: AbatimentosEstoqueComponent, canActivate: [GuardaConfigSistemaService] },
      ] },


      { path: 'meusclientes', component: ClientesComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'editar-cliente', component: EditarClienteComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'entregas', component: EntregasComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'editar-entrega', component: EditarEntregaComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'notificacoes', component: NotificacoesComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'cadastro-entrega', component: DialogCadastroEntregaComponent, canActivate: [GuardaAtenticacaoService] },

      {
        path: 'painel', component: PaineldeliveryComponent, canActivate: [GuardaConfigSistemaService], children: [
          { path: 'cardapio', component: HomeComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'categoriasadicionais', component: CategoriasAdicionaisComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'itensadicionais', component: ItensAdicionaisComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'avaliacoes', component: AvaliacoesComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'delivery', component: InicioDeliveryComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'usuarios', component: UsuariosComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'usuarios-permissoes', component: UsuarioPermissoesComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'bancos', component: BancosComponent, canActivate: [GuardaConfigSistemaService] },

          { path: 'galeria', component: GaleriaComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'bairros-sistema', component: BairrosSistemaComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'cidades-sistema', component: CidadesSistemaComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'formas-pagamento', component: FormasPagamentoComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'itens-pagamento', component: ItensPagamentoComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'cupons', component: CuponsComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'perfil', component: PerfilComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'config', component: ConfigComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'configitem', component: EditarItemCompletoComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'motoboys', component: MototboysComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'notificacoes-usuarios', component: NotificacoesSistemaComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'usuarios-app', component: UsuariosFinaisComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'data-retroativa', component: DataRetroativaComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'organizacao-entregador', component: OrganizacaoEntregadorComponent, canActivate: [GuardaConfigSistemaService]},

          {
            path: 'painel-relatorio', component: PainelRelatorioComponent, canActivate: [GuardaAtenticacaoService], children: [
              { path: 'vendas', component: RelatoriosComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'itens', component: RelatorioItensComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'formas-pagamento', component: RelatorioFpComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'entregas', component: RelatorioEntregasComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'total-fretes', component: RelatorioFretesComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'faturamento', component: RelatorioFaturamentoComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'pedidos-cancelados', component: RelatorioPedidosCanceladosComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'clientes', component: RelatorioClientesComponent, canActivate: [GuardaAtenticacaoService] },
            ]
          },

        ]
      },
      {
        path: 'painelpedidos', component: PainelPedidosComponent, canActivate: [GuardaAtenticacaoService], children: [
          { path: 'pedidos', component: PedidosComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'todospedidos', component: TodosPedidosComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'cadastro-pedido', component: CadastroPedidoComponent, canActivate: [GuardaAtenticacaoService] },
        ]
      },

      


    ]
  },


  /* DASH MASTER */
  {
    path: 'admin', component: MainNavMasterComponent, canActivate: [GuardaAtenticacaoService], children: [

      { path: 'mapa', component: InicioComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'fechar-caixa', component: CaixaFinanceiroComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'lojas', component: ListaEmpresasComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'ver-empresa', component: VerEmpresaComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'cadastro-loja', component: CadastroEmpresaComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'categorias-empresa', component: CategoriasEmpresasComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'destaques', component: CategoriasDestaqueComponent, canActivate: [GuardaAtenticacaoService] },

      
      { path: 'financeiro', component: FinaceiroComponent, canActivate: [GuardaAtenticacaoService], children: [
          { path: 'consolidacao-financeira', component: ConsolidacaoFinanceiraComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'consolidacao-cartao', component: ConsolidacaoCartaoComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'consolidacao-dinheiro', component: ConsolidacaoDinheiroComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'comissao-entregas', component: ComissaoEntregasComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'controle-fiado', component: ControleFiadoComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'conciliacao-bancaria', component: ConciliacaoBancariaComponent, canActivate: [GuardaAtenticacaoService] },
      ] },

      { path: 'relatorio', component: Painel2RelatorioComponent, canActivate: [GuardaAtenticacaoService], children: [
        { path: 'posicao-estoque', component: ItensEstoqueDetalhesComponent, canActivate: [GuardaAtenticacaoService] },
        { path: 'historico-vendas', component: ComprasClientesComponent, canActivate: [GuardaAtenticacaoService] },
        { path: 'historico-caixa', component: HistoricoCaixaComponent, canActivate: [GuardaAtenticacaoService] },
    ] },

      { path: 'estoque', component: EstoqueComponent, canActivate: [GuardaConfigSistemaService], children: [
            { path: '', component: PaginaDefaultComponent, canActivate: [GuardaConfigSistemaService] },
            { path: 'historico', component: HistoricoComponent, canActivate: [GuardaConfigSistemaService] },
            { path: 'itens-estoque', component: ItensEstoqueComponent, canActivate: [GuardaConfigSistemaService] },
            { path: 'estoque-motoboy', component: EstoqueMotoboyComponent, canActivate: [GuardaConfigSistemaService] },
            { path: 'lista-motoboys', component: ListaMotoboysComponent, canActivate: [GuardaConfigSistemaService] },
            { path: 'logistica', component: EstoqueLogisticaComponent, canActivate: [GuardaConfigSistemaService] },
            { path: 'batimentos-estoque', component: AbatimentosEstoqueComponent, canActivate: [GuardaConfigSistemaService] },
      ] },


      { path: 'meusclientes', component: ClientesComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'editar-cliente', component: EditarClienteComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'entregas', component: EntregasComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'editar-entrega', component: EditarEntregaComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'notificacoes', component: NotificacoesComponent, canActivate: [GuardaAtenticacaoService] },
      { path: 'cadastro-entrega', component: DialogCadastroEntregaComponent, canActivate: [GuardaAtenticacaoService] },

      {
        path: 'painel', component: PainelMasterComponent, canActivate: [GuardaConfigSistemaService], children: [
          { path: 'cardapio', component: HomeComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'categoriasadicionais', component: CategoriasAdicionaisComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'itensadicionais', component: ItensAdicionaisComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'avaliacoes', component: AvaliacoesComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'delivery', component: InicioDeliveryComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'usuarios', component: UsuariosComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'usuarios-permissoes', component: UsuarioPermissoesComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'bancos', component: BancosComponent, canActivate: [GuardaConfigSistemaService] },

          { path: 'galeria', component: GaleriaComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'bairros-sistema', component: BairrosSistemaComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'cidades-sistema', component: CidadesSistemaComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'formas-pagamento', component: FormasPagamentoComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'itens-pagamento', component: ItensPagamentoComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'cupons', component: CuponsComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'perfil', component: PerfilComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'config', component: ConfigComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'configitem', component: EditarItemCompletoComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'motoboys', component: MototboysComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'notificacoes-usuarios', component: NotificacoesSistemaComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'usuarios-app', component: UsuariosFinaisComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'data-retroativa', component: DataRetroativaComponent, canActivate: [GuardaConfigSistemaService] },
          { path: 'organizacao-entregador', component: OrganizacaoEntregadorComponent, canActivate: [GuardaConfigSistemaService]},
          
          { path: 'pagamento-online', component: PagamentoOnlineComponent },


          {
            path: 'painel-relatorio', component: PainelRelatorioComponent, canActivate: [GuardaAtenticacaoService], children: [
              { path: 'vendas', component: RelatoriosComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'itens', component: RelatorioItensComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'formas-pagamento', component: RelatorioFpComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'entregas', component: RelatorioEntregasComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'total-fretes', component: RelatorioFretesComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'faturamento', component: RelatorioFaturamentoComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'pedidos-cancelados', component: RelatorioPedidosCanceladosComponent, canActivate: [GuardaAtenticacaoService] },
              { path: 'clientes', component: RelatorioClientesComponent, canActivate: [GuardaAtenticacaoService] },
            ]
          },

        ]
      },
      {
        path: 'painelpedidos', component: PainelPedidosComponent, canActivate: [GuardaAtenticacaoService], children: [
          { path: 'pedidos', component: PedidosComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'todospedidos', component: TodosPedidosComponent, canActivate: [GuardaAtenticacaoService] },
          { path: 'cadastro-pedido', component: CadastroPedidoComponent, canActivate: [GuardaAtenticacaoService] },
        ]
      },

      


    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
