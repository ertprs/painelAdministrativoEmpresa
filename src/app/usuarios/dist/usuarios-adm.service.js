"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsuariosAdmService = void 0;
var core_1 = require("@angular/core");
var UsuariosAdmService = /** @class */ (function () {
    function UsuariosAdmService() {
        this.permissoes = [];
        this.statusPermissaoSet = false;
    }
    UsuariosAdmService.prototype.setUsuario = function (usuario) { this.usuarioSelecionado = usuario; };
    UsuariosAdmService.prototype.getUsuario = function () { return this.usuarioSelecionado; };
    UsuariosAdmService.prototype.initPermissao = function (status, permissoes) {
        // se status for VERDADEIRO que dizer que a loja é admin master e nao tem restrisções de perimissões
        if (status) { }
        else {
            console.log('Permissões de usuário');
            this.permissoes = permissoes;
            // Se a loja nao tiver com as configurações de permissoes salva na base 
            // statusPermissaoSet = false para indicar que a loja ainda precisa ser configurada.
            if (this.permissoes) {
                this.statusPermissaoSet = true;
            }
            else {
                this.statusPermissaoSet = false;
            }
        }
    };
    UsuariosAdmService.prototype.setPermissoes = function (permissoes) { this.permissoes = permissoes; };
    UsuariosAdmService.prototype.getPermissoessuario = function () { return this.permissoes; };
    UsuariosAdmService.prototype.getStatusPermissoessuario = function () { return this.statusPermissaoSet; };
    UsuariosAdmService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UsuariosAdmService);
    return UsuariosAdmService;
}());
exports.UsuariosAdmService = UsuariosAdmService;
