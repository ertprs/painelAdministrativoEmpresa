"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DialogAddItemAdicionalComponent = void 0;
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var DialogAddItemAdicionalComponent = /** @class */ (function () {
    function DialogAddItemAdicionalComponent(servcadc, formBuilder, servapp, crud, itensServ) {
        this.servcadc = servcadc;
        this.formBuilder = formBuilder;
        this.servapp = servapp;
        this.crud = crud;
        this.itensServ = itensServ;
    }
    DialogAddItemAdicionalComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categoriaLista = this.servcadc.getCategoriasAdicional();
        console.log(this.categoriaLista);
        this.tipoacao = this.itensServ.getTipoacao();
        if (this.itensServ.getTipoacao()) {
            this.form = this.formBuilder.group({
                id_empresa: [this.servapp.getDadosEmpresa().id],
                nome: [''],
                disponivel: [false],
                categoria: [''],
                preco: ['']
            });
        }
        else {
            // editar item
            console.log(this.itensServ.getItemAdicional().categoria);
            this.categoriasItem = this.itensServ.getItemAdicional().categoria;
            this.form = this.formBuilder.group({
                id_empresa: [this.servapp.getDadosEmpresa().id],
                id: [this.itensServ.getItemAdicional().id],
                nome: [this.itensServ.getItemAdicional().nome],
                disponivel: [this.itensServ.getItemAdicional().disponivel],
                categoria: [''],
                preco: [this.itensServ.getItemAdicional().preco]
            });
            // async orders
            (this.itensServ.getItemAdicional().categoria).subscribe(function (orders) {
                _this.categoriaLista = orders;
                _this.form.controls.categoria.patchValue(_this.categoriaLista[0]);
            });
        }
    };
    DialogAddItemAdicionalComponent.prototype.onClickDis = function (evento, item) {
        console.log(evento);
        console.log(item);
        if (item.value.disponivel) {
            item.value.disponivel = false;
        }
        else {
            item.value.disponivel = true;
        }
    };
    DialogAddItemAdicionalComponent.prototype.buildCategoriasAdicionais = function (itens) {
        var valores;
        if (this.itensServ.getTipoacao()) {
            valores = itens.map(function (v) { return new forms_1.FormControl(false); });
        }
        else {
            valores = itens.map(function (v) { return new forms_1.FormControl(v); });
        }
        return this.formBuilder.array(valores);
    };
    DialogAddItemAdicionalComponent.prototype.onClickItemSelect = function (evento) {
        console.log(evento);
    };
    DialogAddItemAdicionalComponent.prototype.onSalvarItem = function () {
        var _this = this;
        console.log(this.form.value);
        this.btstatus = true;
        var callbfun = function () {
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.detalhes);
                _this.btstatus = false;
            }
            else {
                _this.btstatus = false;
                _this.itensServ.consultaAdicionais();
                _this.servapp.mostrarMensagem(r.detalhes);
                // this.form.controls.nome.setValue('');
                // this.form.controls.preco.setValue('');
            }
        };
        this.crud.post_api('editar_item_adc', callbfun, this.form.value);
    };
    DialogAddItemAdicionalComponent.prototype.onClickAdd = function () {
        var _this = this;
        console.log(this.form.value);
        this.btstatus = true;
        var callbfun = function () {
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.mensagem);
                _this.btstatus = false;
            }
            else {
                _this.servapp.mostrarMensagem(r.detalhes);
                _this.btstatus = false;
                _this.itensServ.setItensAdicional(r.lista);
                _this.form.controls.nome.setValue('');
                _this.form.controls.preco.setValue('');
            }
        };
        this.crud.post_api('add_adicional', callbfun, this.form.value);
    };
    DialogAddItemAdicionalComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-add-item-adicional',
            templateUrl: './dialog-add-item-adicional.component.html',
            styleUrls: ['./dialog-add-item-adicional.component.css']
        })
    ], DialogAddItemAdicionalComponent);
    return DialogAddItemAdicionalComponent;
}());
exports.DialogAddItemAdicionalComponent = DialogAddItemAdicionalComponent;
