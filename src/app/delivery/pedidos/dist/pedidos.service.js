"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PedidosService = void 0;
var core_1 = require("@angular/core");
var lodash_1 = require("lodash");
var PedidosService = /** @class */ (function () {
    function PedidosService(crud, servapp) {
        var _this = this;
        this.crud = crud;
        this.servapp = servapp;
        this.audio1 = new Audio(this.servapp.urlAudio);
        this.statusloadpedidos = false;
        this.qntPedidosEmaberto = 0;
        this.statusNotificar = false;
        this.statusBtSm = false;
        setInterval(function () {
            if (_this.servapp.getDadosEmpresa().status_delivery) {
                _this.consultaPedidos();
            }
        }, this.servapp.getInterPedidos());
    }
    PedidosService.prototype.getTotalPedido = function () {
        return parseFloat(this.pedido.total);
    };
    PedidosService.prototype.getTaxaExtra = function () {
        return parseFloat(this.pedido.taxaextra);
    };
    PedidosService.prototype.consultaPedidos = function () {
        var _this = this;
        this.statusloadpedidos = true;
        // console.log('#consultaPEDIDOS');
        this.crud.get_api('pedidos&id=' + this.servapp.getDadosEmpresa().id).subscribe(function (data) {
            _this.qntPedidosEmaberto = data.resultado.pedidos.qnt_pedidos_pendente;
            _this.statusloadpedidos = false;
            // this.servapp.setStatusDelivery(data.status_loja.status_empresa);
            if (lodash_1.isEqual(_this.pedidos, data.resultado.pedidos.lista_pedidos) === false) {
                _this.pedidos = data.resultado.pedidos.lista_pedidos;
            }
            _this.statusNotificar = data.resultado.pedidos.notificar;
            if (_this.statusNotificar === true) {
                _this.playAudio1();
            }
            _this.servapp.setListaEntregas(data.resultado.entregas);
        });
    };
    PedidosService.prototype.consultaTodosPedidos = function (filtro) {
        var _this = this;
        console.log(filtro);
        this.statusloadpedidos = true;
        console.log('#consultaTodosPedidos');
        this.crud.get_api('consulta_todos_pedidos&id=' + this.servapp.getDadosEmpresa().id +
            '&datai=' + filtro.datai +
            '&dataf=' + filtro.dataf).subscribe(function (data) {
            console.log(data);
            _this.qntPedidosEmaberto = data.resultado.pedidos.qnt_pedidos_pendente;
            _this.statusloadpedidos = false;
            // if (isEqual(this.pedidos, data.lista_pedidos) === false) {
            _this.todospedidos = data.resultado.pedidos.lista_pedidos;
            // }
            _this.statusNotificar = data.notificar;
        });
    };
    PedidosService.prototype.getQntPedidoAberto = function () {
        return this.qntPedidosEmaberto;
    };
    PedidosService.prototype.getStatusNotificar = function () {
        return this.qntPedidosEmaberto;
    };
    PedidosService.prototype.solicitaMotoboy = function (idPedido) {
        var _this = this;
        this.statusBtSm = true;
        var loginres = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.mensagem);
            }
            else {
                _this.servapp.mostrarMensagem(r.mensagem);
                _this.consultaPedidos();
            }
            setTimeout(function () {
                _this.statusBtSm = false;
            }, 1000);
        };
        var data = { id_pedido: idPedido, id_empresa: this.servapp.getDadosEmpresa().id };
        this.crud.post_api('solicita_motoboy_pedido', loginres, data, true);
    };
    PedidosService.prototype.cacelarSolicitacaoMotoboy = function (idPedido) {
        var _this = this;
        var loginres = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.mensagem);
            }
            else {
                _this.servapp.mostrarMensagem(r.mensagem);
                _this.consultaPedidos();
            }
        };
        var data = { id_pedido: idPedido, id_empresa: this.servapp.getDadosEmpresa().id };
        this.crud.post_api('cancelar_solicitacao_motoboy', loginres, data, true);
    };
    PedidosService.prototype.onClickAttStatusPedido = function (statusPedido, idPedido, params) {
        var _this = this;
        var loginres = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.detalhes);
            }
            else {
                _this.servapp.mostrarMensagem(r.resultado.itens.detalhes);
                _this.consultaPedidos();
            }
        };
        var data = { id_pedido: idPedido, id_empresa: this.servapp.getDadosEmpresa().id, status: statusPedido, params: params };
        this.crud.post_api('att_status_pedido', loginres, data, true);
    };
    PedidosService.prototype.onClickAttStatusDelivery = function (statusDelivery) {
        var _this = this;
        var loginres = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.mensagem);
            }
            else {
                _this.servapp.mostrarMensagem(r.mensagem);
                _this.servapp.setStatusDelivery(statusDelivery);
            }
        };
        var data = { id_empresa: this.servapp.getDadosEmpresa().id, status: statusDelivery };
        this.crud.post_api('att_status_delivery', loginres, data, true);
    };
    PedidosService.prototype.getPedidos = function () {
        return this.pedidos;
    };
    PedidosService.prototype.setPedido = function (pedido) {
        this.pedido = pedido;
    };
    PedidosService.prototype.getPedido = function () {
        return this.pedido;
    };
    PedidosService.prototype.playAudio1 = function () {
        this.audio1.play();
    };
    PedidosService.prototype.getTodosPedidos = function () {
        return this.todospedidos;
    };
    PedidosService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], PedidosService);
    return PedidosService;
}());
exports.PedidosService = PedidosService;
