"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var estoque_logistica_component_1 = require("./estoque/estoque-logistica/estoque-logistica.component");
var data_retroativa_component_1 = require("./delivery/paineldelivery/data-retroativa/data-retroativa.component");
var historico_caixa_component_1 = require("./painel2-relatorio/historico-caixa/historico-caixa.component");
var consolidacao_dinheiro_component_1 = require("./finaceiro/consolidacao-dinheiro/consolidacao-dinheiro.component");
var pagina_default_component_1 = require("./componentes/pagina-default/pagina-default.component");
var consolidacao_cartao_component_1 = require("./finaceiro/consolidacao-cartao/consolidacao-cartao.component");
var bancos_component_1 = require("./bancos/bancos.component");
var conciliacao_bancaria_component_1 = require("./finaceiro/conciliacao-bancaria/conciliacao-bancaria.component");
var controle_fiado_component_1 = require("./finaceiro/controle-fiado/controle-fiado.component");
var painel2_relatorio_component_1 = require("./painel2-relatorio/painel2-relatorio.component");
var consolidacao_financeira_component_1 = require("./finaceiro/consolidacao-financeira/consolidacao-financeira.component");
var compras_clientes_component_1 = require("./finaceiro/compras-clientes/compras-clientes.component");
var comissao_entregas_component_1 = require("./finaceiro/comissao-entregas/comissao-entregas.component");
var caixa_financeiro_component_1 = require("./finaceiro/caixa-financeiro/caixa-financeiro.component");
var itens_estoque_detalhes_component_1 = require("./estoque/itens-estoque-detalhes/itens-estoque-detalhes.component");
var lista_motoboys_component_1 = require("./estoque/lista-motoboys/lista-motoboys.component");
var finaceiro_component_1 = require("./finaceiro/finaceiro.component");
var estoque_motoboy_component_1 = require("./estoque/estoque-motoboy/estoque-motoboy.component");
var itens_estoque_component_1 = require("./estoque/itens-estoque/itens-estoque.component");
var historico_component_1 = require("./estoque/historico/historico.component");
var estoque_component_1 = require("./estoque/estoque.component");
var relatorio_clientes_component_1 = require("./painel-relatorio/relatorio-clientes/relatorio-clientes.component");
// tslint:disable-next-line: max-line-length
var relatorio_pedidos_cancelados_component_1 = require("./painel-relatorio/relatorio-faturamento/relatorio-pedidos-cancelados/relatorio-pedidos-cancelados.component");
var relatorio_faturamento_component_1 = require("./painel-relatorio/relatorio-faturamento/relatorio-faturamento.component");
var relatorio_fretes_component_1 = require("./painel-relatorio/relatorio-fretes/relatorio-fretes.component");
var relatorio_entregas_component_1 = require("./painel-relatorio/relatorio-entregas/relatorio-entregas.component");
var relatorio_fp_component_1 = require("./painel-relatorio/relatorio-fp/relatorio-fp.component");
var relatorio_itens_component_1 = require("./painel-relatorio/relatorio-itens/relatorio-itens.component");
var painel_relatorio_component_1 = require("./painel-relatorio/painel-relatorio.component");
var cidades_sistema_component_1 = require("./cidades-sistema/cidades-sistema.component");
var usuarios_finais_component_1 = require("./usuarios-finais/usuarios-finais.component");
var notificacoes_sistema_component_1 = require("./notificacoes-sistema/notificacoes-sistema.component");
var cupons_component_1 = require("./cupons/cupons.component");
var itens_pagamento_component_1 = require("./itens-pagamento/itens-pagamento.component");
var formas_pagamento_component_1 = require("./formas-pagamento/formas-pagamento.component");
var bairros_sistema_component_1 = require("./bairros-sistema/bairros-sistema.component");
var galeria_component_1 = require("./galeria/galeria.component");
var cadastro_pedido_component_1 = require("./delivery/pedidos/cadastro-pedido/cadastro-pedido.component");
var usuarios_component_1 = require("./usuarios/usuarios.component");
var relatorios_component_1 = require("./relatorios/relatorios.component");
var recuperar_conta_component_1 = require("./recuperar-conta/recuperar-conta.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var painel_pedidos_component_1 = require("./delivery/pedidos/painel-pedidos/painel-pedidos.component");
var todos_pedidos_component_1 = require("./delivery/pedidos/todos-pedidos/todos-pedidos.component");
var editar_item_completo_component_1 = require("./home/editar-item-completo/editar-item-completo.component");
var itens_adicionais_component_1 = require("./delivery/itens-adicionais/itens-adicionais.component");
var categorias_adicionais_component_1 = require("./delivery/categorias-adicionais/categorias-adicionais.component");
var avaliacoes_component_1 = require("./delivery/avaliacoes/avaliacoes.component");
var pedidos_component_1 = require("./delivery/pedidos/pedidos.component");
var paineldelivery_component_1 = require("./delivery/paineldelivery/paineldelivery.component");
var inicio_delivery_component_1 = require("./delivery/inicio-delivery/inicio-delivery.component");
var home_component_1 = require("./home/home.component");
var dialog_cadastro_entrega_component_1 = require("./dialog-cadastro-entrega/dialog-cadastro-entrega.component");
var editar_cliente_component_1 = require("./editar-cliente/editar-cliente.component");
var inicio_component_1 = require("./inicio/inicio.component");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var clientes_component_1 = require("./clientes/clientes.component");
var entregas_component_1 = require("./entregas/entregas.component");
var mototboys_component_1 = require("./mototboys/mototboys.component");
var notificacoes_component_1 = require("./notificacoes/notificacoes.component");
var perfil_component_1 = require("./perfil/perfil.component");
var login_component_1 = require("./login/login.component");
var editar_entrega_component_1 = require("./editar-entrega/editar-entrega.component");
var cadastro_empresa_component_1 = require("./cadastro-empresa/cadastro-empresa.component");
var guarda_atenticacao_service_1 = require("./guards/guarda-atenticacao.service");
var config_component_1 = require("./config/config.component");
var guarda_config_sistema_service_1 = require("./guards/guarda-config-sistema.service");
var usuario_permissoes_component_1 = require("./usuarios/usuario-permissoes/usuario-permissoes.component");
var organizacao_entregador_component_1 = require("./organizacao-entregador/organizacao-entregador.component");
var routes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'recuperar', component: recuperar_conta_component_1.RecuperarContaComponent },
    { path: 'cadastro', component: cadastro_empresa_component_1.CadastroEmpresaComponent },
    {
        path: '', component: dashboard_component_1.DashboardComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService], children: [
            { path: 'inicio', component: inicio_component_1.InicioComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
            { path: 'fechar-caixa', component: caixa_financeiro_component_1.CaixaFinanceiroComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
            { path: 'financeiro', component: finaceiro_component_1.FinaceiroComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService], children: [
                    { path: 'consolidacao-financeira', component: consolidacao_financeira_component_1.ConsolidacaoFinanceiraComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                    { path: 'consolidacao-cartao', component: consolidacao_cartao_component_1.ConsolidacaoCartaoComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                    { path: 'consolidacao-dinheiro', component: consolidacao_dinheiro_component_1.ConsolidacaoDinheiroComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                    { path: 'comissao-entregas', component: comissao_entregas_component_1.ComissaoEntregasComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                    { path: 'controle-fiado', component: controle_fiado_component_1.ControleFiadoComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                    { path: 'conciliacao-bancaria', component: conciliacao_bancaria_component_1.ConciliacaoBancariaComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                ] },
            { path: 'relatorio', component: painel2_relatorio_component_1.Painel2RelatorioComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService], children: [
                    { path: 'posicao-estoque', component: itens_estoque_detalhes_component_1.ItensEstoqueDetalhesComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                    { path: 'historico-vendas', component: compras_clientes_component_1.ComprasClientesComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                    { path: 'historico-caixa', component: historico_caixa_component_1.HistoricoCaixaComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                ] },
            { path: 'estoque', component: estoque_component_1.EstoqueComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService], children: [
                    { path: '', component: pagina_default_component_1.PaginaDefaultComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'historico', component: historico_component_1.HistoricoComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'itens-estoque', component: itens_estoque_component_1.ItensEstoqueComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'estoque-motoboy', component: estoque_motoboy_component_1.EstoqueMotoboyComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'lista-motoboys', component: lista_motoboys_component_1.ListaMotoboysComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'logistica', component: estoque_logistica_component_1.EstoqueLogisticaComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                ] },
            { path: 'meusclientes', component: clientes_component_1.ClientesComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
            { path: 'editar-cliente', component: editar_cliente_component_1.EditarClienteComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
            { path: 'entregas', component: entregas_component_1.EntregasComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
            { path: 'editar-entrega', component: editar_entrega_component_1.EditarEntregaComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
            { path: 'notificacoes', component: notificacoes_component_1.NotificacoesComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
            { path: 'cadastro-entrega', component: dialog_cadastro_entrega_component_1.DialogCadastroEntregaComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
            {
                path: 'painel', component: paineldelivery_component_1.PaineldeliveryComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService], children: [
                    { path: 'cardapio', component: home_component_1.HomeComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'categoriasadicionais', component: categorias_adicionais_component_1.CategoriasAdicionaisComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'itensadicionais', component: itens_adicionais_component_1.ItensAdicionaisComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'avaliacoes', component: avaliacoes_component_1.AvaliacoesComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'delivery', component: inicio_delivery_component_1.InicioDeliveryComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'usuarios', component: usuarios_component_1.UsuariosComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'usuarios-permissoes', component: usuario_permissoes_component_1.UsuarioPermissoesComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'bancos', component: bancos_component_1.BancosComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'galeria', component: galeria_component_1.GaleriaComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'bairros-sistema', component: bairros_sistema_component_1.BairrosSistemaComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'cidades-sistema', component: cidades_sistema_component_1.CidadesSistemaComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'formas-pagamento', component: formas_pagamento_component_1.FormasPagamentoComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'itens-pagamento', component: itens_pagamento_component_1.ItensPagamentoComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'cupons', component: cupons_component_1.CuponsComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'perfil', component: perfil_component_1.PerfilComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'config', component: config_component_1.ConfigComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'configitem', component: editar_item_completo_component_1.EditarItemCompletoComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'motoboys', component: mototboys_component_1.MototboysComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'notificacoes-usuarios', component: notificacoes_sistema_component_1.NotificacoesSistemaComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'usuarios-app', component: usuarios_finais_component_1.UsuariosFinaisComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'data-retroativa', component: data_retroativa_component_1.DataRetroativaComponent, canActivate: [guarda_config_sistema_service_1.GuardaConfigSistemaService] },
                    { path: 'organizacao-entregador', component: organizacao_entregador_component_1.OrganizacaoEntregadorComponent },
                    {
                        path: 'painel-relatorio', component: painel_relatorio_component_1.PainelRelatorioComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService], children: [
                            { path: 'vendas', component: relatorios_component_1.RelatoriosComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                            { path: 'itens', component: relatorio_itens_component_1.RelatorioItensComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                            { path: 'formas-pagamento', component: relatorio_fp_component_1.RelatorioFpComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                            { path: 'entregas', component: relatorio_entregas_component_1.RelatorioEntregasComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                            { path: 'total-fretes', component: relatorio_fretes_component_1.RelatorioFretesComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                            { path: 'faturamento', component: relatorio_faturamento_component_1.RelatorioFaturamentoComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                            { path: 'pedidos-cancelados', component: relatorio_pedidos_cancelados_component_1.RelatorioPedidosCanceladosComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                            { path: 'clientes', component: relatorio_clientes_component_1.RelatorioClientesComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                        ]
                    },
                ]
            },
            {
                path: 'painelpedidos', component: painel_pedidos_component_1.PainelPedidosComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService], children: [
                    { path: 'pedidos', component: pedidos_component_1.PedidosComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                    { path: 'todospedidos', component: todos_pedidos_component_1.TodosPedidosComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                    { path: 'cadastro-pedido', component: cadastro_pedido_component_1.CadastroPedidoComponent, canActivate: [guarda_atenticacao_service_1.GuardaAtenticacaoService] },
                ]
            },
        ]
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
