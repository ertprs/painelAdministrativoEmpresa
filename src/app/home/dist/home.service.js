"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeService = void 0;
var core_1 = require("@angular/core");
var HomeService = /** @class */ (function () {
    function HomeService(crud) {
        this.crud = crud;
        this.statusloaderpage = false;
    }
    HomeService.prototype.setCategoria = function (cat) { this.categoria = cat; };
    HomeService.prototype.getCategoria = function () { return this.categoria; };
    HomeService.prototype.setItem = function (itemin) { this.item = itemin; };
    HomeService.prototype.getItem = function () { return this.item; };
    HomeService.prototype.setCardapio = function (arrayCard) { this.cardapio = arrayCard; };
    HomeService.prototype.getCardapio = function () { return this.cardapio; };
    HomeService.prototype.consultaCardapio = function () {
        var _this = this;
        console.log('#consultaMotoboys');
        this.crud.get_api('cardapio&acmenu=listar').subscribe(function (data) {
            console.log(data);
            _this.cardapio = data.catalogo;
            _this.consultaModelItem();
        });
    };
    HomeService.prototype.consultaModelItem = function () {
        var _this = this;
        console.log('#get_model_item');
        this.crud.get_api('get_model_item').subscribe(function (data) {
            console.log(data.nome);
            _this.modelitem = data;
            _this.statusloaderpage = true;
        });
    };
    HomeService.prototype.getItemModel = function () {
        return this.modelitem;
    };
    HomeService.prototype.getstatusLoaderpage = function () {
        return this.statusloaderpage;
    };
    HomeService.prototype.setTipoAcao = function (acao) { this.acao = acao; };
    HomeService.prototype.getTipoAcao = function () { return this.acao; };
    HomeService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], HomeService);
    return HomeService;
}());
exports.HomeService = HomeService;
