"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListaMotoboysComponent = void 0;
var core_1 = require("@angular/core");
var dialog_dinam_component_1 = require("src/app/dialog-dinam/dialog-dinam.component");
var ListaMotoboysComponent = /** @class */ (function () {
    function ListaMotoboysComponent(dialog, servpedidos, formBuilder, servapp, crud, router, servestm) {
        this.dialog = dialog;
        this.servpedidos = servpedidos;
        this.formBuilder = formBuilder;
        this.servapp = servapp;
        this.crud = crud;
        this.router = router;
        this.servestm = servestm;
        this.columnsToDisplay = ['motoboy'];
        this.dataSource = [];
        this.sst = false;
    }
    ListaMotoboysComponent.prototype.ngOnInit = function () {
        this.estoque();
    };
    ListaMotoboysComponent.prototype.estoque = function () {
        var _this = this;
        this.crud.get_api('consulta_ent_lista_emp').subscribe(function (data) {
            _this.dataSource = data.resultado;
        });
    };
    ListaMotoboysComponent.prototype.add = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_dinam_component_1.DialogDinamComponent, {
            width: '450px',
            data: { tipo: 'add', nomeDialog: 'form_estoque' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                _this.f1(result);
            }
        });
    };
    ListaMotoboysComponent.prototype.enviar = function (element) {
        var _this = this;
        element.id = element.id_estoque;
        var dialogRef = this.dialog.open(dialog_dinam_component_1.DialogDinamComponent, {
            width: '450px',
            data: { tipo: 'editar', nomeDialog: 'form_estoque_enviar', item: element }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                _this.f1(result);
            }
        });
    };
    ListaMotoboysComponent.prototype.retirar = function (element) {
        var _this = this;
        element.id = element.id;
        var dialogRef = this.dialog.open(dialog_dinam_component_1.DialogDinamComponent, {
            width: '450px',
            data: { tipo: 'editar', nomeDialog: 'form_estoque_enviar', item: element }
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
                _this.crud.post_api('subEstoque', accallback, result);
            }
        });
    };
    ListaMotoboysComponent.prototype.f1 = function (form) {
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
        this.crud.post_api('enviaEstoque', accallback, form);
    };
    ListaMotoboysComponent.prototype.removerEstoqueMotoboy = function (element) {
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
        this.crud.post_api('remover_estoque_motoboy', accallback, { id: element.id });
    };
    ListaMotoboysComponent.prototype.estoqueMotoboy = function (element) {
        var _this = this;
        this.servestm.setMotoboySelecionado(element);
        this.crud.get_api('estoque_motoboy&id=' + element.id).subscribe(function (data) {
            _this.servestm.setListaMotoboys(data);
        });
    };
    ListaMotoboysComponent = __decorate([
        core_1.Component({
            selector: 'app-lista-motoboys',
            templateUrl: './lista-motoboys.component.html',
            styleUrls: ['./lista-motoboys.component.css']
        })
    ], ListaMotoboysComponent);
    return ListaMotoboysComponent;
}());
exports.ListaMotoboysComponent = ListaMotoboysComponent;
