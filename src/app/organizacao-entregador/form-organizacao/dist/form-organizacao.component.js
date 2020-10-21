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
exports.FormOrganizacaoComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var FormOrganizacaoComponent = /** @class */ (function () {
    function FormOrganizacaoComponent(fb, dialogRef, data, servico, crud) {
        this.fb = fb;
        this.dialogRef = dialogRef;
        this.data = data;
        this.servico = servico;
        this.crud = crud;
    }
    FormOrganizacaoComponent.prototype.ngOnInit = function () {
        this.form = this.fb.group({
            data: [this.data],
            entregador: [''],
            horai: [''],
            horaf: [''],
            descricao: ['']
        });
        this.consultaEntregagores();
    };
    FormOrganizacaoComponent.prototype.consultaEntregagores = function () {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.resultado.mensagem);
            }
            else {
                /*this.servico.mostrarMensagem(r.resultado.mensagem);*/
                if (r.resultado) {
                    _this.entregadores = r.resultado;
                }
            }
        };
        this.crud.post_api('consulta_ent_lista_emp', accallback, '');
    };
    FormOrganizacaoComponent.prototype.confirmar = function () {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.resultado.mensagem);
            }
            else {
                _this.servico.mostrarMensagem(r.resultado.mensagem);
                if (r.resultado) {
                    _this.dialogRef.close(true);
                }
            }
        };
        this.crud.post_api('addOrgEnt', accallback, this.form.value);
    };
    FormOrganizacaoComponent = __decorate([
        core_1.Component({
            selector: 'app-form-organizacao',
            templateUrl: './form-organizacao.component.html',
            styleUrls: ['./form-organizacao.component.css']
        }),
        __param(2, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], FormOrganizacaoComponent);
    return FormOrganizacaoComponent;
}());
exports.FormOrganizacaoComponent = FormOrganizacaoComponent;
