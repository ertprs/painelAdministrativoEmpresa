"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CrudServicoService = void 0;
var core_1 = require("@angular/core");
var CrudServicoService = /** @class */ (function () {
    function CrudServicoService(http, servico) {
        this.http = http;
        this.servico = servico;
    }
    CrudServicoService.prototype.pegaHost = function () {
        return this.http.get('./assets/config/configuracoes.json');
    };
    CrudServicoService.prototype.get_api = function (acao) {
        return this.http.get(this.servico.getApiAcao(acao));
    };
    CrudServicoService.prototype.post_api = function (acao, acaoCallBack, param) {
        var _this = this;
        return $.post(this.servico.getApiAcao(acao), { obj: param }, function (data, status) {
            console.log(data);
            _this.servico.setRespostaApi(JSON.parse(data));
            //this.servico.setRespostaApi(data);
            acaoCallBack();
        });
    };
    CrudServicoService.prototype.consultaSistema = function () {
        var _this = this;
        this.cc();
        setInterval(function () {
            _this.cc();
        }, 5000);
    };
    CrudServicoService.prototype.cc = function () {
        var _this = this;
        this.http.get(this.servico.getApiAcao('consulta_entregador_on')).subscribe(function (data) {
            _this.resp = data;
            // console.log(this.resp);
            _this.servico.setListaNotificacoes(_this.resp.api.notificacoes.lista);
            _this.servico.setListaEntregador(_this.resp.api.entregador);
            _this.servico.setListaEntregas(_this.resp.api.entregas.lista);
            _this.servico.setQntEntOn(_this.resp.api.quantidade_entregador_online);
            _this.servico.setListaNotificacoes(_this.resp.api.notificacoes.lista);
        }, function (error) { console.log('Erro'); });
    };
    CrudServicoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CrudServicoService);
    return CrudServicoService;
}());
exports.CrudServicoService = CrudServicoService;
