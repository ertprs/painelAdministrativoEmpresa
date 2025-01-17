import { CrudServicoService } from 'src/app/crud-servico.service';
import { CookieService } from 'ngx-cookie-service';
import { MainNavService } from './main-nav.service';
import { PedidosService } from './../delivery/pedidos/pedidos.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ServicoService } from '../servico.service';
import { UsuariosAdmService } from '../usuarios/usuarios-adm.service';
import { SelecionarMotoboyEntregaComponent } from '../delivery/pedidos/selecionar-motoboy-entrega/selecionar-motoboy-entrega.component';
import { MatDialog } from '@angular/material/dialog';
import { ProgressSistemaService } from '../componentes/progress-sistema/progress-sistema.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  opened: boolean;
  dialogDelsuc: any;
  statusCaixa: any;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public servico: ServicoService,
              public servpedidos: PedidosService, public us: UsuariosAdmService, public ms: MainNavService,
              private dialog: MatDialog, private cookieService: CookieService, private crud: CrudServicoService,
              private progServ: ProgressSistemaService  
              ) {
  }

  clickMenu(item) {
    this.ms.menuSelecionado.forEach(element => {
      if (element === item) { item.selecionado = true; } else { element.selecionado = false; }
    });
    if (window.innerWidth < 600) {
      // Se a tela for menor
      document.getElementById('btnav').click();
    }
  }

  selecionarMotoboy() {
    this.dialogDelsuc = this.dialog.open(SelecionarMotoboyEntregaComponent, {
      width: '560px', data: false
    });
    this.dialogDelsuc.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  sair() {

    this.crud.post_api('sairPainel', () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {  
        this.progServ.showProgress.emit(true);
        this.servico.mostrarMensagem(r.detalhes); 
        return; }
      const pin = setInterval(() => {
        if (this.cookieService.check('lgn')) {
          this.cookieService.deleteAll();
        } else {
          location.reload();
          clearInterval(pin);
        }
      }, 900);
    }, {}, true);

  }

}
