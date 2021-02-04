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
exports.FormItemPagamentoComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var FormItemPagamentoComponent = /** @class */ (function () {
    function FormItemPagamentoComponent(dialogRef, data, fb, crud, upImg, servico) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.fb = fb;
        this.crud = crud;
        this.upImg = upImg;
        this.servico = servico;
    }
    FormItemPagamentoComponent.prototype.ngOnInit = function () {
        if (this.data.tipo === 'add') {
            this.acao = 'addItensFormaspagamento';
            this.form = this.fb.group({
                id_formapagamento: [null],
                imagem: [this.upImg.getImagem()],
                nome: [null],
                status: [null]
            });
        }
        else {
            this.acao = 'attItenFormaspagamento';
            console.log('Form editar');
            this.form = this.fb.group({
                id: [this.data.item.id],
                id_formapagamento: [this.data.item.id_formapagamento],
                imagem: [this.data.item.imagem],
                nome: [this.data.item.nome],
                status: [this.data.item.status]
            });
        }
        this.f5();
    };
    FormItemPagamentoComponent.prototype.f5 = function () {
        var _this = this;
        this.crud.get_api('formas_pag').subscribe(function (data) {
            _this.formaspagamento = data;
        });
    };
    FormItemPagamentoComponent.prototype.salvar = function () {
        var _this = this;
        if (this.upImg.getImagem()) {
            this.form.controls.imagem.setValue(this.upImg.getImagem());
        }
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.mensagem);
            }
            else {
                _this.servico.mostrarMensagem(r.mensagem);
                _this.upImg.limpaDadosServivoImagem();
                _this.dialogRef.close(true);
            }
            console.log(r);
        };
        this.crud.post_api(this.acao, accallback, this.form.value);
    };
    FormItemPagamentoComponent = __decorate([
        core_1.Component({
            selector: 'app-form-item-pagamento',
            templateUrl: './form-item-pagamento.component.html',
            styleUrls: ['./form-item-pagamento.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], FormItemPagamentoComponent);
    return FormItemPagamentoComponent;
}());
exports.FormItemPagamentoComponent = FormItemPagamentoComponent;
