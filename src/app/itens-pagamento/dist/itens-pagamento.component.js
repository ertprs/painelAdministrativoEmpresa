"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ItensPagamentoComponent = void 0;
var form_item_pagamento_component_1 = require("./form-item-pagamento/form-item-pagamento.component");
var core_1 = require("@angular/core");
var ItensPagamentoComponent = /** @class */ (function () {
    function ItensPagamentoComponent(crud, servico, dialog) {
        this.crud = crud;
        this.servico = servico;
        this.dialog = dialog;
        this.displayedColumns = ['c00', 'c0', 'c2', 'c1', 'c4'];
        this.itens = [];
    }
    ItensPagamentoComponent.prototype.ngOnInit = function () {
        this.f5();
    };
    ItensPagamentoComponent.prototype.f5 = function () {
        var _this = this;
        this.crud.get_api('itens_pagamento').subscribe(function (data) {
            console.log(data);
            _this.itens = data.resultado;
        });
    };
    ItensPagamentoComponent.prototype.add = function () {
        var _this = this;
        var dialogRef = this.dialog.open(form_item_pagamento_component_1.FormItemPagamentoComponent, {
            width: '450px',
            data: { tipo: 'add', nomeDialog: 'itens_formaspagamento' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            _this.f5();
        });
    };
    ItensPagamentoComponent.prototype.onClickEditar = function (i) {
        var _this = this;
        var dialogRef = this.dialog.open(form_item_pagamento_component_1.FormItemPagamentoComponent, {
            width: '450px',
            data: { tipo: 'editar', nomeDialog: 'itens_formaspagamento', item: i }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                _this.f5();
            }
        });
    };
    ItensPagamentoComponent.prototype.removerItem = function (item) {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.mensagem);
            }
            else {
                _this.servico.mostrarMensagem('Item removido');
                _this.f5();
            }
        };
        this.crud.post_api('removerItenFormaspagamento', accallback, item);
    };
    ItensPagamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-itens-pagamento',
            templateUrl: './itens-pagamento.component.html',
            styleUrls: ['./itens-pagamento.component.css']
        })
    ], ItensPagamentoComponent);
    return ItensPagamentoComponent;
}());
exports.ItensPagamentoComponent = ItensPagamentoComponent;
