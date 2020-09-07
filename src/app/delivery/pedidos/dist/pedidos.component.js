"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PedidosComponent = void 0;
var aviso_taxa_pedido_component_1 = require("./aviso-taxa-pedido/aviso-taxa-pedido.component");
var cancelar_pedido_component_1 = require("./cancelar-pedido/cancelar-pedido.component");
var dialog_pedido_component_1 = require("./../dialogs/dialog-pedido/dialog-pedido.component");
var core_1 = require("@angular/core");
var PedidosComponent = /** @class */ (function () {
    function PedidosComponent(dialog, servpedidos, formBuilder, servapp, crud) {
        this.dialog = dialog;
        this.servpedidos = servpedidos;
        this.formBuilder = formBuilder;
        this.servapp = servapp;
        this.crud = crud;
        this.displayedColumns = ['botoes', 'status', 'nome', 'tipo', 'formapagamento', 'total', 'info', 'statusmotoboy', 'id'];
        this.pedidos = [];
    }
    PedidosComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.statusLoadEntregas = true;
        setTimeout(function () {
            _this.servpedidos.consultaPedidos();
        }, 600);
    };
    PedidosComponent.prototype.onClickPedido = function (item) {
        this.servpedidos.setPedido(item);
        console.log(item);
    };
    PedidosComponent.prototype.onClickverPedido = function () {
        var _this = this;
        this.dialogDelsuc = this.dialog.open(dialog_pedido_component_1.DialogPedidoComponent, {
            width: '800px'
        });
        this.servapp.setDialogapp(this.dialogDelsuc);
        this.dialogDelsuc.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed result');
            console.log(result);
            if (result === 'cancelar_pedido') {
                setTimeout(function () { _this.onClickCancelarPedido(_this.servpedidos.getPedido()); }, 600);
            }
        });
    };
    PedidosComponent.prototype.onClickCancelarPedido = function (item) {
        var _this = this;
        this.servapp.getDialogapp().close();
        var dialogRef = this.dialog.open(cancelar_pedido_component_1.CancelarPedidoComponent, {
            width: '450px',
            data: { item: item }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed cancelar pedido');
            console.log(result);
            _this.servpedidos.onClickAttStatusPedido(7, result.idPedido, result);
        });
    };
    PedidosComponent.prototype.dialogAvisoTaxa = function (item) {
        var _this = this;
        var loginres = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.mensagem);
            }
            else {
                var dialogRef = _this.dialog.open(aviso_taxa_pedido_component_1.AvisoTaxaPedidoComponent, {
                    width: '450px',
                    data: r
                });
                dialogRef.afterClosed().subscribe(function (result) {
                    console.log('The dialog was closed cancelar pedido');
                    console.log(result);
                    if (result) {
                        // Atualiza a taxa de entrega do motoboy
                        var callb = function () {
                            _this.servpedidos.solicitaMotoboy(item.id);
                        };
                        _this.crud.post_api('attTaxaMotoboy', callb, { idPedido: item.id, taxaEntrega: r.taxa_entrega });
                    }
                });
            }
        };
        var params = {
            coordendasBairro: item.endereco.bairro.lat + ', ' + item.endereco.bairro.lng,
            cidadeNome: item.endereco.cidade.nome
        };
        this.crud.post_api('calc_taxa', loginres, params);
    };
    PedidosComponent = __decorate([
        core_1.Component({
            selector: 'app-pedidos',
            templateUrl: './pedidos.component.html',
            styleUrls: ['./pedidos.component.css']
        })
    ], PedidosComponent);
    return PedidosComponent;
}());
exports.PedidosComponent = PedidosComponent;
