import { LazyLoadImageModule } from 'ng-lazyload-image';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { InicioComponent } from './inicio/inicio.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ClientesComponent } from './clientes/clientes.component';
import { MatTreeModule } from '@angular/material/tree';
import { EntregasComponent } from './entregas/entregas.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { DialoDelsucgComponent } from './dialo-delsucg/dialo-delsucg.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MototboysComponent } from './mototboys/mototboys.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { LoginComponent } from './login/login.component';
import { DialogCadastroClienteComponent } from './dialog-cadastro-cliente/dialog-cadastro-cliente.component';
import { DialogCadastroEntregaComponent } from './dialog-cadastro-entrega/dialog-cadastro-entrega.component';
import { DialogAddMototboyComponent } from './dialog-add-mototboy/dialog-add-mototboy.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';
import { DialogEditarClienteComponent } from './dialog-editar-cliente/dialog-editar-cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { AgmOverlays } from 'agm-overlays';
import { MatSelectModule } from '@angular/material/select';
import { EditarEntregaComponent } from './editar-entrega/editar-entrega.component';
import { EditarClienteComponent } from './editar-cliente/editar-cliente.component';
import { CadastroEmpresaComponent } from './cadastro-empresa/cadastro-empresa.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from './login/auth.service';
import { DialogEntregadorComponent } from './dialog-entregador/dialog-entregador.component';
import { MatBadgeModule } from '@angular/material/badge';
import { DialogHistEntregaComponent } from './entregas/dialog-hist-entrega/dialog-hist-entrega.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfigComponent } from './config/config.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatNativeDateModule } from '@angular/material/core';
import { AgmDirectionModule } from 'agm-direction';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FreshPipe } from './fresh.pipe';
import { DialogPedeaiComponent } from './dialog-pedeai/dialog-pedeai.component';
import { DialogVerEntregaComponent } from './dialog-pedeai/dialog-ver-entrega/dialog-ver-entrega.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { DialogTutorialComponent } from './dialog-tutorial/dialog-tutorial.component';
import { HomeComponent } from './home/home.component';
import { DialogAddCatComponent } from './home/dialog-add-cat/dialog-add-cat.component';
import { DialogAddItemComponent } from './home/dialog-add-item/dialog-add-item.component';
import { DialogEditarCarComponent } from './home/dialog-editar-car/dialog-editar-car.component';
import { DialogEditarItemComponent } from './home/dialog-editar-item/dialog-editar-item.component';
import { InicioDeliveryComponent } from './delivery/inicio-delivery/inicio-delivery.component';
import { PaineldeliveryComponent } from './delivery/paineldelivery/paineldelivery.component';
import { PedidosComponent } from './delivery/pedidos/pedidos.component';
import {MatTableModule} from '@angular/material/table';
import { DialogPedidoComponent } from './delivery/dialogs/dialog-pedido/dialog-pedido.component';
import { AvaliacoesComponent } from './delivery/avaliacoes/avaliacoes.component';
import { CategoriasAdicionaisComponent } from './delivery/categorias-adicionais/categorias-adicionais.component';
import { ItensAdicionaisComponent } from './delivery/itens-adicionais/itens-adicionais.component';
import { DialogCategoriaAdicionalComponent } from './delivery/dialogs/dialog-categoria-adicional/dialog-categoria-adicional.component';
import { DialogAddItemAdicionalComponent } from './delivery/dialogs/dialog-add-item-adicional/dialog-add-item-adicional.component';
import { EditarItemCompletoComponent } from './home/editar-item-completo/editar-item-completo.component';
import { TodosPedidosComponent } from './delivery/pedidos/todos-pedidos/todos-pedidos.component';
import { PainelPedidosComponent } from './delivery/pedidos/painel-pedidos/painel-pedidos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RespavaliacaoComponent } from './delivery/dialogs/respavaliacao/respavaliacao.component';
import { CancelarPedidoComponent } from './delivery/pedidos/cancelar-pedido/cancelar-pedido.component';
import { AvisoTaxaPedidoComponent } from './delivery/pedidos/aviso-taxa-pedido/aviso-taxa-pedido.component';
import { RecuperarContaComponent } from './recuperar-conta/recuperar-conta.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormularioUsuarioComponent } from './usuarios/formulario-usuario/formulario-usuario.component';
import { CadastroPedidoComponent } from './delivery/pedidos/cadastro-pedido/cadastro-pedido.component';
import { ItemCatalogoComponent } from './delivery/pedidos/cadastro-pedido/item-catalogo/item-catalogo.component';
import {MatTabsModule} from '@angular/material/tabs';
import { SelecionarFormaPagComponent } from './delivery/pedidos/cadastro-pedido/selecionar-forma-pag/selecionar-forma-pag.component';
import { GaleriaComponent } from './galeria/galeria.component';
import { BairrosSistemaComponent } from './bairros-sistema/bairros-sistema.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { FormasPagamentoComponent } from './formas-pagamento/formas-pagamento.component';
import { ItensPagamentoComponent } from './itens-pagamento/itens-pagamento.component';
import { CuponsComponent } from './cupons/cupons.component';
import { NotificacoesSistemaComponent } from './notificacoes-sistema/notificacoes-sistema.component';
import { DialogDinamComponent } from './dialog-dinam/dialog-dinam.component';
import { UsuariosFinaisComponent } from './usuarios-finais/usuarios-finais.component';
import { CidadesSistemaComponent } from './cidades-sistema/cidades-sistema.component';
import { PainelRelatorioComponent } from './painel-relatorio/painel-relatorio.component';
import { RelatorioItensComponent } from './painel-relatorio/relatorio-itens/relatorio-itens.component';
import { RelatorioFpComponent } from './painel-relatorio/relatorio-fp/relatorio-fp.component';
import { RelatorioEntregasComponent } from './painel-relatorio/relatorio-entregas/relatorio-entregas.component';
import { RelatorioFretesComponent } from './painel-relatorio/relatorio-fretes/relatorio-fretes.component';
import { RelatorioFaturamentoComponent } from './painel-relatorio/relatorio-faturamento/relatorio-faturamento.component';
// tslint:disable-next-line: max-line-length
import { RelatorioPedidosCanceladosComponent } from './painel-relatorio/relatorio-faturamento/relatorio-pedidos-cancelados/relatorio-pedidos-cancelados.component';
import { RelatorioClientesComponent } from './painel-relatorio/relatorio-clientes/relatorio-clientes.component';
import { ChartsModule } from 'ng2-charts';
import {LOCALE_ID} from '@angular/core';
import { ImpressaoPedidoComponent } from './delivery/pedidos/impressao-pedido/impressao-pedido.component';
import { EstoqueComponent } from './estoque/estoque.component';
import { HistoricoComponent } from './estoque/historico/historico.component';
import { EstoqueMotoboyComponent } from './estoque/estoque-motoboy/estoque-motoboy.component';
import { ItensEstoqueComponent } from './estoque/itens-estoque/itens-estoque.component';
import { EstoqueEnviarComponent } from './estoque/estoque-enviar/estoque-enviar.component';
import { EstoqueRetirarLojaComponent } from './estoque/estoque-retirar-loja/estoque-retirar-loja.component';
import { ReporEstoqueComponent } from './estoque/repor-estoque/repor-estoque.component';
import { FormEstoqueComponent } from './estoque/form-estoque/form-estoque.component';
import { FinaceiroComponent } from './finaceiro/finaceiro.component';
import { ListaMotoboysComponent } from './estoque/lista-motoboys/lista-motoboys.component';
import { FormCupomComponent } from './cupons/form-cupom/form-cupom.component';
import { RetornarDeMotoboyComponent } from './estoque/retornar-de-motoboy/retornar-de-motoboy.component';
import { FormFormapagamentoComponent } from './formas-pagamento/form-formapagamento/form-formapagamento.component';
import { EstoqueEntradaComponent } from './estoque/estoque-entrada/estoque-entrada.component';
import { ItensEstoqueDetalhesComponent } from './estoque/itens-estoque-detalhes/itens-estoque-detalhes.component';
import { CaixaFinanceiroComponent } from './finaceiro/caixa-financeiro/caixa-financeiro.component';
import { ComissaoEntregasComponent } from './finaceiro/comissao-entregas/comissao-entregas.component';
import { ComprasClientesComponent } from './finaceiro/compras-clientes/compras-clientes.component';
import { ListaComprasClientesComponent } from './finaceiro/compras-clientes/lista-compras-clientes/lista-compras-clientes.component';
import { ConsolidacaoFinanceiraComponent } from './finaceiro/consolidacao-financeira/consolidacao-financeira.component';
import { EnderecosClienteComponent } from './clientes/enderecos-cliente/enderecos-cliente.component';
import { FormEnderecoClienteComponent } from './clientes/form-endereco-cliente/form-endereco-cliente.component';
import { TransferirEstoqueMotoboyComponent } from './estoque/transferir-estoque-motoboy/transferir-estoque-motoboy.component';
import { FormBairroComponent } from './bairros-sistema/form-bairro/form-bairro.component';
import { Painel2RelatorioComponent } from './painel2-relatorio/painel2-relatorio.component';
import { NomePipe } from './nome.pipe';
import { SelecionarMotoboyComponent } from './estoque/itens-estoque-detalhes/selecionar-motoboy/selecionar-motoboy.component';
import { AdicionarDespesaComponent } from './finaceiro/consolidacao-financeira/adicionar-despesa/adicionar-despesa.component';
import { DetalhesItemTabelaComponent } from './finaceiro/consolidacao-financeira/detalhes-item-tabela/detalhes-item-tabela.component';
import { AdicionarPagamentoComponent } from './finaceiro/comissao-entregas/adicionar-pagamento/adicionar-pagamento.component';
import { ControleFiadoComponent } from './finaceiro/controle-fiado/controle-fiado.component';
import { PedidosFiadoComponent } from './finaceiro/controle-fiado/pedidos-fiado/pedidos-fiado.component';
import { PagarDividaComponent } from './finaceiro/controle-fiado/pagar-divida/pagar-divida.component';
import { ConciliacaoBancariaComponent } from './finaceiro/conciliacao-bancaria/conciliacao-bancaria.component';
import { AdicionarBancoComponent } from './finaceiro/conciliacao-bancaria/adicionar-banco/adicionar-banco.component';
import { BancosComponent } from './bancos/bancos.component';
import { FormBancoComponent } from './bancos/form-banco/form-banco.component';
import { BarraTotalComponent } from './componentes/barra-total/barra-total.component';
import { ClientesDetalhesComponent } from './clientes/clientes-detalhes/clientes-detalhes.component';
import { SelecionarBancoComponent } from './bancos/selecionar-banco/selecionar-banco.component';
import { ConsolidacaoCartaoComponent } from './finaceiro/consolidacao-cartao/consolidacao-cartao.component';
import { SelecionarMotoboyEntregaComponent } from './delivery/pedidos/selecionar-motoboy-entrega/selecionar-motoboy-entrega.component';
import { FormItemPagamentoComponent } from './itens-pagamento/form-item-pagamento/form-item-pagamento.component';
// tslint:disable-next-line: max-line-length
import { SelecionarCartaoPagamentoComponent } from './delivery/pedidos/cadastro-pedido/selecionar-cartao-pagamento/selecionar-cartao-pagamento.component';
import { UploadImagemComponent } from './upload-imagem/upload-imagem.component';
import { VerImagemComponent } from './upload-imagem/ver-imagem/ver-imagem.component';
import { PaginaDefaultComponent } from './componentes/pagina-default/pagina-default.component';
import { ValorItemPagamentoComponent } from './delivery/pedidos/cadastro-pedido/valor-item-pagamento/valor-item-pagamento.component';
import { ConsolidacaoDinheiroComponent } from './finaceiro/consolidacao-dinheiro/consolidacao-dinheiro.component';
import { HistoricoCaixaComponent } from './painel2-relatorio/historico-caixa/historico-caixa.component';
import { SenhaOperadorDesfazerComponent } from './senha-operador-desfazer/senha-operador-desfazer.component';
import { InserirSenhaComponent } from './senha-operador-desfazer/inserir-senha/inserir-senha.component';
import { DataRetroativaComponent } from './delivery/paineldelivery/data-retroativa/data-retroativa.component';
import { EstoqueLogisticaComponent } from './estoque/estoque-logistica/estoque-logistica.component';
import { TelaUmComponent } from './estoque/estoque-logistica/tela-um/tela-um.component';
import { TelaDoisComponent } from './estoque/estoque-logistica/tela-dois/tela-dois.component';
import { TabelaPedidosComponent } from './componentes/tabela-pedidos/tabela-pedidos.component';
import { ApiCalendarioComponent } from './api-calendario/api-calendario.component';
import { FormOrganizacaoComponent } from './organizacao-entregador/form-organizacao/form-organizacao.component';
import { UsuarioPermissoesComponent } from './usuarios/usuario-permissoes/usuario-permissoes.component';
import { OrganizacaoEntregadorComponent } from './organizacao-entregador/organizacao-entregador.component';
import { Tela3Component } from './estoque/estoque-logistica/tela3/tela3.component';
import { BtExportarComponent } from './componentes/bt-exportar/bt-exportar.component';
import { FiltronomePipe } from './filtronome.pipe';
import { NomesPipe } from './pipes/nomes.pipe';
import { AbatimentosEstoqueComponent } from './abatimentos-estoque/abatimentos-estoque.component';
import { AbatimentoItensComponent } from './abatimentos-estoque/abatimento-itens/abatimento-itens.component';
import { ProgressSistemaComponent } from './componentes/progress-sistema/progress-sistema.component';
import { ProgressoComponent } from './componentes/progress-sistema/progresso/progresso.component';
import { AlterarSenhaComponent } from './perfil/alterar-senha/alterar-senha.component';
import { InserirMotivoEntregadorComponent } from './mototboys/inserir-motivo-entregador/inserir-motivo-entregador.component';
import { MainNavMasterComponent } from './main-nav-master/main-nav-master.component';
import { PainelMasterComponent } from './main-nav-master/painel-master/painel-master.component';
import { ListaEmpresasComponent } from './main-nav/lista-empresas/lista-empresas.component';
import { VerEmpresaComponent } from './main-nav-master/ver-empresa/ver-empresa.component';
import { FaturasComponent } from './faturas/faturas.component';
import { CookieService } from 'ngx-cookie-service';
import { FiltronomedinamPipe } from './pipes/filtronomedinam.pipe';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { LoadercompComponent } from './componentes/loadercomp/loadercomp.component';
import { CategoriasEmpresasComponent } from './categorias-empresas/categorias-empresas.component';
import { FormCategoriasEmpresaComponent } from './categorias-empresas/form-categorias-empresa/form-categorias-empresa.component';
import { LoaderDelsucComponent } from './componentes/loader-delsuc/loader-delsuc.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { CategoriasDestaqueComponent } from './categorias-destaque/categorias-destaque.component';
import { FormCategoriaDestaqueComponent } from './categorias-destaque/form-categoria-destaque/form-categoria-destaque.component';
import { CadastroEmpresaLojistaComponent } from './cadastro-empresa-lojista/cadastro-empresa-lojista.component';
import { InicioSiteComponent } from './site/inicio-site/inicio-site.component';
import { PagamentoOnlineComponent } from './pagamento-online/pagamento-online.component';
import { EmpresaPagamentosOnlineComponent } from './empresa-pagamentos-online/empresa-pagamentos-online.component';
import { AddObservacaoPedidoComponent } from './add-observacao-pedido/add-observacao-pedido.component';
import { RotasEntregadorComponent } from './rotas-entregador/rotas-entregador.component';
import { GaleriaimagensComponent } from './componentes/galeriaimagens/galeriaimagens.component';
import { FidelidadeComponent } from './fidelidade/fidelidade.component';
import { PromocaoComponent } from './promocao/promocao.component';
import { QRCodeModule } from 'angularx-qrcode';
import { WhatsappComponent } from './whatsapp/whatsapp.component';
import { MsgRemotaComponent } from './msg-remota/msg-remota.component';
import { WhatsConfigComponent } from './whats-config/whats-config.component';
import { ControleCreditoComponent } from './controle-credito/controle-credito.component';
import { AdicionarCreditoClienteComponent } from './adicionar-credito-cliente/adicionar-credito-cliente.component';
export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    MainNavComponent,
    ClientesComponent,
    EntregasComponent,
    DialoDelsucgComponent,
    MototboysComponent,
    NotificacoesComponent,
    PerfilComponent,
    LoginComponent,
    DialogCadastroClienteComponent,
    DialogCadastroEntregaComponent,
    DialogAddMototboyComponent,
    DialogEditarClienteComponent,
    EditarEntregaComponent,
    EditarClienteComponent,
    CadastroEmpresaComponent,
    DialogEntregadorComponent,
    DialogHistEntregaComponent,
    ConfigComponent,
    FreshPipe,
    DialogPedeaiComponent,
    DialogVerEntregaComponent,
    DialogTutorialComponent,
    HomeComponent,
    DialogAddCatComponent,
    DialogAddItemComponent,
    DialogEditarCarComponent,
    DialogEditarItemComponent,
    InicioDeliveryComponent,
    PaineldeliveryComponent,
    PedidosComponent,
    DialogPedidoComponent,
    AvaliacoesComponent,
    CategoriasAdicionaisComponent,
    ItensAdicionaisComponent,
    DialogCategoriaAdicionalComponent,
    DialogAddItemAdicionalComponent,
    EditarItemCompletoComponent,
    TodosPedidosComponent,
    PainelPedidosComponent,
    DashboardComponent,
    RespavaliacaoComponent,
    CancelarPedidoComponent,
    AvisoTaxaPedidoComponent,
    RecuperarContaComponent,
    RelatoriosComponent,
    UsuariosComponent,
    FormularioUsuarioComponent,
    CadastroPedidoComponent,
    ItemCatalogoComponent,
    SelecionarFormaPagComponent,
    GaleriaComponent,
    BairrosSistemaComponent,
    FormasPagamentoComponent,
    ItensPagamentoComponent,
    CuponsComponent,
    NotificacoesSistemaComponent,
    DialogDinamComponent,
    UsuariosFinaisComponent,
    CidadesSistemaComponent,
    PainelRelatorioComponent,
    RelatorioItensComponent,
    RelatorioFpComponent,
    RelatorioEntregasComponent,
    RelatorioFretesComponent,
    RelatorioFaturamentoComponent,
    RelatorioPedidosCanceladosComponent,
    RelatorioClientesComponent,
    ImpressaoPedidoComponent,
    EstoqueComponent,
    HistoricoComponent,
    EstoqueMotoboyComponent,
    ItensEstoqueComponent,
    EstoqueEnviarComponent,
    EstoqueRetirarLojaComponent,
    ReporEstoqueComponent,
    FormEstoqueComponent,
    FinaceiroComponent,
    ListaMotoboysComponent,
    FormCupomComponent,
    RetornarDeMotoboyComponent,
    FormFormapagamentoComponent,
    EstoqueEntradaComponent,
    ItensEstoqueDetalhesComponent,
    CaixaFinanceiroComponent,
    ComissaoEntregasComponent,
    ComprasClientesComponent,
    ListaComprasClientesComponent,
    ConsolidacaoFinanceiraComponent,
    EnderecosClienteComponent,
    FormEnderecoClienteComponent,
    TransferirEstoqueMotoboyComponent,
    FormBairroComponent,
    Painel2RelatorioComponent,
    NomePipe,
    SelecionarMotoboyComponent,
    AdicionarDespesaComponent,
    DetalhesItemTabelaComponent,
    AdicionarPagamentoComponent,
    ControleFiadoComponent,
    PedidosFiadoComponent,
    PagarDividaComponent,
    ConciliacaoBancariaComponent,
    AdicionarBancoComponent,
    BancosComponent,
    FormBancoComponent,
    BarraTotalComponent,
    ClientesDetalhesComponent,
    SelecionarBancoComponent,
    ConsolidacaoCartaoComponent,
    SelecionarMotoboyEntregaComponent,
    FormItemPagamentoComponent,
    SelecionarCartaoPagamentoComponent,
    UploadImagemComponent,
    VerImagemComponent,
    PaginaDefaultComponent,
    ValorItemPagamentoComponent,
    ConsolidacaoDinheiroComponent,
    HistoricoCaixaComponent,
    SenhaOperadorDesfazerComponent,
    InserirSenhaComponent,
    DataRetroativaComponent,
    OrganizacaoEntregadorComponent,
    EstoqueLogisticaComponent,
    TelaUmComponent,
    TelaDoisComponent,
    TabelaPedidosComponent,
    ApiCalendarioComponent,
    FormOrganizacaoComponent,
    UsuarioPermissoesComponent,
    Tela3Component,
    BtExportarComponent,
    FiltronomePipe,
    NomesPipe,
      AbatimentosEstoqueComponent,
      AbatimentoItensComponent,
      ProgressSistemaComponent,
      ProgressoComponent,
      AlterarSenhaComponent,
      InserirMotivoEntregadorComponent,
      MainNavMasterComponent,
      PainelMasterComponent,
      ListaEmpresasComponent,
      VerEmpresaComponent,
      FaturasComponent,
      FiltronomedinamPipe,
      LoadercompComponent,
      CategoriasEmpresasComponent,
      FormCategoriasEmpresaComponent,
      LoaderDelsucComponent,
      CategoriasDestaqueComponent,
      FormCategoriaDestaqueComponent,
      CadastroEmpresaLojistaComponent,
      InicioSiteComponent,
      PagamentoOnlineComponent,
      EmpresaPagamentosOnlineComponent,
      AddObservacaoPedidoComponent,
      RotasEntregadorComponent,
      GaleriaimagensComponent,
      FidelidadeComponent,
      PromocaoComponent,
      WhatsappComponent,
      MsgRemotaComponent,
      WhatsConfigComponent,
      ControleCreditoComponent,
      AdicionarCreditoClienteComponent
   ],
  imports: [
    BrowserModule,
    LazyLoadImageModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    LayoutModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatChipsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgmOverlays,
    MatSelectModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatBadgeModule,
    NgxMaskModule.forRoot(),
    MatStepperModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AgmDirectionModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAwli4wwHOdbNUazzdQOOzswiWry5gUo9c'
    }),
    MatGoogleMapsAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAwli4wwHOdbNUazzdQOOzswiWry5gUo9c',
    }),
    AgmCoreModule.forRoot(),
    CurrencyMaskModule,
    QRCodeModule
  ],
  entryComponents: [
    DialoDelsucgComponent
  ],
  providers: [AuthService, MatDatepickerModule, CookieService, { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig } ],
  bootstrap: [AppComponent],
})
export class AppModule { }

