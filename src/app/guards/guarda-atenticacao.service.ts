import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ServicoService } from '../servico.service';
import { AuthService } from '../login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuardaAtenticacaoService implements CanActivate {

  constructor(private servico: ServicoService, private route: Router, private authlogin: AuthService, private cookies: CookieService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    console.log(this.servico.getStatusLogado());
    setTimeout( () =>  { this.cookies.set('router_exi', this.route.url); }, 500);
    return this.authlogin.verificaLogado();
  }

}
