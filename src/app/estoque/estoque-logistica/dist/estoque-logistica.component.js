"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EstoqueLogisticaComponent = void 0;
var tela_um_component_1 = require("./tela-um/tela-um.component");
var core_1 = require("@angular/core");
var tela_dois_component_1 = require("./tela-dois/tela-dois.component");
var tela3_component_1 = require("./tela3/tela3.component");
var EstoqueLogisticaComponent = /** @class */ (function () {
    function EstoqueLogisticaComponent(servapp, crud, dialog, us) {
        this.servapp = servapp;
        this.crud = crud;
        this.dialog = dialog;
        this.us = us;
        this.columnsToDisplay = ['data', 'valor_pedido', 'local_saida', 'local_chegada', 'previsao_chegada', 'produtos', 'bt1'];
        this.dataSource = [];
        this.btAddLog = true;
        this.btAdd = true;
        this.params = {
            saida: '', chegada: '', valorPedido: '', previsaoEntrega: '',
            itens: []
        };
    }
    EstoqueLogisticaComponent.prototype.ngOnInit = function () {
        this.btAdd = this.us.getPermissoessuario()[5].children[4].status;
        this.btAddLog = this.us.getPermissoessuario()[5].children[5].status;
        this.f1();
    };
    EstoqueLogisticaComponent.prototype.verProdutos = function (item) {
        var _this = this;
        console.log(item);
        var dialogRef = this.dialog.open(tela3_component_1.Tela3Component, {
            width: '850px',
            data: item
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                _this.f1();
            }
        });
    };
    EstoqueLogisticaComponent.prototype.f1 = function () {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.detalhes.mensagem);
            }
            else {
                _this.dataSource = r.resultado.itens;
            }
            console.log(r);
        };
        this.crud.post_api('logistica', accallback, '');
    };
    EstoqueLogisticaComponent.prototype.onClickAdd = function () {
        var _this = this;
        var dialogRef = this.dialog.open(tela_um_component_1.TelaUmComponent, {
            width: '450px',
            data: { parametros: this.params }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                _this.dadosItemLogista = result;
                _this.tela2();
            }
        });
    };
    EstoqueLogisticaComponent.prototype.tela2 = function () {
        var _this = this;
        var dialogRef = this.dialog.open(tela_dois_component_1.TelaDoisComponent, {
            width: '850px',
            data: this.dadosItemLogista
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                _this.f1();
            }
        });
    };
    EstoqueLogisticaComponent.prototype.lacarEstoque = function (item) {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.resultado.mensagem);
            }
            else {
                _this.f1();
                _this.servapp.mostrarMensagem(r.resultado.mensagem);
            }
            console.log(r);
        };
        this.crud.post_api('addEstoqueItemLogistica', accallback, item.id);
    };
    EstoqueLogisticaComponent = __decorate([
        core_1.Component({
            selector: 'app-estoque-logistica',
            templateUrl: './estoque-logistica.component.html',
            styleUrls: ['./estoque-logistica.component.css']
        })
    ], EstoqueLogisticaComponent);
    return EstoqueLogisticaComponent;
}());
exports.EstoqueLogisticaComponent = EstoqueLogisticaComponent;
