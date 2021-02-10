"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeComponent = void 0;
var core_1 = require("@angular/core");
var dialog_add_cat_component_1 = require("./dialog-add-cat/dialog-add-cat.component");
var dialog_editar_car_component_1 = require("./dialog-editar-car/dialog-editar-car.component");
var dialog_editar_item_component_1 = require("./dialog-editar-item/dialog-editar-item.component");
var HomeComponent = /** @class */ (function () {
    function HomeComponent(dialog, formBuilder, servico, crud, servicoapp, route) {
        this.dialog = dialog;
        this.formBuilder = formBuilder;
        this.servico = servico;
        this.crud = crud;
        this.servicoapp = servicoapp;
        this.route = route;
        this.statusloader = false;
        this.urlQR = '';
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.consultaCardapio();
        this.servico.consultaModelItem();
        setTimeout(function () { _this.statusloader = true; }, 900);
        this.urlQR = this.servicoapp.getURLCODE();
        console.log(this.urlQR);
    };
    HomeComponent.prototype.setItemRequest = function (item) {
        this.itemRequest = item;
    };
    HomeComponent.prototype.getItemRequest = function () {
        return this.itemRequest;
    };
    HomeComponent.prototype.dialogAddCat = function () {
        this.dialogDelsuc = this.dialog.open(dialog_add_cat_component_1.DialogAddCatComponent, {
            width: '450px'
        });
        this.dialogDelsuc.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
        this.servicoapp.setDialogapp(this.dialogDelsuc);
    };
    HomeComponent.prototype.dialogAddItem = function (categoria) {
        this.servico.setTipoAcao(false);
        this.servico.setCategoria(categoria);
        this.route.navigate(['painel/configitem']);
        /*
        this.dialogDelsuc = this.dialog.open(DialogAddItemComponent, {
          width: '550px',
        });
    
        this.dialogDelsuc.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
        });
    
        this.servico.setCategoria(categoria);
        this.servicoapp.setDialogapp(this.dialogDelsuc);
        */
    };
    HomeComponent.prototype.dialogEditarCar = function (categoria) {
        this.dialogDelsuc = this.dialog.open(dialog_editar_car_component_1.DialogEditarCarComponent, {
            width: '550px'
        });
        this.dialogDelsuc.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
        this.servico.setCategoria(categoria);
        this.servicoapp.setDialogapp(this.dialogDelsuc);
    };
    HomeComponent.prototype.dialogEditarItem = function (item, categoria) {
        this.servico.setItem(item);
        this.dialogDelsuc = this.dialog.open(dialog_editar_item_component_1.DialogEditarItemComponent, {
            width: '550px'
        });
        this.dialogDelsuc.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
        this.servico.setCategoria(categoria);
        this.servicoapp.setDialogapp(this.dialogDelsuc);
    };
    HomeComponent.prototype.consultaCardapio = function () {
        this.servico.consultaCardapio();
    };
    HomeComponent.prototype.removerCat = function (categoria) {
        var _this = this;
        var accallback = function () {
            var r = _this.servicoapp.getRespostaApi();
            if (r.erro === true) {
                _this.servicoapp.mostrarMensagem(r.mensagem);
            }
            else {
                _this.servicoapp.mostrarMensagem(r.mensagem);
                _this.servico.consultaCardapio();
            }
        };
        this.crud.post_api('cardapio&acmenu=removerCategoria', accallback, categoria, true);
    };
    HomeComponent.prototype.removerItem = function (item) {
        var _this = this;
        var accallback = function () {
            var r = _this.servicoapp.getRespostaApi();
            if (r.erro === true) {
                _this.servicoapp.mostrarMensagem(r.mensagem);
            }
            else {
                _this.servicoapp.mostrarMensagem(r.mensagem);
                _this.servico.consultaCardapio();
            }
        };
        this.crud.post_api('cardapio&acmenu=removerItem', accallback, item, true);
    };
    HomeComponent.prototype.onClickConfigurarItem = function (item, categoria) {
        this.servico.setItem(item);
        this.servico.setTipoAcao(true);
        this.servico.setCategoria(categoria);
        this.route.navigate(['painel/configitem']);
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        })
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
