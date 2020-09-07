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
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAwli4wwHOdbNUazzdQOOzswiWry5gUo9c'
    }),
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
  ],
  entryComponents: [
    DialoDelsucgComponent
  ],
  providers: [AuthService, MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule { }

