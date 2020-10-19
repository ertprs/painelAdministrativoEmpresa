"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsuariosComponent = void 0;
var formulario_usuario_component_1 = require("./formulario-usuario/formulario-usuario.component");
var core_1 = require("@angular/core");
var UsuariosComponent = /** @class */ (function () {
    function UsuariosComponent(crud, servico, dialog, route, us) {
        this.crud = crud;
        this.servico = servico;
        this.dialog = dialog;
        this.route = route;
        this.us = us;
        this.displayedColumns = ['op', 'op2', 'email', 'nome', 'senha', 'tipo', 'ultimo_login', 'info', 'add'];
        this.itens = [];
    }
    UsuariosComponent.prototype.ngOnInit = function () {
        this.f5();
    };
    UsuariosComponent.prototype.f5 = function () {
        var _this = this;
        this.crud.get_api('usuarios').subscribe(function (data) {
            console.log(data);
            _this.itens = data.resultado;
        });
    };
    UsuariosComponent.prototype.add = function () {
        var _this = this;
        var dialogRef = this.dialog.open(formulario_usuario_component_1.FormularioUsuarioComponent, {
            width: '450px',
            data: { acao: 'add' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                _this.f1(result);
            }
        });
    };
    UsuariosComponent.prototype.confp = function (item) {
        this.us.setUsuario(item);
        this.route.navigate(['/painel/usuarios-permissoes']);
    };
    UsuariosComponent.prototype.onClickEditar = function (item) {
        var _this = this;
        var dialogRef = this.dialog.open(formulario_usuario_component_1.FormularioUsuarioComponent, {
            width: '450px',
            data: { acao: 'editar', usuario: item }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                _this.editar(result);
            }
        });
    };
    UsuariosComponent.prototype.editar = function (form) {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.detalhes);
            }
            else {
                _this.servico.mostrarMensagem(r.detalhes);
                _this.f5();
            }
            console.log(r);
        };
        this.crud.post_api('editar_usuario', accallback, form);
    };
    UsuariosComponent.prototype.f1 = function (form) {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.detalhes);
            }
            else {
                _this.servico.mostrarMensagem(r.detalhes);
                _this.f5();
            }
            console.log(r);
        };
        this.crud.post_api('add_usuario', accallback, form);
    };
    UsuariosComponent.prototype.removerItem = function (item) {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.detalhes);
            }
            else {
                _this.servico.mostrarMensagem(r.detalhes);
                _this.f5();
            }
            console.log(r);
        };
        this.crud.post_api('remover_usuario', accallback, item);
    };
    UsuariosComponent = __decorate([
        core_1.Component({
            selector: 'app-usuarios',
            templateUrl: './usuarios.component.html',
            styleUrls: ['./usuarios.component.css']
        })
    ], UsuariosComponent);
    return UsuariosComponent;
}());
exports.UsuariosComponent = UsuariosComponent;
