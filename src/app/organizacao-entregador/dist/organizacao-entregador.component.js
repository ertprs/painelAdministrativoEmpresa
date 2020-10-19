"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.OrganizacaoEntregadorComponent = void 0;
var form_organizacao_component_1 = require("./form-organizacao/form-organizacao.component");
var core_1 = require("@angular/core");
var OrganizacaoEntregadorComponent = /** @class */ (function () {
    function OrganizacaoEntregadorComponent(servico, crud, dialog, us) {
        this.servico = servico;
        this.crud = crud;
        this.dialog = dialog;
        this.us = us;
        this.title = 'ng-calendar-demo';
        this.btRem = true;
        this.btAdd = true;
        this.myDateFilter = function (d) {
            console.log('myDateFilter');
            var day = d.getDay();
            // Prevent Saturday and Sunday from being selected.
            return day !== 0 && day !== 6;
        };
    }
    OrganizacaoEntregadorComponent.prototype.ngOnInit = function () {
        this.btAdd = this.us.getPermissoessuario()[9].children[9].status;
        this.btRem = this.us.getPermissoessuario()[9].children[10].status;
        this.f1();
    };
    OrganizacaoEntregadorComponent.prototype.f1 = function () {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) { /* this.servico.mostrarMensagem(r.resultado.mensagem); */ }
            else {
                if (r.resultado) {
                    _this.itens = r.resultado.itens.lista;
                    _this.iniciaCalendario(r.resultado.itens.data);
                }
            }
        };
        this.crud.post_api('consultaOrgEnt', accallback, { nome: '' });
    };
    OrganizacaoEntregadorComponent.prototype.f2 = function (f) {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) { /* this.servico.mostrarMensagem(r.resultado.mensagem); */ }
            else {
                if (r.resultado) {
                    _this.itens = r.resultado.itens.lista;
                    _this.delsucData = r.resultado.itens.info;
                }
            }
        };
        this.crud.post_api('consultaOrgEnt', accallback, { filtro: f });
    };
    OrganizacaoEntregadorComponent.prototype.iniciaCalendario = function (data) {
        this.title = 'ng-calendar-demo';
        this.selectedDate = data;
        // this.startAt = new Date('2019/09/11');
        // this.minDate = new Date('2019/09/14');
        // this.maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
        this.year = '';
        this.DayAndDate = '';
    };
    OrganizacaoEntregadorComponent.prototype.onSelect = function (event) {
        console.log(event);
        this.selectedDate = event;
        var dateString = event.toDateString();
        var dateValue = dateString.split(' ');
        this.year = dateValue[3];
        this.DayAndDate = dateValue[0] + ',' + ' ' + dateValue[1] + ' ' + dateValue[2];
        console.log(this.DayAndDate);
        this.f2(this.DayAndDate);
    };
    OrganizacaoEntregadorComponent.prototype.addEvento = function () {
        var _this = this;
        var dialogRef = this.dialog.open(form_organizacao_component_1.FormOrganizacaoComponent, {
            width: '450px',
            data: this.delsucData
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            if (result) {
                _this.f2(_this.delsucData);
            }
        });
    };
    OrganizacaoEntregadorComponent.prototype.removerItem = function (item) {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) { /* this.servico.mostrarMensagem(r.resultado.mensagem); */ }
            else {
                _this.servico.mostrarMensagem(r.resultado.mensagem);
                if (r.resultado) {
                    _this.f1();
                }
            }
        };
        this.crud.post_api('remOrgEnt', accallback, item.id);
    };
    OrganizacaoEntregadorComponent = __decorate([
        core_1.Component({
            selector: 'app-organizacao-entregador',
            templateUrl: './organizacao-entregador.component.html',
            styleUrls: ['./organizacao-entregador.component.css']
        })
    ], OrganizacaoEntregadorComponent);
    return OrganizacaoEntregadorComponent;
}());
exports.OrganizacaoEntregadorComponent = OrganizacaoEntregadorComponent;
