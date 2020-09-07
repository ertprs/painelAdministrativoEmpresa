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
var chat_component_1 = require("./chat/chat.component");
var ngx_socket_io_1 = require("ngx-socket-io");
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
//const config: SocketIoConfig = { url: 'https://guinho-site.umbler.net', options: {} };
var config = { url: 'http://192.168.0.108:3000', options: {} };
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
                chat_component_1.ChatComponent,
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
                ngx_socket_io_1.SocketIoModule.forRoot(config),
                table_1.MatTableModule,
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
