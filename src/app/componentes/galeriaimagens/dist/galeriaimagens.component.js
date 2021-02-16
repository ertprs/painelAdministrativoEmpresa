"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GaleriaimagensComponent = void 0;
var core_1 = require("@angular/core");
var GaleriaimagensComponent = /** @class */ (function () {
    function GaleriaimagensComponent(crud, servico, dialog) {
        this.crud = crud;
        this.servico = servico;
        this.dialog = dialog;
        this.itens = [];
        this.imagemSelecionada = false;
        this.mostrarJanela = true;
        this.fcallb = new core_1.EventEmitter();
        this.fechar = new core_1.EventEmitter();
    }
    GaleriaimagensComponent.prototype.ngOnInit = function () {
        this.f5();
    };
    GaleriaimagensComponent.prototype.statusUPIMagem = function (event) {
        console.log('PICA');
        console.log(event);
        if (!event.erro) {
            console.log('consulta galeira');
            this.f5();
        }
    };
    GaleriaimagensComponent.prototype.selecionarImagem = function (element) {
        this.item.imagem = element.url;
        this.fcallb.emit(this.item);
    };
    GaleriaimagensComponent.prototype.ff = function (status) {
        this.fechar.emit(status);
    };
    GaleriaimagensComponent.prototype.f5 = function () {
        var _this = this;
        this.crud.get_api('galeria').subscribe(function (data) {
            _this.itens = data;
        });
    };
    GaleriaimagensComponent.prototype.rmImagem = function (item) {
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
    __decorate([
        core_1.Input()
    ], GaleriaimagensComponent.prototype, "item");
    __decorate([
        core_1.Output()
    ], GaleriaimagensComponent.prototype, "fcallb");
    __decorate([
        core_1.Output()
    ], GaleriaimagensComponent.prototype, "fechar");
    GaleriaimagensComponent = __decorate([
        core_1.Component({
            selector: 'app-galeriaimagens',
            templateUrl: './galeriaimagens.component.html',
            styleUrls: ['./galeriaimagens.component.css']
        })
    ], GaleriaimagensComponent);
    return GaleriaimagensComponent;
}());
exports.GaleriaimagensComponent = GaleriaimagensComponent;
