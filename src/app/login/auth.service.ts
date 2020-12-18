import { UsuariosSistemaService } from './../usuarios/usuario-permissoes/usuarios-sistema.service';
import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoService } from '../servico.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public mostrarMenu = new EventEmitter<boolean>();
  constructor(private route: Router, private servico: ServicoService, private permUsuario: UsuariosSistemaService) { }

  verificaLogado() {

      if (this.servico.getStatusLogado() === false) {
      console.log('ir pagina login');
      // document.getElementById('btnav').click();
      this.route.navigate(['/login']);
      return true;

    } else {
      console.log('ir pagina inicio');
      console.log(this.permUsuario.getPermissoessuario());
      return true;
    }
  }

  verificaTipoUsuario() {
    return true;
  }
}
