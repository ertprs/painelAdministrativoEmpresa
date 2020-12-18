import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosAdmService {
  private usuarioSelecionado: any;
  private permissoes = [];
  private statusPermissaoSet = false;

  constructor() { }

  setUsuario(usuario: any) { this.usuarioSelecionado = usuario; }
  getUsuario() { return this.usuarioSelecionado; }

  initPermissao(status, permissoes) {
    console.log('#initPermissao');
    console.log(status);
    console.log(permissoes);
    // se status for VERDADEIRO que dizer que a loja é admin master e nao tem restrisções de perimissões
    if (status) {} else {
        console.log('Permissões de usuário');
        this.permissoes = permissoes;
       // Se a loja nao tiver com as configurações de permissoes salva na base 
       // statusPermissaoSet = false para indicar que a loja ainda precisa ser configurada.
        if (this.permissoes) {
          this.statusPermissaoSet = true;
        } else {
          this.statusPermissaoSet = false;
        }

      }
   }

  setPermissoes(permissoes: any) {  this.permissoes = permissoes; }
  getPermissoessuario(): any { return this.permissoes; }

  getStatusPermissoessuario(): any { return this.statusPermissaoSet; }
}
