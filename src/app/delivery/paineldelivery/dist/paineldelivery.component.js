"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PaineldeliveryComponent = void 0;
var core_1 = require("@angular/core");
var PaineldeliveryComponent = /** @class */ (function () {
    function PaineldeliveryComponent(servapp, us) {
        this.servapp = servapp;
        this.us = us;
        this.btCardapio = true;
        this.btItemCardapio = true;
        this.btCatAdc = true;
        this.btItemAdc = true;
        this.btAvaliacoes = true;
        this.btConfigPainel = true;
        this.btFunDelivery = true;
        this.btPerfil = true;
        this.btrelato = true;
        this.btDataret = true;
        this.btOrg = true;
        this.btUsuariosAdm = true;
        this.btCidade = true;
        this.btBairro = true;
        this.btGaleria = true;
        this.btEntregador = true;
        this.btFp = true;
        this.btBancos = true;
        this.btUsuApp = true;
        this.btCupom = true;
        this.btNot = true;
        this.btPagOnline = true;
        this.btConfigMaster = true;
    }
    PaineldeliveryComponent.prototype.ngOnInit = function () {
        this.btConfigMaster = this.us.getPermissoessuario()[10].status;
        this.btCardapio = this.us.getPermissoessuario()[9].children[0].status;
        this.btItemCardapio = this.us.getPermissoessuario()[9].children[1].status;
        this.btCatAdc = this.us.getPermissoessuario()[9].children[2].status;
        this.btItemAdc = this.us.getPermissoessuario()[9].children[3].status;
        this.btAvaliacoes = this.us.getPermissoessuario()[9].children[4].status;
        this.btConfigPainel = this.us.getPermissoessuario()[9].children[12].status;
        this.btFunDelivery = this.us.getPermissoessuario()[9].children[5].status;
        this.btPerfil = this.us.getPermissoessuario()[9].children[11].status;
        this.btrelato = this.us.getPermissoessuario()[9].children[6].status;
        this.btDataret = this.us.getPermissoessuario()[9].children[7].status;
        this.btOrg = this.us.getPermissoessuario()[9].children[8].status;
        this.btUsuariosAdm = this.us.getPermissoessuario()[9].children[13].status;
        this.btCidade = this.us.getPermissoessuario()[10].children[0].status;
        this.btBairro = this.us.getPermissoessuario()[10].children[1].status;
        this.btGaleria = this.us.getPermissoessuario()[10].children[2].status;
        this.btEntregador = this.us.getPermissoessuario()[10].children[3].status;
        this.btFp = this.us.getPermissoessuario()[10].children[4].status;
        this.btBancos = this.us.getPermissoessuario()[10].children[6].status;
        this.btUsuApp = this.us.getPermissoessuario()[10].children[7].status;
        this.btCupom = this.us.getPermissoessuario()[10].children[9].status;
        this.btNot = this.us.getPermissoessuario()[10].children[10].status;
        this.btPagOnline = this.us.getPermissoessuario()[10].children[10].status;
    };
    PaineldeliveryComponent = __decorate([
        core_1.Component({
            selector: 'app-paineldelivery',
            templateUrl: './paineldelivery.component.html',
            styleUrls: ['./paineldelivery.component.css']
        })
    ], PaineldeliveryComponent);
    return PaineldeliveryComponent;
}());
exports.PaineldeliveryComponent = PaineldeliveryComponent;
