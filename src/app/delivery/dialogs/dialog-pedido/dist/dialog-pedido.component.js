"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.DialogPedidoComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var core_2 = require("@angular/core");
var DialogPedidoComponent = /** @class */ (function () {
    function DialogPedidoComponent(servpedidos, servapp, crud, dialog, upimgServ, sercard, router, dialogRef, data) {
        this.servpedidos = servpedidos;
        this.servapp = servapp;
        this.crud = crud;
        this.dialog = dialog;
        this.upimgServ = upimgServ;
        this.sercard = sercard;
        this.router = router;
        this.dialogRef = dialogRef;
        this.data = data;
        this.displayedColumns = ['status', 'info'];
        this.detalhespedido = ['quantidade', 'item', 'observacao', 'adicionais', 'preco', 'total']; /* removi: desconto */
        this.btCstatus = false;
        this.loaderPedido = false;
    }
    DialogPedidoComponent.prototype.ngOnInit = function () {
    };
    DialogPedidoComponent.prototype.onClickAttStatusPedido = function (statusPedido) {
        var _this = this;
        this.btCstatus = true;
        var loginres = function () {
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.detalhes);
                _this.btCstatus = false;
            }
            else {
                // this.servapp.mostrarMensagem(r.detalhes);
                _this.servpedidos.consultaPedidos();
                _this.dialog.closeAll();
            }
        };
        var data = { id_pedido: this.servpedidos.getPedido().id, id_empresa: this.servapp.getDadosEmpresa().id, status: statusPedido };
        console.log(this.crud.post_api('att_status_pedido', loginres, data));
    };
    DialogPedidoComponent.prototype.onClickEditarPedido = function (item) {
        var _this = this;
        console.log(item);
        var enderecoCliente = { rua: '', numero: '', bairro: '', cidade: '', complemento: '', tiporesidencia: '' };
        enderecoCliente.rua = item.endereco.rua;
        enderecoCliente.numero = item.endereco.numero;
        enderecoCliente.bairro = item.endereco.bairro;
        enderecoCliente.cidade = item.endereco.cidade;
        enderecoCliente.complemento = item.endereco.complemento;
        enderecoCliente.tiporesidencia = item.endereco.tiporesidencia;
        // this.sercard.iniciaFormCadastro.emit(enderecoCliente);
        this.sercard.limparCarrinho();
        var pedido = {
            id: item.dadoscliente.id,
            nome: item.dadoscliente.nome,
            telefone: item.dadoscliente.telefone,
            rua: item.endereco.rua,
            numero: item.endereco.numero,
            complemento: item.endereco.complemento,
            tiporesidencia: item.endereco.tiporesidencia,
            bairro: item.endereco.bairro,
            cidade: item.endereco.cidade,
            formaspagamento: item.formaspagamento,
            canalpedido: '',
            tipopedido: item.tipopedido,
            troco: item.troco,
            desconto: item.desconto,
            taxaentrega: '',
            itens: item.itens,
            taxaextra: item.taxaextra
        };
        item.itens.forEach(function (element) {
            element.total = parseFloat(element.total);
            element.preco = parseFloat(element.preco);
            _this.sercard.addItemCarrinho(element);
        });
        this.sercard.setIdPedido(item.id);
        this.sercard.setOrigemPedido(item.origem);
        this.sercard.setStatusAcaoPedido(true);
        this.sercard.setCadastroClienteLista(pedido);
        this.router.navigate(['/painelpedidos/cadastro-pedido']);
        this.dialog.closeAll();
    };
    DialogPedidoComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-pedido',
            templateUrl: './dialog-pedido.component.html',
            styleUrls: ['./dialog-pedido.component.css']
        }),
        __param(8, core_2.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogPedidoComponent);
    return DialogPedidoComponent;
}());
exports.DialogPedidoComponent = DialogPedidoComponent;
