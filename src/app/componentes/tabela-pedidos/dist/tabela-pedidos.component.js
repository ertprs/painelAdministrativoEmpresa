"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TabelaPedidosComponent = void 0;
var add_observacao_pedido_component_1 = require("./../../add-observacao-pedido/add-observacao-pedido.component");
var core_1 = require("@angular/core");
var dialog_pedido_component_1 = require("src/app/delivery/dialogs/dialog-pedido/dialog-pedido.component");
var aviso_taxa_pedido_component_1 = require("src/app/delivery/pedidos/aviso-taxa-pedido/aviso-taxa-pedido.component");
var cancelar_pedido_component_1 = require("src/app/delivery/pedidos/cancelar-pedido/cancelar-pedido.component");
var impressao_pedido_component_1 = require("src/app/delivery/pedidos/impressao-pedido/impressao-pedido.component");
// tslint:disable-next-line: import-spacing
var selecionar_motoboy_entrega_component_1 = require("src/app/delivery/pedidos/selecionar-motoboy-entrega/selecionar-motoboy-entrega.component");
var TabelaPedidosComponent = /** @class */ (function () {
    function TabelaPedidosComponent(dialog, servpedidos, formBuilder, servapp, crud) {
        this.dialog = dialog;
        this.servpedidos = servpedidos;
        this.formBuilder = formBuilder;
        this.servapp = servapp;
        this.crud = crud;
        this.displayedColumns = ['botoes', 'status', 'nome', 'tipo', 'total', 'info', 'origem', 'id', 'statusmotoboy'];
        this.pedidos = [];
    }
    TabelaPedidosComponent.prototype.ngOnInit = function () {
    };
    TabelaPedidosComponent.prototype.selecionarMotoboy = function (item) {
        this.dialogDelsuc = this.dialog.open(selecionar_motoboy_entrega_component_1.SelecionarMotoboyEntregaComponent, {
            width: '560px', data: item.id
        });
        this.dialogDelsuc.afterClosed().subscribe(function (result) {
            if (result) {
            }
        });
    };
    TabelaPedidosComponent.prototype.onClickImprimir = function () {
        this.dialogDelsuc = this.dialog.open(impressao_pedido_component_1.ImpressaoPedidoComponent, {
            width: '360px', data: this.servpedidos.getPedido()
        });
        this.dialogDelsuc.afterClosed().subscribe(function (result) {
            if (result) {
                alert('ok');
            }
        });
    };
    TabelaPedidosComponent.prototype.onClickPedido = function (item) {
        var _this = this;
        try {
            if (item.id === this.servpedidos.getPedido().id && item.status_pedido === this.servpedidos.getPedido().status_pedido) {
                //  return;
            }
        }
        catch (e) {
            console.log('Pedido ainda nao carregado');
        }
        this.servpedidos.setPedido({});
        var loginres = function () {
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.detalhes);
            }
            else {
                _this.servpedidos.setPedido(r.resultado.itens);
            }
        };
        var data = { idPedido: item.id, id_empresa: this.servapp.getDadosEmpresa().id };
        this.crud.post_api('consultaPedido', loginres, data);
    };
    TabelaPedidosComponent.prototype.onClickverPedido = function (element) {
        var _this = this;
        this.dialogDelsuc = this.dialog.open(dialog_pedido_component_1.DialogPedidoComponent, {
            width: '1000px',
            data: element
        });
        this.servapp.setDialogapp(this.dialogDelsuc);
        this.dialogDelsuc.afterClosed().subscribe(function (result) {
            if (result === 'cancelar_pedido') {
                setTimeout(function () { _this.onClickCancelarPedido(_this.servpedidos.getPedido()); }, 600);
            }
            else {
                // this.servpedidos.setPedido({});
            }
        });
    };
    TabelaPedidosComponent.prototype.onClickCancelarPedido = function (item) {
        var _this = this;
        this.servapp.getDialogapp().close();
        var dialogRef = this.dialog.open(cancelar_pedido_component_1.CancelarPedidoComponent, {
            width: '450px',
            data: { item: item }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            _this.servpedidos.onClickAttStatusPedido(7, result.idPedido, result);
        });
    };
    TabelaPedidosComponent.prototype.onClickAddObservacao = function (item) {
        var dialogRef = this.dialog.open(add_observacao_pedido_component_1.AddObservacaoPedidoComponent, {
            width: '450px',
            data: item
        });
        dialogRef.afterClosed().subscribe(function (result) {
        });
    };
    TabelaPedidosComponent.prototype.dialogAvisoTaxa = function (item) {
        var _this = this;
        var loginres = function () {
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.mensagem);
            }
            else {
                var dialogRef = _this.dialog.open(aviso_taxa_pedido_component_1.AvisoTaxaPedidoComponent, {
                    width: '450px',
                    data: r
                });
                dialogRef.afterClosed().subscribe(function (result) {
                    if (result) {
                        // Atualiza a taxa de entrega do motoboy
                        var callb = function () {
                            _this.servpedidos.solicitaMotoboy(item.id);
                        };
                        _this.crud.post_api('attTaxaMotoboy', callb, { idPedido: item.id, taxaEntrega: r.taxa_entrega }, true);
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
    __decorate([
        core_1.Input()
    ], TabelaPedidosComponent.prototype, "pedidos");
    TabelaPedidosComponent = __decorate([
        core_1.Component({
            selector: 'app-tabela-pedidos',
            templateUrl: './tabela-pedidos.component.html',
            styleUrls: ['./tabela-pedidos.component.css']
        })
    ], TabelaPedidosComponent);
    return TabelaPedidosComponent;
}());
exports.TabelaPedidosComponent = TabelaPedidosComponent;
