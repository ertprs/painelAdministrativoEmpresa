"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ItensEstoqueComponent = void 0;
var repor_estoque_component_1 = require("./../repor-estoque/repor-estoque.component");
var estoque_retirar_loja_component_1 = require("./../estoque-retirar-loja/estoque-retirar-loja.component");
var estoque_enviar_component_1 = require("./../estoque-enviar/estoque-enviar.component");
var animations_1 = require("@angular/animations");
var core_1 = require("@angular/core");
var form_estoque_component_1 = require("../form-estoque/form-estoque.component");
var ItensEstoqueComponent = /** @class */ (function () {
    function ItensEstoqueComponent(dialog, servpedidos, formBuilder, servapp, crud, router, us) {
        this.dialog = dialog;
        this.servpedidos = servpedidos;
        this.formBuilder = formBuilder;
        this.servapp = servapp;
        this.crud = crud;
        this.router = router;
        this.us = us;
        this.columnsToDisplay = ['c1', 'nome', 'descricao', 'quantidade', 'valor', 'info', 'sub', 'remover', 'editar', 'adicionar'];
        this.dataSource = [];
        this.sst = false;
        this.btEnviar = true;
        this.btAdd = true;
    }
    ItensEstoqueComponent.prototype.ngOnInit = function () {
        this.btEnviar = this.us.getPermissoessuario()[5].children[0].status;
        this.estoque();
    };
    ItensEstoqueComponent.prototype.estoque = function () {
        var _this = this;
        this.crud.get_api('estoque').subscribe(function (data) {
            _this.dataSource = data;
        });
    };
    ItensEstoqueComponent.prototype.add = function () {
        var _this = this;
        var dialogRef = this.dialog.open(form_estoque_component_1.FormEstoqueComponent, {
            width: '450px',
            data: { tipo: 'add', nomeDialog: 'form_estoque' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                // this.f1(result) ;
            }
            _this.f1(result);
        });
    };
    ItensEstoqueComponent.prototype.editar = function (element) {
        var _this = this;
        var dialogRef = this.dialog.open(form_estoque_component_1.FormEstoqueComponent, {
            width: '450px',
            data: { tipo: 'editar', nomeDialog: 'form_estoque', item: element }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                var accallback = function () {
                    console.log('callback');
                    var r = _this.servapp.getRespostaApi();
                    if (r.erro === true) {
                        _this.servapp.mostrarMensagem(r.mensagem);
                    }
                    else {
                        _this.servapp.mostrarMensagem(r.mensagem);
                        _this.dataSource = r.itens;
                    }
                    console.log(r);
                };
                _this.crud.post_api('attEstoque', accallback, result);
            }
        });
    };
    ItensEstoqueComponent.prototype.f1 = function (form) {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.detalhes);
            }
            else {
                _this.servapp.mostrarMensagem(r.detalhes);
                _this.dataSource = r.resultado;
            }
            console.log(r);
        };
        this.crud.post_api('addEstoque', accallback, form);
    };
    ItensEstoqueComponent.prototype.enviarNovoEstoque = function (element) {
        var _this = this;
        var dialogRef = this.dialog.open(estoque_enviar_component_1.EstoqueEnviarComponent, {
            width: '450px',
            data: { tipo: 'editar', nomeDialog: 'form_estoque_enviar_novo', item: element }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                var accallback = function () {
                    console.log('callback');
                    var r = _this.servapp.getRespostaApi();
                    if (r.erro === true) {
                        _this.servapp.mostrarMensagem(r.detalhes);
                    }
                    else {
                        _this.servapp.mostrarMensagem(r.detalhes.mensagem);
                        _this.estoque();
                    }
                    console.log(r);
                };
                _this.crud.post_api('enviaEstoque', accallback, result);
            }
        });
    };
    ItensEstoqueComponent.prototype.retirarEstoqueLoja = function (element) {
        var _this = this;
        var dialogRef = this.dialog.open(estoque_retirar_loja_component_1.EstoqueRetirarLojaComponent, {
            width: '450px',
            data: { item: element }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                var accallback = function () {
                    console.log('callback');
                    var r = _this.servapp.getRespostaApi();
                    if (r.erro === true) {
                        _this.servapp.mostrarMensagem(r.detalhes);
                    }
                    else {
                        _this.servapp.mostrarMensagem(r.detalhes);
                        // this.dataSource = r.detalhes.resultado;
                        _this.estoque();
                    }
                    console.log(r);
                };
                _this.crud.post_api('retirar_estoque_loja', accallback, result);
            }
        });
    };
    ItensEstoqueComponent.prototype.reporEstoqueLoja = function (element) {
        var _this = this;
        var dialogRef = this.dialog.open(repor_estoque_component_1.ReporEstoqueComponent, {
            width: '450px',
            data: { item: element }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                var accallback = function () {
                    console.log('callback');
                    var r = _this.servapp.getRespostaApi();
                    if (r.erro === true) {
                        _this.servapp.mostrarMensagem(r.detalhes.mensagem);
                    }
                    else {
                        _this.servapp.mostrarMensagem(r.detalhes.mensagem);
                        _this.dataSource = r.detalhes.itens;
                    }
                    console.log(r);
                };
                _this.crud.post_api('repor_estoque_loja', accallback, result);
            }
        });
    };
    ItensEstoqueComponent.prototype.desabilitarEstoqueLoja = function (element) {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.detalhes.mensagem);
            }
            else {
                _this.servapp.mostrarMensagem(r.detalhes.mensagem);
                _this.dataSource = r.detalhes.itens;
            }
            console.log(r);
        };
        this.crud.post_api('desabilitar_estoque_loja', accallback, { id: element.id });
    };
    ItensEstoqueComponent = __decorate([
        core_1.Component({
            selector: 'app-itens-estoque',
            templateUrl: './itens-estoque.component.html',
            styleUrls: ['./itens-estoque.component.css'],
            animations: [
                animations_1.trigger('detailExpand', [
                    animations_1.state('collapsed', animations_1.style({ height: '0px', minHeight: '0' })),
                    animations_1.state('expanded', animations_1.style({ height: '*' })),
                    animations_1.transition('expanded <=> collapsed', animations_1.animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                ]),
            ]
        })
    ], ItensEstoqueComponent);
    return ItensEstoqueComponent;
}());
exports.ItensEstoqueComponent = ItensEstoqueComponent;
