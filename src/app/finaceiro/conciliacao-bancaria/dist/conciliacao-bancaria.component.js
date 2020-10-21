"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ConciliacaoBancariaComponent = void 0;
var ver_imagem_component_1 = require("./../../upload-imagem/ver-imagem/ver-imagem.component");
var adicionar_banco_component_1 = require("./adicionar-banco/adicionar-banco.component");
var core_1 = require("@angular/core");
var ConciliacaoBancariaComponent = /** @class */ (function () {
    function ConciliacaoBancariaComponent(servico, crud, dialog, fb) {
        this.servico = servico;
        this.crud = crud;
        this.dialog = dialog;
        this.fb = fb;
        this.displayedColumns = ['c1', 'c7', 'c2', 'c3', 'c4', 'c5', 'c6'];
    }
    ConciliacaoBancariaComponent.prototype.ngOnInit = function () {
        this.dataSource = [];
        this.form = this.fb.group({
            idBanco: [''],
            datai: [''],
            dataf: ['']
        });
        this.conciliacaoBancaria();
    };
    ConciliacaoBancariaComponent.prototype.onfcalldelsuc = function (evento) {
        console.log(evento);
        this.conciliacaoBancaria();
    };
    ConciliacaoBancariaComponent.prototype.conciliacaoBancaria = function () {
        var _this = this;
        var fcall = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.detalhes.resultado.mensagem);
            }
            else {
                _this.dataSource = r.resultado.itens.lista;
                _this.bancos = r.resultado.itens.bancos;
                _this.total = r.resultado.itens.total;
            }
        };
        this.crud.post_api('conciliacaoBancaria', fcall, this.form.value);
    };
    ConciliacaoBancariaComponent.prototype.adicionarbanco = function () {
        var dialogRef = this.dialog.open(adicionar_banco_component_1.AdicionarBancoComponent, {
            width: '250px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    ConciliacaoBancariaComponent.prototype.lancarFluxo = function (pedido) {
        var _this = this;
        var fcall = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.resultado.mensagem);
                _this.conciliacaoBancaria();
            }
            else {
                _this.servico.mostrarMensagem(r.resultado.mensagem);
                _this.conciliacaoBancaria();
            }
        };
        this.crud.post_api('lancarConsolidacaoBancaria', fcall, { idPedido: pedido.id, operador: this.servico.getDadosEmpresa().operador.nome });
    };
    ConciliacaoBancariaComponent.prototype.verComprovante = function (element) {
        var _this = this;
        var dialogRef = this.dialog.open(ver_imagem_component_1.VerImagemComponent, {
            width: '450px',
            data: element
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            if (result) {
                _this.conciliacaoBancaria();
            }
        });
    };
    ConciliacaoBancariaComponent = __decorate([
        core_1.Component({
            selector: 'app-conciliacao-bancaria',
            templateUrl: './conciliacao-bancaria.component.html',
            styleUrls: ['./conciliacao-bancaria.component.css']
        })
    ], ConciliacaoBancariaComponent);
    return ConciliacaoBancariaComponent;
}());
exports.ConciliacaoBancariaComponent = ConciliacaoBancariaComponent;
