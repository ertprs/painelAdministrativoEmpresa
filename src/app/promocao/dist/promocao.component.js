"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PromocaoComponent = void 0;
var core_1 = require("@angular/core");
var PromocaoComponent = /** @class */ (function () {
    function PromocaoComponent(fb, crud, servico) {
        this.fb = fb;
        this.crud = crud;
        this.servico = servico;
        this.statusBt = false;
        this.statuIN = true;
    }
    PromocaoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            desconto: [0],
            statusPromocao: [false],
            di: ['1993-06-10'],
            df: ['2021-06-10']
        });
        this.form.controls.statusPromocao.valueChanges.subscribe(function (data) {
            _this.statuIN = data;
        });
        this.carregaPromocao();
    };
    PromocaoComponent.prototype.onClickSalvar = function () {
        var _this = this;
        this.statusBt = true;
        // append your data
        var a = function () {
            var r = _this.servico.getRespostaApi();
            if (r.erro) {
                _this.servico.mostrarMensagem(r.detalhes);
                _this.statusBt = false;
            }
            else {
                _this.servico.mostrarMensagem(r.detalhes);
            }
        };
        this.crud.post_api('attPromocao', a, this.form.value, false);
    };
    PromocaoComponent.prototype.carregaPromocao = function () {
        var _this = this;
        this.statusBt = true;
        var a = function () {
            var r = _this.servico.getRespostaApi();
            if (r.erro) {
                _this.statusBt = false;
            }
            else {
                _this.statusBt = false;
                _this.form = _this.fb.group({
                    desconto: [r.resultado.desconto],
                    statusPromocao: [r.resultado.statusPromocao],
                    di: [r.resultado.di],
                    df: [r.resultado.df]
                });
            }
        };
        this.crud.post_api('promocao', a, '', true);
    };
    PromocaoComponent = __decorate([
        core_1.Component({
            selector: 'app-promocao',
            templateUrl: './promocao.component.html',
            styleUrls: ['./promocao.component.css']
        })
    ], PromocaoComponent);
    return PromocaoComponent;
}());
exports.PromocaoComponent = PromocaoComponent;
