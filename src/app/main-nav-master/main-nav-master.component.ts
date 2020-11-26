import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { PedidosService } from '../delivery/pedidos/pedidos.service';
import { MainNavService } from '../main-nav/main-nav.service';
import { ServicoService } from '../servico.service';
import { UsuariosAdmService } from '../usuarios/usuarios-adm.service';

@Component({
  selector: 'app-main-nav-master',
  templateUrl: './main-nav-master.component.html',
  styleUrls: ['./main-nav-master.component.css']
})
export class MainNavMasterComponent implements OnInit {


  opened: boolean;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches),shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public servico: ServicoService,
              public servpedidos: PedidosService, public us: UsuariosAdmService, public ms: MainNavService) { }

  ngOnInit(): void {
  }

  clickMenu(item) {
    this.ms.menuSelecionado.forEach(element => {
      console.log('loop');
      if (element === item) { console.log('OK');  item.selecionado = true; } else {   element.selecionado = false;  }
    });
}

}
