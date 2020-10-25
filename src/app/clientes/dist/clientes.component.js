"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClientesComponent = void 0;
var form_endereco_cliente_component_1 = require("./form-endereco-cliente/form-endereco-cliente.component");
var enderecos_cliente_component_1 = require("./enderecos-cliente/enderecos-cliente.component");
var core_1 = require("@angular/core");
var dialog_cadastro_cliente_component_1 = require("../dialog-cadastro-cliente/dialog-cadastro-cliente.component");
var operators_1 = require("rxjs/operators");
var ClientesComponent = /** @class */ (function () {
    function ClientesComponent(crud, servico, dialog, router, sercard, us, fb) {
        this.crud = crud;
        this.servico = servico;
        this.dialog = dialog;
        this.router = router;
        this.sercard = sercard;
        this.us = us;
        this.fb = fb;
        this.displayedColumns = ['op', 'nome', 'telefone', 'aniversario', 'tipo', 'info', 'add'];
        this.itens = [];
        this.btblista = false;
        this.addCli = false;
        this.btMenu = false;
        this.btRemo = false;
    }
    ClientesComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { _this.f5(); }, 600);
        console.log('Meus cliente...');
        this.btblista = this.us.getPermissoessuario()[1].children[0].status;
        this.addCli = this.us.getPermissoessuario()[1].children[3].status;
        this.btMenu = this.us.getPermissoessuario()[1].children[2].status;
        this.btRemo = this.us.getPermissoessuario()[1].children[1].status;
        this.form = this.fb.group({
            clienteNome: ['']
        });
    };
    ClientesComponent.prototype.consultaClienteFiltro = function () {
        var _this = this;
        operators_1.debounceTime(20000);
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) { }
            else {
                _this.itens = r.resultado;
            }
            console.log(r);
        };
        this.crud.post_api('consulta_cliente_filtro', accallback, this.form.value.clienteNome);
    };
    ClientesComponent.prototype.f5 = function () {
        var _this = this;
        this.crud.get_api('cons_cliente_lista_emp').subscribe(function (data) {
            console.log(data);
            _this.itens = data;
        });
    };
    ClientesComponent.prototype.add = function () {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_cadastro_cliente_component_1.DialogCadastroClienteComponent, {
            width: '650px',
            data: { acao: 'add' }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                _this.f1(result);
            }
        });
    };
    ClientesComponent.prototype.onClickEditar = function (item) {
        var _this = this;
        var dialogRef = this.dialog.open(dialog_cadastro_cliente_component_1.DialogCadastroClienteComponent, {
            width: '650px',
            data: { acao: 'editar', usuario: item }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                _this.editar(result);
            }
        });
    };
    ClientesComponent.prototype.editar = function (form) {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.detalhes);
            }
            else {
                _this.servico.mostrarMensagem(r.detalhes);
                _this.f5();
            }
            console.log(r);
        };
        this.crud.post_api('att_cliente_lista_emp', accallback, form);
    };
    ClientesComponent.prototype.f1 = function (form) {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.detalhes);
            }
            else {
                _this.servico.mostrarMensagem(r.detalhes);
                _this.f5();
            }
            console.log(r);
        };
        this.crud.post_api('add_cliente_lista_emp', accallback, form);
    };
    ClientesComponent.prototype.removerItem = function (item) {
        var _this = this;
        item.idendereco = item.id;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.detalhes);
            }
            else {
                _this.servico.mostrarMensagem(r.detalhes);
                _this.f5();
            }
            console.log(r);
        };
        this.crud.post_api('remove_cliente_lista_emp', accallback, item);
    };
    ClientesComponent.prototype.onClickBtMenu = function (element) {
        this.itemSelecionado = element;
    };
    ClientesComponent.prototype.onClickCadastraPedido = function (item) {
        this.sercard.setCadastroClienteLista(item);
        this.router.navigate(['/painelpedidos/cadastro-pedido']);
        // this.router.navigate(['/inicio']);
    };
    ClientesComponent.prototype.enderecoCliente = function (element) {
        var _this = this;
        var dialogRef = this.dialog.open(enderecos_cliente_component_1.EnderecosClienteComponent, {
            width: '750px',
            data: { item: element }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log(result);
            if (!result) {
                return;
            }
            if (result === 'add_endereco') {
                _this.formaddEnd();
                return;
            }
            if (result.acao === 'rem_endereco') {
                _this.removerEndereco(result.item);
                return;
            }
            console.log('The dialog was closed');
            // this.itemSelecionado.id = result.id;
            _this.itemSelecionado.rua = result.rua;
            _this.itemSelecionado.numero = result.numero;
            _this.itemSelecionado.bairro = result.bairro;
            _this.itemSelecionado.cidade = result.cidade;
            _this.itemSelecionado.complemento = result.complemento;
            _this.itemSelecionado.tiporesidencia = result.tiporesidencia;
            _this.sercard.iniciaFormCadastro.emit(_this.itemSelecionado);
            _this.onClickCadastraPedido(_this.itemSelecionado);
            console.log(_this.itemSelecionado);
        });
    };
    ClientesComponent.prototype.formaddEnd = function () {
        var _this = this;
        var dialogRef = this.dialog.open(form_endereco_cliente_component_1.FormEnderecoClienteComponent, {
            width: '450px',
            data: { acao: 'editar', item: this.itemSelecionado }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                var accallback = function () {
                    console.log('callback');
                    var r = _this.servico.getRespostaApi();
                    if (r.erro === true) {
                        _this.servico.mostrarMensagem(r.detalhes);
                    }
                    else {
                        _this.servico.mostrarMensagem(r.detalhes);
                        _this.f5();
                    }
                    console.log(r);
                };
                _this.crud.post_api('add_end_usuario', accallback, result);
            }
        });
    };
    ClientesComponent.prototype.removerEndereco = function (item) {
        var _this = this;
        item.idendereco = item.id;
        console.log(item);
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.detalhes);
            }
            else {
                _this.servico.mostrarMensagem(r.detalhes);
            }
            console.log(r);
        };
        this.crud.post_api('removerEndereco', accallback, item);
    };
    ClientesComponent = __decorate([
        core_1.Component({
            selector: 'app-clientes',
            templateUrl: './clientes.component.html',
            styleUrls: ['./clientes.component.css']
        })
    ], ClientesComponent);
    return ClientesComponent;
}());
exports.ClientesComponent = ClientesComponent;
