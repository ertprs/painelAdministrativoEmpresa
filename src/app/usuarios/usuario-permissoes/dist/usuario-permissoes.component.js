"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsuarioPermissoesComponent = void 0;
var core_1 = require("@angular/core");
var tree_1 = require("@angular/cdk/tree");
var tree_2 = require("@angular/material/tree");
var UsuarioPermissoesComponent = /** @class */ (function () {
    function UsuarioPermissoesComponent(servico, crud, router, us) {
        this.servico = servico;
        this.crud = crud;
        this.router = router;
        this.us = us;
        this.treeControl = new tree_1.NestedTreeControl(function (node) { return node.children; });
        this.dataSource = new tree_2.MatTreeNestedDataSource();
        this.TREE_DATA = [];
        this.hasChild = function (_, node) { return !!node.children && node.children.length > 0; };
    }
    UsuarioPermissoesComponent.prototype.ngOnInit = function () {
        console.log(this.us.getUsuario().nome);
        console.log(this.us.getPermissoessuario());
        if (this.us.getUsuario().permissoes) {
            this.dataSource.data = this.us.getUsuario().permissoes;
        }
        else {
            this.dataSource.data = this.us.getPermissoessuario();
        }
    };
    UsuarioPermissoesComponent.prototype.onClickSalvar = function () {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.detalhes);
            }
            else {
                _this.servico.mostrarMensagem(r.detalhes);
                _this.router.navigate(['/painel/usuarios']);
            }
            console.log(r);
        };
        this.crud.post_api('attPermissoesUsuarioSistema', accallback, { id: this.us.getUsuario().id, perm: this.us.getPermissoessuario() });
    };
    UsuarioPermissoesComponent = __decorate([
        core_1.Component({
            selector: 'app-usuario-permissoes',
            templateUrl: './usuario-permissoes.component.html',
            styleUrls: ['./usuario-permissoes.component.css']
        })
    ], UsuarioPermissoesComponent);
    return UsuarioPermissoesComponent;
}());
exports.UsuarioPermissoesComponent = UsuarioPermissoesComponent;
