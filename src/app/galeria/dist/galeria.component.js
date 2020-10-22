"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GaleriaComponent = void 0;
var core_1 = require("@angular/core");
var GaleriaComponent = /** @class */ (function () {
    function GaleriaComponent(crud, servico, dialog) {
        this.crud = crud;
        this.servico = servico;
        this.dialog = dialog;
        this.displayedColumns = ['c1', 'c2', 'c3', 'c4'];
        this.itens = [];
    }
    GaleriaComponent.prototype.ngOnInit = function () {
        this.f5();
    };
    GaleriaComponent.prototype.f5 = function () {
        var _this = this;
        this.crud.get_api('galeria').subscribe(function (data) {
            console.log(data);
            _this.itens = data;
        });
    };
    GaleriaComponent.prototype.rmImagem = function (item) {
        var _this = this;
        var cback = function () {
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.mensagem);
            }
            else {
                _this.f5();
                _this.servico.mostrarMensagem(r.mensagem);
            }
        };
        this.crud.post_api('remover_img_galeria', cback, item);
    };
    GaleriaComponent = __decorate([
        core_1.Component({
            selector: 'app-galeria',
            templateUrl: './galeria.component.html',
            styleUrls: ['./galeria.component.css']
        })
    ], GaleriaComponent);
    return GaleriaComponent;
}());
exports.GaleriaComponent = GaleriaComponent;
