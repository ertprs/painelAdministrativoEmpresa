"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BtExportarComponent = void 0;
var core_1 = require("@angular/core");
var BtExportarComponent = /** @class */ (function () {
    function BtExportarComponent(servico, crud) {
        this.servico = servico;
        this.crud = crud;
    }
    BtExportarComponent.prototype.ngOnInit = function () {
        console.log('app-bt-exportar');
    };
    BtExportarComponent.prototype.exportar = function () {
        var _this = this;
        var fcall = function () {
            var r = _this.servico.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.resultado.mensagem);
            }
            else {
                _this.servico.mostrarMensagem(r.resultado.mensagem);
            }
        };
        this.crud.post_api(this.acao, fcall, this.lista);
    };
    __decorate([
        core_1.Input()
    ], BtExportarComponent.prototype, "lista");
    __decorate([
        core_1.Input()
    ], BtExportarComponent.prototype, "acao");
    BtExportarComponent = __decorate([
        core_1.Component({
            selector: 'app-bt-exportar',
            templateUrl: './bt-exportar.component.html',
            styleUrls: ['./bt-exportar.component.css']
        })
    ], BtExportarComponent);
    return BtExportarComponent;
}());
exports.BtExportarComponent = BtExportarComponent;
