"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DialogCategoriaAdicionalComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DialogCategoriaAdicionalComponent = /** @class */ (function () {
    function DialogCategoriaAdicionalComponent(formBuilder, servapp, crud, servDCadc, servcatadc) {
        this.formBuilder = formBuilder;
        this.servapp = servapp;
        this.crud = crud;
        this.servDCadc = servDCadc;
        this.servcatadc = servcatadc;
        this.autoTicks = true;
        this.disabled = false;
        this.invert = false;
        this.max = 100;
        this.min = 0;
        this.showTicks = true;
        this.step = 1;
        this.thumbLabel = true;
        this.quantidade = 1;
        this.vertical = false;
        this.tickInterval = 0;
    }
    DialogCategoriaAdicionalComponent.prototype.ngOnInit = function () {
        this.iniciaForm();
    };
    DialogCategoriaAdicionalComponent.prototype.onClickAdd = function (disponivel, quantidade) {
        var _this = this;
        this.formCadastro.value.disponivel = disponivel;
        this.formCadastro.value.maxsele = quantidade;
        console.log(this.formCadastro.value);
        this.btstatus = true;
        var callbfun = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.mensagem);
                _this.btstatus = false;
            }
            else {
                _this.btstatus = false;
                _this.servcatadc.setCategoriasAdicional(r.lista);
                _this.formCadastro.controls.nome.setValue('');
                _this.formCadastro.controls.descricao.setValue('');
            }
        };
        console.log(this.crud.post_api('cadastro_categoria_adicional', callbfun, this.formCadastro.value));
    };
    DialogCategoriaAdicionalComponent.prototype.onSalvarItem = function (disponivel, quantidade) {
        var _this = this;
        this.formCadastro.value.disponivel = disponivel;
        this.formCadastro.value.maxsele = quantidade;
        console.log(this.formCadastro.value);
        this.btstatus = true;
        var callbfun = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.detalhes);
                _this.btstatus = false;
            }
            else {
                _this.btstatus = false;
                _this.servcatadc.setCategoriasAdicional(r.lista);
                _this.servapp.mostrarMensagem(r.detalhes);
            }
        };
        this.crud.post_api('editar_cat_adc', callbfun, this.formCadastro.value);
    };
    DialogCategoriaAdicionalComponent.prototype.iniciaForm = function () {
        // se true == editar
        if (this.servDCadc.getTipoacao()) {
            this.quantidade = this.servDCadc.getCategoriaAdicional().maxsele;
            this.disponivel = this.servDCadc.getCategoriaAdicional().disponivel;
            this.formCadastro = this.formBuilder.group({
                id_empresa: [this.servapp.getDadosEmpresa().id],
                id_categoria: [this.servDCadc.getCategoriaAdicional().id],
                nome: [this.servDCadc.getCategoriaAdicional().nome, forms_1.Validators.required],
                descricao: [this.servDCadc.getCategoriaAdicional().descricao],
                disponivel: [this.servDCadc.getCategoriaAdicional().disponivel],
                maxsele: [this.servDCadc.getCategoriaAdicional().maxsele]
            });
            return;
        }
        this.disponivel = false;
        this.formCadastro = this.formBuilder.group({
            id_empresa: [this.servapp.getDadosEmpresa().id],
            nome: [null, forms_1.Validators.required],
            descricao: [''],
            disponivel: [null],
            maxsele: [null]
        });
    };
    DialogCategoriaAdicionalComponent.prototype.getSliderTickInterval = function () {
        if (this.showTicks) {
            return this.autoTicks ? 'auto' : this.tickInterval;
        }
        return 0;
    };
    DialogCategoriaAdicionalComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-categoria-adicional',
            templateUrl: './dialog-categoria-adicional.component.html',
            styleUrls: ['./dialog-categoria-adicional.component.css']
        })
    ], DialogCategoriaAdicionalComponent);
    return DialogCategoriaAdicionalComponent;
}());
exports.DialogCategoriaAdicionalComponent = DialogCategoriaAdicionalComponent;
