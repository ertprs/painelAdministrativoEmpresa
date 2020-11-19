import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosAdmService {
  private usuarioSelecionado: any;
  private permissoes = [];

  constructor() { }

  setUsuario(usuario: any) { this.usuarioSelecionado = usuario; }
  getUsuario() { return this.usuarioSelecionado; }

  initPermissao(status, permissoes) {
    console.log('#initPermissao');
    console.log(status);
    console.log(permissoes);

    if (status) {} else {
        console.log('Permissões de usuário');
        this.permissoes = permissoes;
      }
   }

  setPermissoes(permissoes: any) { this.permissoes = permissoes; }
  getPermissoessuario(): any { return this.permissoes; }
}
