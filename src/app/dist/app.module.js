"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var ng_lazyload_image_1 = require("ng-lazyload-image");
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var animations_1 = require("@angular/platform-browser/animations");
var slider_1 = require("@angular/material/slider");
var button_1 = require("@angular/material/button");
var grid_list_1 = require("@angular/material/grid-list");
var card_1 = require("@angular/material/card");
var input_1 = require("@angular/material/input");
var inicio_component_1 = require("./inicio/inicio.component");
var toolbar_1 = require("@angular/material/toolbar");
var main_nav_component_1 = require("./main-nav/main-nav.component");
var layout_1 = require("@angular/cdk/layout");
var sidenav_1 = require("@angular/material/sidenav");
var icon_1 = require("@angular/material/icon");
var list_1 = require("@angular/material/list");
var clientes_component_1 = require("./clientes/clientes.component");
var tree_1 = require("@angular/material/tree");
var entregas_component_1 = require("./entregas/entregas.component");
var bottom_sheet_1 = require("@angular/material/bottom-sheet");
var dialog_1 = require("@angular/material/dialog");
var dialo_delsucg_component_1 = require("./dialo-delsucg/dialo-delsucg.component");
var progress_bar_1 = require("@angular/material/progress-bar");
var datepicker_1 = require("@angular/material/datepicker");
var mototboys_component_1 = require("./mototboys/mototboys.component");
var notificacoes_component_1 = require("./notificacoes/notificacoes.component");
var perfil_component_1 = require("./perfil/perfil.component");
var login_component_1 = require("./login/login.component");
var dialog_cadastro_cliente_component_1 = require("./dialog-cadastro-cliente/dialog-cadastro-cliente.component");
var dialog_cadastro_entrega_component_1 = require("./dialog-cadastro-entrega/dialog-cadastro-entrega.component");
var dialog_add_mototboy_component_1 = require("./dialog-add-mototboy/dialog-add-mototboy.component");
var snack_bar_1 = require("@angular/material/snack-bar");
var chips_1 = require("@angular/material/chips");
var dialog_editar_cliente_component_1 = require("./dialog-editar-cliente/dialog-editar-cliente.component");
var http_1 = require("@angular/common/http");
var forms_1 = require("@angular/forms");
var core_2 = require("@agm/core");
var agm_overlays_1 = require("agm-overlays");
var select_1 = require("@angular/material/select");
var editar_entrega_component_1 = require("./editar-entrega/editar-entrega.component");
var editar_cliente_component_1 = require("./editar-cliente/editar-cliente.component");
var cadastro_empresa_component_1 = require("./cadastro-empresa/cadastro-empresa.component");
var autocomplete_1 = require("@angular/material/autocomplete");
var menu_1 = require("@angular/material/menu");
var auth_service_1 = require("./login/auth.service");
var dialog_entregador_component_1 = require("./dialog-entregador/dialog-entregador.component");
var badge_1 = require("@angular/material/badge");
var dialog_hist_entrega_component_1 = require("./entregas/dialog-hist-entrega/dialog-hist-entrega.component");
var ngx_mask_1 = require("ngx-mask");
var stepper_1 = require("@angular/material/stepper");
var progress_spinner_1 = require("@angular/material/progress-spinner");
var config_component_1 = require("./config/config.component");
var expansion_1 = require("@angular/material/expansion");
var tooltip_1 = require("@angular/material/tooltip");
var core_3 = require("@angular/material/core");
var agm_direction_1 = require("agm-direction");
var checkbox_1 = require("@angular/material/checkbox");
var slide_toggle_1 = require("@angular/material/slide-toggle");
var fresh_pipe_1 = require("./fresh.pipe");
var dialog_pedeai_component_1 = require("./dialog-pedeai/dialog-pedeai.component");
var dialog_ver_entrega_component_1 = require("./dialog-pedeai/dialog-ver-entrega/dialog-ver-entrega.component");
var radio_1 = require("@angular/material/radio");
var dialog_tutorial_component_1 = require("./dialog-tutorial/dialog-tutorial.component");
var home_component_1 = require("./home/home.component");
var dialog_add_cat_component_1 = require("./home/dialog-add-cat/dialog-add-cat.component");
var dialog_add_item_component_1 = require("./home/dialog-add-item/dialog-add-item.component");
var dialog_editar_car_component_1 = require("./home/dialog-editar-car/dialog-editar-car.component");
var dialog_editar_item_component_1 = require("./home/dialog-editar-item/dialog-editar-item.component");
var inicio_delivery_component_1 = require("./delivery/inicio-delivery/inicio-delivery.component");
var paineldelivery_component_1 = require("./delivery/paineldelivery/paineldelivery.component");
var pedidos_component_1 = require("./delivery/pedidos/pedidos.component");
var table_1 = require("@angular/material/table");
var dialog_pedido_component_1 = require("./delivery/dialogs/dialog-pedido/dialog-pedido.component");
var avaliacoes_component_1 = require("./delivery/avaliacoes/avaliacoes.component");
var categorias_adicionais_component_1 = require("./delivery/categorias-adicionais/categorias-adicionais.component");
var itens_adicionais_component_1 = require("./delivery/itens-adicionais/itens-adicionais.component");
var dialog_categoria_adicional_component_1 = require("./delivery/dialogs/dialog-categoria-adicional/dialog-categoria-adicional.component");
var dialog_add_item_adicional_component_1 = require("./delivery/dialogs/dialog-add-item-adicional/dialog-add-item-adicional.component");
var editar_item_completo_component_1 = require("./home/editar-item-completo/editar-item-completo.component");
var todos_pedidos_component_1 = require("./delivery/pedidos/todos-pedidos/todos-pedidos.component");
var painel_pedidos_component_1 = require("./delivery/pedidos/painel-pedidos/painel-pedidos.component");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var respavaliacao_component_1 = require("./delivery/dialogs/respavaliacao/respavaliacao.component");
var cancelar_pedido_component_1 = require("./delivery/pedidos/cancelar-pedido/cancelar-pedido.component");
var aviso_taxa_pedido_component_1 = require("./delivery/pedidos/aviso-taxa-pedido/aviso-taxa-pedido.component");
var recuperar_conta_component_1 = require("./recuperar-conta/recuperar-conta.component");
var relatorios_component_1 = require("./relatorios/relatorios.component");
var usuarios_component_1 = require("./usuarios/usuarios.component");
var formulario_usuario_component_1 = require("./usuarios/formulario-usuario/formulario-usuario.component");
var cadastro_pedido_component_1 = require("./delivery/pedidos/cadastro-pedido/cadastro-pedido.component");
var item_catalogo_component_1 = require("./delivery/pedidos/cadastro-pedido/item-catalogo/item-catalogo.component");
var tabs_1 = require("@angular/material/tabs");
var selecionar_forma_pag_component_1 = require("./delivery/pedidos/cadastro-pedido/selecionar-forma-pag/selecionar-forma-pag.component");
var galeria_component_1 = require("./galeria/galeria.component");
var bairros_sistema_component_1 = require("./bairros-sistema/bairros-sistema.component");
var paginator_1 = require("@angular/material/paginator");
var formas_pagamento_component_1 = require("./formas-pagamento/formas-pagamento.component");
var itens_pagamento_component_1 = require("./itens-pagamento/itens-pagamento.component");
var cupons_component_1 = require("./cupons/cupons.component");
var notificacoes_sistema_component_1 = require("./notificacoes-sistema/notificacoes-sistema.component");
var dialog_dinam_component_1 = require("./dialog-dinam/dialog-dinam.component");
var usuarios_finais_component_1 = require("./usuarios-finais/usuarios-finais.component");
var cidades_sistema_component_1 = require("./cidades-sistema/cidades-sistema.component");
var painel_relatorio_component_1 = require("./painel-relatorio/painel-relatorio.component");
var relatorio_itens_component_1 = require("./painel-relatorio/relatorio-itens/relatorio-itens.component");
var relatorio_fp_component_1 = require("./painel-relatorio/relatorio-fp/relatorio-fp.component");
var relatorio_entregas_component_1 = require("./painel-relatorio/relatorio-entregas/relatorio-entregas.component");
var relatorio_fretes_component_1 = require("./painel-relatorio/relatorio-fretes/relatorio-fretes.component");
var relatorio_faturamento_component_1 = require("./painel-relatorio/relatorio-faturamento/relatorio-faturamento.component");
// tslint:disable-next-line: max-line-length
var relatorio_pedidos_cancelados_component_1 = require("./painel-relatorio/relatorio-faturamento/relatorio-pedidos-cancelados/relatorio-pedidos-cancelados.component");
var relatorio_clientes_component_1 = require("./painel-relatorio/relatorio-clientes/relatorio-clientes.component");
var ng2_charts_1 = require("ng2-charts");
var impressao_pedido_component_1 = require("./delivery/pedidos/impressao-pedido/impressao-pedido.component");
var estoque_component_1 = require("./estoque/estoque.component");
var historico_component_1 = require("./estoque/historico/historico.component");
var estoque_motoboy_component_1 = require("./estoque/estoque-motoboy/estoque-motoboy.component");
var itens_estoque_component_1 = require("./estoque/itens-estoque/itens-estoque.component");
var estoque_enviar_component_1 = require("./estoque/estoque-enviar/estoque-enviar.component");
var estoque_retirar_loja_component_1 = require("./estoque/estoque-retirar-loja/estoque-retirar-loja.component");
var repor_estoque_component_1 = require("./estoque/repor-estoque/repor-estoque.component");
var form_estoque_component_1 = require("./estoque/form-estoque/form-estoque.component");
var finaceiro_component_1 = require("./finaceiro/finaceiro.component");
var lista_motoboys_component_1 = require("./estoque/lista-motoboys/lista-motoboys.component");
var form_cupom_component_1 = require("./cupons/form-cupom/form-cupom.component");
var retornar_de_motoboy_component_1 = require("./estoque/retornar-de-motoboy/retornar-de-motoboy.component");
var form_formapagamento_component_1 = require("./formas-pagamento/form-formapagamento/form-formapagamento.component");
var estoque_entrada_component_1 = require("./estoque/estoque-entrada/estoque-entrada.component");
var itens_estoque_detalhes_component_1 = require("./estoque/itens-estoque-detalhes/itens-estoque-detalhes.component");
var caixa_financeiro_component_1 = require("./finaceiro/caixa-financeiro/caixa-financeiro.component");
var comissao_entregas_component_1 = require("./finaceiro/comissao-entregas/comissao-entregas.component");
var compras_clientes_component_1 = require("./finaceiro/compras-clientes/compras-clientes.component");
var lista_compras_clientes_component_1 = require("./finaceiro/compras-clientes/lista-compras-clientes/lista-compras-clientes.component");
var consolidacao_financeira_component_1 = require("./finaceiro/consolidacao-financeira/consolidacao-financeira.component");
var enderecos_cliente_component_1 = require("./clientes/enderecos-cliente/enderecos-cliente.component");
var form_endereco_cliente_component_1 = require("./clientes/form-endereco-cliente/form-endereco-cliente.component");
var transferir_estoque_motoboy_component_1 = require("./estoque/transferir-estoque-motoboy/transferir-estoque-motoboy.component");
var form_bairro_component_1 = require("./bairros-sistema/form-bairro/form-bairro.component");
var painel2_relatorio_component_1 = require("./painel2-relatorio/painel2-relatorio.component");
var nome_pipe_1 = require("./nome.pipe");
var selecionar_motoboy_component_1 = require("./estoque/itens-estoque-detalhes/selecionar-motoboy/selecionar-motoboy.component");
var adicionar_despesa_component_1 = require("./finaceiro/consolidacao-financeira/adicionar-despesa/adicionar-despesa.component");
var detalhes_item_tabela_component_1 = require("./finaceiro/consolidacao-financeira/detalhes-item-tabela/detalhes-item-tabela.component");
var adicionar_pagamento_component_1 = require("./finaceiro/comissao-entregas/adicionar-pagamento/adicionar-pagamento.component");
var controle_fiado_component_1 = require("./finaceiro/controle-fiado/controle-fiado.component");
var pedidos_fiado_component_1 = require("./finaceiro/controle-fiado/pedidos-fiado/pedidos-fiado.component");
var pagar_divida_component_1 = require("./finaceiro/controle-fiado/pagar-divida/pagar-divida.component");
var conciliacao_bancaria_component_1 = require("./finaceiro/conciliacao-bancaria/conciliacao-bancaria.component");
var adicionar_banco_component_1 = require("./finaceiro/conciliacao-bancaria/adicionar-banco/adicionar-banco.component");
var bancos_component_1 = require("./bancos/bancos.component");
var form_banco_component_1 = require("./bancos/form-banco/form-banco.component");
var barra_total_component_1 = require("./componentes/barra-total/barra-total.component");
var clientes_detalhes_component_1 = require("./clientes/clientes-detalhes/clientes-detalhes.component");
var selecionar_banco_component_1 = require("./bancos/selecionar-banco/selecionar-banco.component");
var consolidacao_cartao_component_1 = require("./finaceiro/consolidacao-cartao/consolidacao-cartao.component");
var selecionar_motoboy_entrega_component_1 = require("./delivery/pedidos/selecionar-motoboy-entrega/selecionar-motoboy-entrega.component");
var form_item_pagamento_component_1 = require("./itens-pagamento/form-item-pagamento/form-item-pagamento.component");
// tslint:disable-next-line: max-line-length
var selecionar_cartao_pagamento_component_1 = require("./delivery/pedidos/cadastro-pedido/selecionar-cartao-pagamento/selecionar-cartao-pagamento.component");
var upload_imagem_component_1 = require("./upload-imagem/upload-imagem.component");
var ver_imagem_component_1 = require("./upload-imagem/ver-imagem/ver-imagem.component");
var pagina_default_component_1 = require("./componentes/pagina-default/pagina-default.component");
var valor_item_pagamento_component_1 = require("./delivery/pedidos/cadastro-pedido/valor-item-pagamento/valor-item-pagamento.component");
var consolidacao_dinheiro_component_1 = require("./finaceiro/consolidacao-dinheiro/consolidacao-dinheiro.component");
var historico_caixa_component_1 = require("./painel2-relatorio/historico-caixa/historico-caixa.component");
var senha_operador_desfazer_component_1 = require("./senha-operador-desfazer/senha-operador-desfazer.component");
var inserir_senha_component_1 = require("./senha-operador-desfazer/inserir-senha/inserir-senha.component");
var data_retroativa_component_1 = require("./delivery/paineldelivery/data-retroativa/data-retroativa.component");
var estoque_logistica_component_1 = require("./estoque/estoque-logistica/estoque-logistica.component");
var tela_um_component_1 = require("./estoque/estoque-logistica/tela-um/tela-um.component");
var tela_dois_component_1 = require("./estoque/estoque-logistica/tela-dois/tela-dois.component");
var tabela_pedidos_component_1 = require("./componentes/tabela-pedidos/tabela-pedidos.component");
var api_calendario_component_1 = require("./api-calendario/api-calendario.component");
var form_organizacao_component_1 = require("./organizacao-entregador/form-organizacao/form-organizacao.component");
var usuario_permissoes_component_1 = require("./usuarios/usuario-permissoes/usuario-permissoes.component");
var organizacao_entregador_component_1 = require("./organizacao-entregador/organizacao-entregador.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                inicio_component_1.InicioComponent,
                main_nav_component_1.MainNavComponent,
                clientes_component_1.ClientesComponent,
                entregas_component_1.EntregasComponent,
                dialo_delsucg_component_1.DialoDelsucgComponent,
                mototboys_component_1.MototboysComponent,
                notificacoes_component_1.NotificacoesComponent,
                perfil_component_1.PerfilComponent,
                login_component_1.LoginComponent,
                dialog_cadastro_cliente_component_1.DialogCadastroClienteComponent,
                dialog_cadastro_entrega_component_1.DialogCadastroEntregaComponent,
                dialog_add_mototboy_component_1.DialogAddMototboyComponent,
                dialog_editar_cliente_component_1.DialogEditarClienteComponent,
                editar_entrega_component_1.EditarEntregaComponent,
                editar_cliente_component_1.EditarClienteComponent,
                cadastro_empresa_component_1.CadastroEmpresaComponent,
                dialog_entregador_component_1.DialogEntregadorComponent,
                dialog_hist_entrega_component_1.DialogHistEntregaComponent,
                config_component_1.ConfigComponent,
                fresh_pipe_1.FreshPipe,
                dialog_pedeai_component_1.DialogPedeaiComponent,
                dialog_ver_entrega_component_1.DialogVerEntregaComponent,
                dialog_tutorial_component_1.DialogTutorialComponent,
                home_component_1.HomeComponent,
                dialog_add_cat_component_1.DialogAddCatComponent,
                dialog_add_item_component_1.DialogAddItemComponent,
                dialog_editar_car_component_1.DialogEditarCarComponent,
                dialog_editar_item_component_1.DialogEditarItemComponent,
                inicio_delivery_component_1.InicioDeliveryComponent,
                paineldelivery_component_1.PaineldeliveryComponent,
                pedidos_component_1.PedidosComponent,
                dialog_pedido_component_1.DialogPedidoComponent,
                avaliacoes_component_1.AvaliacoesComponent,
                categorias_adicionais_component_1.CategoriasAdicionaisComponent,
                itens_adicionais_component_1.ItensAdicionaisComponent,
                dialog_categoria_adicional_component_1.DialogCategoriaAdicionalComponent,
                dialog_add_item_adicional_component_1.DialogAddItemAdicionalComponent,
                editar_item_completo_component_1.EditarItemCompletoComponent,
                todos_pedidos_component_1.TodosPedidosComponent,
                painel_pedidos_component_1.PainelPedidosComponent,
                dashboard_component_1.DashboardComponent,
                respavaliacao_component_1.RespavaliacaoComponent,
                cancelar_pedido_component_1.CancelarPedidoComponent,
                aviso_taxa_pedido_component_1.AvisoTaxaPedidoComponent,
                recuperar_conta_component_1.RecuperarContaComponent,
                relatorios_component_1.RelatoriosComponent,
                usuarios_component_1.UsuariosComponent,
                formulario_usuario_component_1.FormularioUsuarioComponent,
                cadastro_pedido_component_1.CadastroPedidoComponent,
                item_catalogo_component_1.ItemCatalogoComponent,
                selecionar_forma_pag_component_1.SelecionarFormaPagComponent,
                galeria_component_1.GaleriaComponent,
                bairros_sistema_component_1.BairrosSistemaComponent,
                formas_pagamento_component_1.FormasPagamentoComponent,
                itens_pagamento_component_1.ItensPagamentoComponent,
                cupons_component_1.CuponsComponent,
                notificacoes_sistema_component_1.NotificacoesSistemaComponent,
                dialog_dinam_component_1.DialogDinamComponent,
                usuarios_finais_component_1.UsuariosFinaisComponent,
                cidades_sistema_component_1.CidadesSistemaComponent,
                painel_relatorio_component_1.PainelRelatorioComponent,
                relatorio_itens_component_1.RelatorioItensComponent,
                relatorio_fp_component_1.RelatorioFpComponent,
                relatorio_entregas_component_1.RelatorioEntregasComponent,
                relatorio_fretes_component_1.RelatorioFretesComponent,
                relatorio_faturamento_component_1.RelatorioFaturamentoComponent,
                relatorio_pedidos_cancelados_component_1.RelatorioPedidosCanceladosComponent,
                relatorio_clientes_component_1.RelatorioClientesComponent,
                impressao_pedido_component_1.ImpressaoPedidoComponent,
                estoque_component_1.EstoqueComponent,
                historico_component_1.HistoricoComponent,
                estoque_motoboy_component_1.EstoqueMotoboyComponent,
                itens_estoque_component_1.ItensEstoqueComponent,
                estoque_enviar_component_1.EstoqueEnviarComponent,
                estoque_retirar_loja_component_1.EstoqueRetirarLojaComponent,
                repor_estoque_component_1.ReporEstoqueComponent,
                form_estoque_component_1.FormEstoqueComponent,
                finaceiro_component_1.FinaceiroComponent,
                lista_motoboys_component_1.ListaMotoboysComponent,
                form_cupom_component_1.FormCupomComponent,
                retornar_de_motoboy_component_1.RetornarDeMotoboyComponent,
                form_formapagamento_component_1.FormFormapagamentoComponent,
                estoque_entrada_component_1.EstoqueEntradaComponent,
                itens_estoque_detalhes_component_1.ItensEstoqueDetalhesComponent,
                caixa_financeiro_component_1.CaixaFinanceiroComponent,
                comissao_entregas_component_1.ComissaoEntregasComponent,
                compras_clientes_component_1.ComprasClientesComponent,
                lista_compras_clientes_component_1.ListaComprasClientesComponent,
                consolidacao_financeira_component_1.ConsolidacaoFinanceiraComponent,
                enderecos_cliente_component_1.EnderecosClienteComponent,
                form_endereco_cliente_component_1.FormEnderecoClienteComponent,
                transferir_estoque_motoboy_component_1.TransferirEstoqueMotoboyComponent,
                form_bairro_component_1.FormBairroComponent,
                painel2_relatorio_component_1.Painel2RelatorioComponent,
                nome_pipe_1.NomePipe,
                selecionar_motoboy_component_1.SelecionarMotoboyComponent,
                adicionar_despesa_component_1.AdicionarDespesaComponent,
                detalhes_item_tabela_component_1.DetalhesItemTabelaComponent,
                adicionar_pagamento_component_1.AdicionarPagamentoComponent,
                controle_fiado_component_1.ControleFiadoComponent,
                pedidos_fiado_component_1.PedidosFiadoComponent,
                pagar_divida_component_1.PagarDividaComponent,
                conciliacao_bancaria_component_1.ConciliacaoBancariaComponent,
                adicionar_banco_component_1.AdicionarBancoComponent,
                bancos_component_1.BancosComponent,
                form_banco_component_1.FormBancoComponent,
                barra_total_component_1.BarraTotalComponent,
                clientes_detalhes_component_1.ClientesDetalhesComponent,
                selecionar_banco_component_1.SelecionarBancoComponent,
                consolidacao_cartao_component_1.ConsolidacaoCartaoComponent,
                selecionar_motoboy_entrega_component_1.SelecionarMotoboyEntregaComponent,
                form_item_pagamento_component_1.FormItemPagamentoComponent,
                selecionar_cartao_pagamento_component_1.SelecionarCartaoPagamentoComponent,
                upload_imagem_component_1.UploadImagemComponent,
                ver_imagem_component_1.VerImagemComponent,
                pagina_default_component_1.PaginaDefaultComponent,
                valor_item_pagamento_component_1.ValorItemPagamentoComponent,
                consolidacao_dinheiro_component_1.ConsolidacaoDinheiroComponent,
                historico_caixa_component_1.HistoricoCaixaComponent,
                senha_operador_desfazer_component_1.SenhaOperadorDesfazerComponent,
                inserir_senha_component_1.InserirSenhaComponent,
                data_retroativa_component_1.DataRetroativaComponent,
                organizacao_entregador_component_1.OrganizacaoEntregadorComponent,
                estoque_logistica_component_1.EstoqueLogisticaComponent,
                tela_um_component_1.TelaUmComponent,
                tela_dois_component_1.TelaDoisComponent,
                tabela_pedidos_component_1.TabelaPedidosComponent,
                api_calendario_component_1.ApiCalendarioComponent,
                form_organizacao_component_1.FormOrganizacaoComponent,
                usuario_permissoes_component_1.UsuarioPermissoesComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                ng_lazyload_image_1.LazyLoadImageModule,
                app_routing_module_1.AppRoutingModule,
                animations_1.BrowserAnimationsModule,
                slider_1.MatSliderModule,
                card_1.MatCardModule,
                grid_list_1.MatGridListModule,
                input_1.MatInputModule,
                button_1.MatButtonModule,
                toolbar_1.MatToolbarModule,
                layout_1.LayoutModule,
                sidenav_1.MatSidenavModule,
                icon_1.MatIconModule,
                list_1.MatListModule,
                tree_1.MatTreeModule,
                bottom_sheet_1.MatBottomSheetModule,
                dialog_1.MatDialogModule,
                progress_bar_1.MatProgressBarModule,
                snack_bar_1.MatSnackBarModule,
                chips_1.MatChipsModule,
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                agm_overlays_1.AgmOverlays,
                select_1.MatSelectModule,
                autocomplete_1.MatAutocompleteModule,
                menu_1.MatMenuModule,
                badge_1.MatBadgeModule,
                core_2.AgmCoreModule.forRoot({
                    apiKey: 'AIzaSyAwli4wwHOdbNUazzdQOOzswiWry5gUo9c'
                }),
                ngx_mask_1.NgxMaskModule.forRoot(),
                stepper_1.MatStepperModule,
                progress_spinner_1.MatProgressSpinnerModule,
                expansion_1.MatExpansionModule,
                tooltip_1.MatTooltipModule,
                datepicker_1.MatDatepickerModule,
                core_3.MatNativeDateModule,
                agm_direction_1.AgmDirectionModule,
                checkbox_1.MatCheckboxModule,
                slide_toggle_1.MatSlideToggleModule,
                radio_1.MatRadioModule,
                table_1.MatTableModule,
                tabs_1.MatTabsModule,
                paginator_1.MatPaginatorModule,
                ng2_charts_1.ChartsModule,
            ],
            entryComponents: [
                dialo_delsucg_component_1.DialoDelsucgComponent
            ],
            providers: [auth_service_1.AuthService, datepicker_1.MatDatepickerModule],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
