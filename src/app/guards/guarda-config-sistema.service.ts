import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { ServicoService } from '../servico.service';

@Injectable({
  providedIn: 'root'
})
export class GuardaConfigSistemaService {

  constructor(private servico: ServicoService, private route: Router, private authlogin: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authlogin.verificaTipoUsuario() === 'master') { return true; } else { return false; }
  }
}
