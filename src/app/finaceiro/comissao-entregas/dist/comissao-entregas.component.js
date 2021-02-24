"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ComissaoEntregasComponent = void 0;
var adicionar_pagamento_component_1 = require("./adicionar-pagamento/adicionar-pagamento.component");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var operators_1 = require("rxjs/operators");
var ComissaoEntregasComponent = /** @class */ (function () {
    function ComissaoEntregasComponent(dialog, servpedidos, fb, servapp, crud, router) {
        this.dialog = dialog;
        this.servpedidos = servpedidos;
        this.fb = fb;
        this.servapp = servapp;
        this.crud = crud;
        this.router = router;
        this.columnsToDisplay = ['c0', 'c66', 'c1', 'vp', 'valorrec', 'sdd', 'c3', 'c5', 'c6', 'c4'];
        this.total = 0;
        this.totalfp = 0;
        this.totaldindev = 0;
        this.filtroNome = '';
        this.statusProg = false;
        this.statusConsulEntNome = false;
        this.myControl = new forms_1.FormControl();
        this.itensOptions = [];
    }
    ComissaoEntregasComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.filteredOptions = this.myControl.valueChanges.pipe(operators_1.startWith(''), operators_1.map(function (value) { return _this.filter(value); }));
        this.dataSource = [];
        this.form = this.fb.group({
            nome: [''],
            datainicio: [''],
            datafim: ['']
        });
        this.filtroPagos = 'todos-hoje';
        this.consulta();
    };
    ComissaoEntregasComponent.prototype.consulta = function () {
        var _this = this;
        this.statusProg = true;
        var accallback = function () {
            _this.statusProg = false;
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.resultado.mensagem);
            }
            else {
                // this.servapp.mostrarMensagem(r.resultado.mensagem);
                _this.dataSource = r.resultado.itens.itens;
                _this.total = r.resultado.itens.total;
                _this.totalfp = r.resultado.itens.totalfp;
                _this.totaldindev = r.resultado.itens.total_pag_din;
            }
        };
        this.crud.post_api('comissao_entregas', accallback, {
            filtropag: this.filtroPagos, filtroNome: this.form.value.nome, dataInicio: this.form.value.datainicio,
            dataFim: this.form.value.datafim
        });
    };
    ComissaoEntregasComponent.prototype.onClickTodos = function () {
        this.filtroPagos = 'todos';
        this.consulta();
    };
    ComissaoEntregasComponent.prototype.onClickFPagos = function () {
        this.filtroPagos = true;
        this.consulta();
    };
    ComissaoEntregasComponent.prototype.onClickFNPagos = function () {
        this.filtroPagos = false;
        this.consulta();
    };
    ComissaoEntregasComponent.prototype.onClickPagar = function (element) {
        var _this = this;
        var dialogRef = this.dialog.open(adicionar_pagamento_component_1.AdicionarPagamentoComponent, {
            width: '250px',
            data: { item: element }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (dialogRef) {
                _this.consulta();
            }
        });
    };
    ComissaoEntregasComponent.prototype.filter = function (value) {
        var filterValue = value.toLowerCase();
        return this.itensOptions.filter(function (option) { return option.toLowerCase().includes(filterValue); });
    };
    ComissaoEntregasComponent.prototype.consultaMNome = function () {
        var _this = this;
        this.statusProg = true;
        var accallback = function () {
            _this.statusProg = false;
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.resultado.mensagem);
            }
            else {
                // this.servapp.mostrarMensagem(r.resultado.mensagem);
                if (r.resultado) {
                    _this.itensOptions = r.resultado;
                }
            }
        };
        this.crud.post_api('consulta_motoboy_nome', accallback, {});
    };
    ComissaoEntregasComponent.prototype.confirmarDevolucao = function (item) {
        var _this = this;
        this.statusProg = true;
        var accallback = function () {
            _this.statusProg = false;
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.detalhes);
            }
            else {
                _this.servapp.mostrarMensagem(r.detalhes);
                item.status_pag_din = 'pago';
            }
        };
        this.crud.post_api('confirmarDevolucao', accallback, item.id);
    };
    ComissaoEntregasComponent = __decorate([
        core_1.Component({
            selector: 'app-comissao-entregas',
            templateUrl: './comissao-entregas.component.html',
            styleUrls: ['./comissao-entregas.component.css']
        })
    ], ComissaoEntregasComponent);
    return ComissaoEntregasComponent;
}());
exports.ComissaoEntregasComponent = ComissaoEntregasComponent;
