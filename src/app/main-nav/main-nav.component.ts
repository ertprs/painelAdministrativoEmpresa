import { MainNavService } from './main-nav.service';
import { PedidosService } from './../delivery/pedidos/pedidos.service';
import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { ServicoService } from '../servico.service';
import { UsuariosAdmService } from '../usuarios/usuarios-adm.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  opened: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public servico: ServicoService,
              public servpedidos: PedidosService, public us: UsuariosAdmService, public ms: MainNavService) {}

              clickMenu(item) {
                  this.ms.menuSelecionado.forEach(element => {
                    console.log('loop');
                      if (element === item) { console.log('OK');  item.selecionado = true; } else {   element.selecionado = false;  }
                  });
              }

}
