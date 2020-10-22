"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CaixaFinanceiroComponent = void 0;
var core_1 = require("@angular/core");
var CaixaFinanceiroComponent = /** @class */ (function () {
    function CaixaFinanceiroComponent(dialog, servpedidos, formBuilder, servapp, crud, router) {
        this.dialog = dialog;
        this.servpedidos = servpedidos;
        this.formBuilder = formBuilder;
        this.servapp = servapp;
        this.crud = crud;
        this.router = router;
        this.columnsToDisplay = ['c0', 'c1', 'c2', 'c3', 'c4'];
        this.columnsToDisplay2 = ['c0', 'c1', 'c2', 'c3', 'c4'];
        this.dataSource = [];
        this.dataSource2 = [];
        this.totalPagamento = 0;
        this.totalValores = 0;
        this.dataCaixa = '';
        this.statusCaixaFechado = '';
    }
    CaixaFinanceiroComponent.prototype.ngOnInit = function () {
        this.statusCaixa();
    };
    CaixaFinanceiroComponent.prototype.statusCaixa = function () {
        var _this = this;
        this.crud.get_api('statuscaixa').subscribe(function (data) {
            _this.dataSource = data.resultado.itens.fps;
            _this.totalPagamento = data.resultado.itens.total_pagamento;
            _this.totalValores = data.resultado.itens.total_valores;
            _this.dataCaixa = data.resultado.itens.dataCaixa;
            _this.statusCaixaFechado = data.resultado.itens.status_caixa;
        });
    };
    CaixaFinanceiroComponent.prototype.getTotalValores = function () {
        var total = 0;
        this.dataSource.forEach(function (element) {
            total += element.valor;
        });
        return total;
    };
    CaixaFinanceiroComponent.prototype.getTotalDiferenca = function () {
        var total = 0;
        this.dataSource.forEach(function (element) {
            total += element.valor - element.total;
        });
        return total;
    };
    CaixaFinanceiroComponent.prototype.lancarCaixa = function () {
        var _this = this;
        var fcall = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.resultado.mensagem);
            }
            else {
                _this.servapp.mostrarMensagem(r.resultado.mensagem);
            }
        };
        this.crud.post_api('lancarCaixa', fcall, this.dataSource);
    };
    CaixaFinanceiroComponent = __decorate([
        core_1.Component({
            selector: 'app-caixa-financeiro',
            templateUrl: './caixa-financeiro.component.html',
            styleUrls: ['./caixa-financeiro.component.css']
        })
    ], CaixaFinanceiroComponent);
    return CaixaFinanceiroComponent;
}());
exports.CaixaFinanceiroComponent = CaixaFinanceiroComponent;
