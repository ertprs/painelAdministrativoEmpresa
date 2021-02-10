"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.TelaDoisComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var TelaDoisComponent = /** @class */ (function () {
    function TelaDoisComponent(dialogRef, data, fb, crud, servapp) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.fb = fb;
        this.crud = crud;
        this.servapp = servapp;
        this.statusBT = false;
    }
    TelaDoisComponent.prototype.ngOnInit = function () {
        this.f5();
        this.form = this.fb.group({
            produto: [''],
            quantidade: [''],
            precoCompra: [''],
            tipoEntrada: ['']
        });
        console.log(this.data);
    };
    TelaDoisComponent.prototype.prosseguir = function () {
        this.f1(this.data);
    };
    TelaDoisComponent.prototype.f1 = function (form) {
        var _this = this;
        this.statusBT = true;
        var accallback = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.mensagem);
                _this.statusBT = false;
            }
            else {
                _this.servapp.mostrarMensagem(r.mensagem);
                _this.dialogRef.close(_this.form.value);
            }
            console.log(r);
        };
        this.crud.post_api('addItemLogistica', accallback, this.data);
    };
    TelaDoisComponent.prototype.f5 = function () {
        var _this = this;
        this.crud.get_api('itens_cardapio&tipo=estoque').subscribe(function (data) {
            console.log(data);
            _this.itensCatalogo = data.resultado;
        });
    };
    TelaDoisComponent.prototype.addItem = function () {
        if (!this.form.value.produto) {
            this.servapp.mostrarMensagem('Selecione o produto');
            return;
        }
        if (!this.form.value.quantidade) {
            this.servapp.mostrarMensagem('Informe a quantidade');
            return;
        }
        if (!this.form.value.precoCompra) {
            this.servapp.mostrarMensagem('Informe o preço de compra');
            return;
        }
        if (!this.form.value.tipoEntrada) {
            this.servapp.mostrarMensagem('Selecione o tipo de entrada');
            return;
        }
        this.data.itens.push(this.form.value);
        console.log(this.data);
        this.form.reset();
    };
    TelaDoisComponent.prototype.removeItemFp = function (item) {
        var indeArray;
        for (var x in this.data.itens) {
            if (this.data.itens[x] === item) {
                indeArray = x;
            }
        }
        this.data.itens.splice(indeArray, 1);
    };
    TelaDoisComponent = __decorate([
        core_1.Component({
            selector: 'app-tela-dois',
            templateUrl: './tela-dois.component.html',
            styleUrls: ['./tela-dois.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], TelaDoisComponent);
    return TelaDoisComponent;
}());
exports.TelaDoisComponent = TelaDoisComponent;
