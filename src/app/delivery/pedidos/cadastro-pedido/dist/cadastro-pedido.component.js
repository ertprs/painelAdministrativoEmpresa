"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CadastroPedidoComponent = void 0;
var valor_item_pagamento_component_1 = require("./valor-item-pagamento/valor-item-pagamento.component");
var selecionar_banco_component_1 = require("./../../../bancos/selecionar-banco/selecionar-banco.component");
var selecionar_forma_pag_component_1 = require("./selecionar-forma-pag/selecionar-forma-pag.component");
var forms_1 = require("@angular/forms");
var item_catalogo_component_1 = require("./item-catalogo/item-catalogo.component");
var core_1 = require("@angular/core");
var selecionar_cartao_pagamento_component_1 = require("./selecionar-cartao-pagamento/selecionar-cartao-pagamento.component");
var CadastroPedidoComponent = /** @class */ (function () {
    function CadastroPedidoComponent(servico, crud, dialog, servcard, fb, bottomSheet, router) {
        this.servico = servico;
        this.crud = crud;
        this.dialog = dialog;
        this.servcard = servcard;
        this.fb = fb;
        this.bottomSheet = bottomSheet;
        this.router = router;
        this.statusLoad = false;
        this.statusLoadItem = false;
        this.statusbt = false;
        this.statusLoaderBairros = false;
        this.statusLoaderTaxa = false;
        this.statusLoaderEnviaPedido = false;
        this.indexTabGroup = 0;
        this.stand = false;
        this.statusBtenviar = false;
    }
    CadastroPedidoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.fb.group({
            nome: [null, forms_1.Validators.required],
            telefone: [null, forms_1.Validators.required],
            rua: [null, forms_1.Validators.required],
            numero: [null, forms_1.Validators.required],
            complemento: [null],
            tiporesidencia: [null],
            bairro: [false, forms_1.Validators.required],
            cidade: [false, forms_1.Validators.required],
            taxaentrega: [null, forms_1.Validators.required],
            formapagamento: [false, forms_1.Validators.required],
            canalpedido: [false, forms_1.Validators.required],
            tipopedido: [false, forms_1.Validators.required],
            troco: ['', forms_1.Validators.required],
            desconto: [''],
            taxaextra: [''],
            valor: ['1']
        });
        this.formCadastro();
        this.consultaCatalogo();
        this.formvalorFp = this.fb.group({
            valor: ['']
        });
        this.servcard.funcaoEmitter.subscribe(function (data) {
            _this.selecionarBanco();
        });
        this.servcard.selecionarCartao.subscribe(function (data) {
            _this.cataoSelecionado = data;
            _this.selecionarCartao(data);
        });
    };
    CadastroPedidoComponent.prototype.trocarTaxa = function () {
        console.log(this.servcard.getCarrinho().taxaentrega);
        var taxa = this.servcard.getCarrinho().taxaentrega;
        var taxaEntregaFloat = taxa;
        if (!taxaEntregaFloat) {
            taxaEntregaFloat = 0;
        }
        taxaEntregaFloat = parseFloat(taxaEntregaFloat.toString());
        this.servcard.setTaxaEntrega(taxaEntregaFloat);
        this.servcard.setTaxaManual(taxaEntregaFloat);
    };
    CadastroPedidoComponent.prototype.onClickStandBy = function (status) {
        if (status.checked) {
            this.stand = false;
        }
        else {
            this.stand = true;
        }
    };
    CadastroPedidoComponent.prototype.trackByIdx = function (index, obj) {
        return index;
    };
    CadastroPedidoComponent.prototype.carregaDadosUsuario = function () {
        var _this = this;
        this.servcard.iniciaFormCadastro.subscribe(function (data) {
            console.log(data);
            _this.indexTabGroup = 1;
            _this.form = _this.fb.group({
                id: [data.id, forms_1.Validators.required],
                nome: [data.nome, forms_1.Validators.required],
                telefone: [data.telefone, forms_1.Validators.required],
                rua: [data.rua, forms_1.Validators.required],
                numero: [data.numero, forms_1.Validators.required],
                complemento: [data.complemento],
                tiporesidencia: [data.tiporesidencia],
                bairro: [null],
                cidade: [null],
                taxaentrega: [null, forms_1.Validators.required],
                formapagamento: [false, forms_1.Validators.required],
                canalpedido: [false, forms_1.Validators.required],
                tipopedido: [false, forms_1.Validators.required],
                troco: ['', forms_1.Validators.required],
                desconto: [''],
                taxaextra: ['']
            });
        });
    };
    CadastroPedidoComponent.prototype.iniciaFormDados = function () {
        console.log(this.servcard.getCadastroClienteLista());
        if (this.servcard.getCadastroClienteLista().taxaextra > 0) {
            this.servcard.getCarrinho().taxaextra = this.servcard.getCadastroClienteLista().taxaextra;
        }
        if (this.servcard.getCadastroClienteLista().desconto > 0) {
            this.servcard.getCarrinho().desconto = this.servcard.getCadastroClienteLista().desconto;
        }
        /*this.servcard.getCadastroClienteLista().formaspagamento.forEach(element => {
              this.servcard.addFp(element);
            });*/
        this.form = this.fb.group({
            id: [this.servcard.getCadastroClienteLista().id],
            nome: [this.servcard.getCadastroClienteLista().nome, forms_1.Validators.required],
            telefone: [this.servcard.getCadastroClienteLista().telefone, forms_1.Validators.required],
            rua: [this.servcard.getCadastroClienteLista().rua, forms_1.Validators.required],
            numero: [this.servcard.getCadastroClienteLista().numero, forms_1.Validators.required],
            complemento: [this.servcard.getCadastroClienteLista().complemento],
            tiporesidencia: [this.servcard.getCadastroClienteLista().tiporesidencia],
            bairro: [null],
            cidade: [null],
            taxaentrega: [null],
            formapagamento: [false],
            canalpedido: [false],
            tipopedido: [false],
            troco: [''],
            desconto: [''],
            taxaextra: ['']
        });
        this.selecionarCidadeAuto(this.servcard.getCadastroClienteLista().cidade.nome, this.servcard.getCadastroClienteLista().bairro.nome);
    };
    CadastroPedidoComponent.prototype.selecionaCidadeSelect = function (item) {
        this.cidadeClienteSelecionada = item;
        this.listaBairros = item.bairros;
    };
    CadastroPedidoComponent.prototype.formTaxa = function (item) {
        this.form.controls.taxaentrega.setValue(item.taxa);
        this.servcard.setTaxaEntrega(parseFloat(item.taxa));
        this.servico.getDadosEmpresa().taxa_entrega = parseFloat(item.taxa);
        this.taxaEntregadorText = item.taxa;
    };
    CadastroPedidoComponent.prototype.selecionarCidadeAuto = function (nomeCidade, nomeBairro) {
        var _this = this;
        if (!nomeCidade) {
            this.servico.mostrarMensagem('Não foi possível selecionar a cidade do cliente');
            return;
        }
        if (!nomeBairro) {
            this.servico.mostrarMensagem('Não foi possível selecionar a cidade do cliente');
            return;
        }
        nomeCidade = nomeCidade.trim();
        var nomeBairroRep = nomeBairro.trim();
        console.log('#selecionarCidadeAuto');
        console.log(':' + nomeCidade + ':');
        console.log(':' + nomeBairroRep + ':');
        var statusCidade = false;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.mensagem);
            }
            else {
                _this.servico.setListaBairros(r);
                _this.selecionaBairroAuto(nomeBairroRep);
            }
            console.log(r);
        };
        this.listaCidades.forEach(function (element) {
            if (element.nome === nomeCidade) {
                statusCidade = true;
                _this.form.controls.cidade.setValue(element);
                _this.listaBairros = element.bairros;
                _this.selecionaBairroAuto(nomeBairroRep);
                return;
            }
        });
        if (statusCidade === false) {
            this.servico.mostrarMensagem('Cidade não selecionada. ' + nomeCidade);
        }
    };
    CadastroPedidoComponent.prototype.selecionaBairroAuto = function (nomeBairro) {
        for (var key in this.listaBairros) {
            if (this.listaBairros[key].nome === nomeBairro) {
                // this.carregaTaxa(this.servico.getListaBairros()[key]);
                this.form.controls.bairro.setValue(this.listaBairros[key]);
                this.form.controls.taxaentrega.setValue(this.listaBairros[key].taxa);
                this.servcard.setTaxaEntrega(parseFloat(this.listaBairros[key].taxa));
                this.servico.getDadosEmpresa().taxa_entrega = parseFloat(this.listaBairros[key].taxa);
                this.taxaEntregadorText = this.listaBairros[key].taxa;
            }
        }
        this.servcard.setCadastroClienteLista(false);
    };
    CadastroPedidoComponent.prototype.f1 = function (form) {
        var _this = this;
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
        this.crud.post_api('cadatrar_motoboy', accallback, form);
    };
    CadastroPedidoComponent.prototype.consultaCatalogo = function () {
        var _this = this;
        this.statusLoad = true;
        // console.log('#consultaEntregas');
        this.crud.get_api('cardapio&acmenu=listar').subscribe(function (data) {
            // console.log(data);
            _this.catalogo = data.catalogo;
            _this.statusLoad = false;
            _this.listaCidades = data.empresa.locais_entrega;
            setTimeout(function () {
                _this.iniciaFormDados();
            }, 400);
        });
    };
    CadastroPedidoComponent.prototype.formCadastro = function () {
        if (!this.servcard.getCadastroClienteLista()) {
            this.form = this.fb.group({
                nome: [null, forms_1.Validators.required],
                telefone: [null, forms_1.Validators.required],
                rua: [null, forms_1.Validators.required],
                numero: [null, forms_1.Validators.required],
                complemento: [null],
                tiporesidencia: [null],
                bairro: [false, forms_1.Validators.required],
                cidade: [false, forms_1.Validators.required],
                taxaentrega: [null, forms_1.Validators.required],
                formapagamento: [false, forms_1.Validators.required],
                canalpedido: [false, forms_1.Validators.required],
                tipopedido: [false, forms_1.Validators.required],
                troco: ['', forms_1.Validators.required],
                desconto: [''],
                taxaextra: [''],
                valor: ['1']
            });
        }
        else {
            // this.iniciaFormDados();
            // tslint:disable-next-line: max-line-length
            // this.selecionarCidadeAuto(this.servcard.getCadastroClienteLista().cidade.nome, this.servcard.getCadastroClienteLista().bairro.nome);
            // this.indexTabGroup = 1;
        }
    };
    CadastroPedidoComponent.prototype.onClickItem = function (item) {
        // console.log(item);
        if (item.esgotado === true) {
            this.servico.mostrarMensagem('Item esgotado');
            return;
        }
        var dialogRef = this.dialog.open(item_catalogo_component_1.ItemCatalogoComponent, {
            width: '650px',
            data: item
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
            }
        });
    };
    CadastroPedidoComponent.prototype.selecionarBanco = function () {
        var _this = this;
        var dialogRef = this.dialog.open(selecionar_banco_component_1.SelecionarBancoComponent, {
            width: '400px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                console.log(result);
                _this.servcard.getCarrinho().item_pagamento.id = result.id;
                _this.servcard.getCarrinho().item_pagamento.nome = result.nome;
                _this.servcard.getCarrinho().item_pagamento.status = true;
            }
        });
    };
    CadastroPedidoComponent.prototype.selecionarCartao = function (cartao) {
        var _this = this;
        var dialogRef = this.dialog.open(selecionar_cartao_pagamento_component_1.SelecionarCartaoPagamentoComponent, {
            width: '400px',
            data: { item: cartao }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            if (result) {
                console.log(result);
                _this.servcard.getCarrinho().item_pagamento.id = result.id;
                _this.servcard.getCarrinho().item_pagamento.nome = result.nome;
                _this.servcard.getCarrinho().item_pagamento.status = true;
            }
        });
    };
    CadastroPedidoComponent.prototype.onClickFinalizarPedido = function () {
        // console.log(this.form.value);
        var _this = this;
        console.log(this.servcard.getCarrinho());
        // Verifica se as formas de pagamento o total esta maior que o valor do pedido em se
        if (this.servcard.verificaFpsTotal() > this.servcard.getTotalCarrinho()) {
            this.servico.mostrarMensagem('Os valores das formas de pagamento estão maior que o valor total do pedido');
            console.log(this.servcard.verificaFpsTotal());
            return;
        }
        if (this.servcard.getQntItensCar() < 1) {
            this.servico.mostrarMensagem('O carrinho está vazio!');
            return;
        }
        if (this.servcard.verificaFp() === false && !this.stand) {
            // this.servico.mostrarMensagem('Selecione a forma de pagamento deste pedido');
            this.openBottomSheet('formapagamento');
            return;
        }
        if (this.servcard.getCarrinho().origempedido === false) {
            // this.servico.mostrarMensagem('Selecione a origem deste pedido');
            this.openBottomSheet('canalpedido');
            return;
        }
        if (this.servcard.verificaFpsTotal() !== this.servcard.getTotalCarrinho() && !this.stand) {
            this.servico.mostrarMensagem('Os total da forma de pagamento está menor que o total do pedido.');
            return;
        }
        // Verifica se foi selecionado a bandeira do carão em Cartao Crédito ou Déb.
        var nomeFp = this.servcard.getCarrinho().formapagamento.nome.toLocaleLowerCase();
        console.log(nomeFp);
        if (nomeFp === 'cartão de crédito' || nomeFp === 'cartão de débido') {
            if (this.servcard.getCarrinho().item_pagamento.status === false) {
                console.warn('Selecionar a bandeira do cartão');
                this.selecionarCartao(this.cataoSelecionado);
                return;
            }
        }
        // Verifica se foi selecionado o banco da tranderência bancária.
        if (nomeFp === 'transferência bancária' || nomeFp === 'transferência') {
            if (this.servcard.getCarrinho().item_pagamento.status === false) {
                this.selecionarBanco();
                console.warn('Selecionar o banco');
                return;
            }
        }
        console.log('OKK');
        if (this.servcard.getCarrinho().tipopedido === 'false') {
            // this.servico.mostrarMensagem('Selecione a opção do pedido, se é para entrega ou para retirada');
            this.openBottomSheet('tipopedido');
            return;
        }
        if (this.form.value.rua === '' || !this.form.value.rua) {
            this.servico.mostrarMensagem('Informe a rua do pedido');
            return;
        }
        if (this.form.value.cidade === false) {
            this.servico.mostrarMensagem('Selecione a cidade do pedido');
            return;
        }
        if (this.form.value.bairro === false) {
            this.servico.mostrarMensagem('Selecione o bairro do pedido');
            return;
        }
        this.servcard.setCliente(this.servico.getDadosEmpresa().id);
        this.servcard.setIdEmpresaCar(this.servico.getDadosEmpresa().id);
        /* if (this.servcard.getTotalCarrinho() < this.servcard.getEmpresa().pedidomin) {
           this.alertaDinam('Ops!', 'O pedido mínimo deste estabelecimento é de R$' + this.empServ.getEmpresa().pedidomin + ',00 reais');
           return;
         }*/
        if (!this.form.value.nome) {
            this.servico.mostrarMensagem('Informe o nome do cliente');
            return;
        }
        if (!this.form.value.nome) {
            this.servico.mostrarMensagem('Informe o telefone do cliente');
            return;
        }
        var cli = { imagem: '', id: this.form.value.id, nome: this.form.value.nome, telefone: this.form.value.telefone };
        this.servcard.setCliente(cli);
        this.servcard.setEmpresaCarrinho(this.servico.getDadosEmpresa());
        this.servcard.setSubtotal(this.servcard.getSubTotalCarrinho());
        this.servcard.getCarrinho().endereco.cidade = this.form.value.cidade;
        this.servcard.getCarrinho().endereco.bairro = this.form.value.bairro;
        this.servcard.setItensEndereco(this.form.value);
        this.servcard.atualizaTotalComTaxa();
        // this.servcard.setDescontoCarrinho(this.form.value.desconto);
        this.statusbt = true;
        if (this.servcard.getCarrinho().formapagamento.nome === 'dinheiro' ||
            this.servcard.getCarrinho().formapagamento.nome === 'Dinheiro') {
            this.servcard.setTroco(this.form.value.troco);
        }
        this.statusLoaderEnviaPedido = true;
        console.log('Envia para o backend');
        console.log(this.servcard.getCarrinho());
        this.statusBtenviar = true;
        var accallback = function () {
            console.log('callback');
            _this.statusLoaderEnviaPedido = false;
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.detalhes);
                _this.statusBtenviar = false;
            }
            else {
                _this.servico.mostrarMensagem('Pedido finalizado');
                _this.servcard.limparCarrinho();
                _this.router.navigate(['/painelpedidos/pedidos']);
            }
            console.log(r);
        };
        this.crud.post_api('adicionar_pedido', accallback, this.servcard.getCarrinho(), true);
    };
    CadastroPedidoComponent.prototype.selectionChangeCidade = function (item) {
        var _this = this;
        console.log('#selectionChangeCidade');
        console.log(item);
        this.cidadeClienteSelecionada = item;
        this.statusLoaderBairros = true;
        var accallback = function () {
            console.log('callback');
            _this.statusLoaderBairros = false;
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.mensagem);
            }
            else {
                _this.servico.setListaBairros(r);
            }
            console.log(r);
        };
        this.crud.post_api('bairros', accallback, this.cidadeClienteSelecionada);
    };
    CadastroPedidoComponent.prototype.carregaTaxa = function (itembairro) {
        var _this = this;
        try {
            console.log(itembairro);
            var coordendasBairro = '';
            var cidadeNome = this.cidadeClienteSelecionada;
            coordendasBairro = itembairro.lat + ', ' + itembairro.lng;
            var fcallb = function () {
                _this.statusLoaderTaxa = false;
                var r = _this.servico.getRespostaApi();
                if (r.erro === true) {
                    _this.servico.mostrarMensagem(r.mensagem);
                }
                else {
                    for (var x in _this.servico.getListaBairros()) {
                        if (_this.servico.getListaBairros()[x].id === itembairro.id) {
                            _this.servico.getListaBairros()[x].taxa = r.taxa_entrega;
                            _this.servico.getListaBairros()[x].distancia = r.rows[0].elements[0].distance.text;
                            _this.servico.getListaBairros()[x].duracao = r.rows[0].elements[0].duration.text;
                            var txe = r.taxa_entrega.toString().replace('.', ',');
                            _this.form.controls.taxaentrega.setValue(txe);
                            _this.servcard.setTaxaEntrega(parseFloat(txe));
                            _this.servico.getDadosEmpresa().taxa_entrega = parseFloat(txe);
                            _this.taxaEntregadorText = r.taxa_entrega;
                            console.log(_this.form.value);
                            return;
                        }
                    }
                }
            };
            this.statusLoaderTaxa = true;
            var data = { cidadeNome: cidadeNome, coordendasBairro: coordendasBairro };
            this.crud.post_api('calc_taxa', fcallb, data);
        }
        catch (e) {
            console.error(e);
            this.servico.mostrarMensagem('Não foi possível calcular a taxa de entrega. Tente cadastrar uma nova entrega novamente.');
        }
    };
    CadastroPedidoComponent.prototype.onclickEntregaTipo = function () {
        if (this.servico.getDadosEmpresa().formasfuncionamento.tipo === '2') {
            // Verifica as formas de servico da empresa
            this.servico.mostrarMensagem('Este estabelecimento só aceita pedidos para retirada');
            return;
        }
        this.servcard.setTaxaEntrega(this.taxaEntregadorText);
        this.servcard.setTipoPedido('entrega');
        // this.actionsheet.hide();
        // this.alertapp();
    };
    CadastroPedidoComponent.prototype.onClickEditarvalorFp = function (element) {
        var _this = this;
        var dialogRef = this.dialog.open(valor_item_pagamento_component_1.ValorItemPagamentoComponent, {
            width: '250px',
            data: { element: element }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            console.log(result);
            // tslint:disable-next-line: prefer-for-of
            for (var x = 0; x < _this.servcard.getCarrinho().formasPagamento.length; x++) {
                console.log(_this.servcard.getCarrinho().formasPagamento[x]);
                console.log(result[0]);
                if (_this.servcard.getCarrinho().formasPagamento[x].referencia === result.element.referencia) {
                    console.log('OKKK!');
                    _this.servcard.getCarrinho().formasPagamento[x].valor = result.valor;
                }
            }
        });
    };
    CadastroPedidoComponent.prototype.openBottomSheet = function (tipo) {
        if (tipo === 'formapagamento' && this.stand) {
            this.servico.mostrarMensagem('O tipo de pagamento está stand-by');
            return;
        }
        this.servcard.setTipoSheet(tipo, this.bottomSheet);
        this.bottomSheet.open(selecionar_forma_pag_component_1.SelecionarFormaPagComponent);
    };
    CadastroPedidoComponent = __decorate([
        core_1.Component({
            selector: 'app-cadastro-pedido',
            templateUrl: './cadastro-pedido.component.html',
            styleUrls: ['./cadastro-pedido.component.css']
        })
    ], CadastroPedidoComponent);
    return CadastroPedidoComponent;
}());
exports.CadastroPedidoComponent = CadastroPedidoComponent;
