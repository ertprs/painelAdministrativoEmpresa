"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CadastroPedidoService = void 0;
var core_1 = require("@angular/core");
var CadastroPedidoService = /** @class */ (function () {
    function CadastroPedidoService(servico) {
        this.servico = servico;
        this.iniciaFormCadastro = new core_1.EventEmitter();
        this.funcaoEmitter = new core_1.EventEmitter();
        this.selecionarCartao = new core_1.EventEmitter();
        this.tipoPedido = { entrega: 'entrega', retirada: 'retirada' };
        this.formadepagamento = { dinheiro: 'dinheiro', cartao: { nome: 'cartao', cartoes: [] } };
        this.carrinho = {
            id_pedido: 0,
            id_empresa: false,
            observacao: '',
            statusAcaoPedido: false,
            cliente: '',
            itens: [],
            subtotal: '',
            origempedido: false,
            status_pedido: 1,
            formasPagamento: [],
            formapagamento: { tipo: '', troco: 0, nome: 'false' },
            item_pagamento: { id: '', nome: '', status: false },
            desconto: 0,
            cupom: {},
            total: 0,
            total_pedido: 0,
            taxaentrega: 0,
            taxaextra: '',
            tipopedido: 'false',
            endereco: {
                rua: '',
                numero: {},
                bairro: {},
                complemento: '',
                cidade: {},
                estado: '',
                pais: 'Brasil',
                latitude: '',
                longetude: '',
                tiporesidencia: ''
            },
            empresa: {
                id: '',
                imagem: '',
                nome: '',
                telefone: ''
            }
        };
        this.contaddFps = 0;
        this.taxaEntregaAltManual = 0;
    }
    CadastroPedidoService.prototype.addFp = function (item) {
        try {
            this.contaddFps++;
            item.referencia = this.contaddFps;
            var statusadd = false;
            this.carrinho.formasPagamento.forEach(function (element) {
                if (element.id === item.id) {
                    // statusadd = true;
                }
            });
            var fp = Object.assign({}, item);
            if (!statusadd) {
                this.carrinho.formasPagamento.push(fp);
            }
            console.log(this.carrinho.formasPagamento);
        }
        catch (e) {
            console.log(e);
            console.log('Não foi possível calcular as fps.');
        }
    };
    CadastroPedidoService.prototype.setTaxaManual = function (taxa) {
        this.taxaEntregaAltManual = taxa;
    };
    CadastroPedidoService.prototype.removeItemFp = function (item) {
        var indeArray;
        for (var x in this.carrinho.formasPagamento) {
            if (this.carrinho.formasPagamento[x] === item) {
                indeArray = x;
            }
        }
        this.carrinho.formasPagamento.splice(indeArray, 1);
    };
    CadastroPedidoService.prototype.setIdPedido = function (idPedido) {
        this.carrinho.id_pedido = idPedido;
    };
    CadastroPedidoService.prototype.setStatusAcaoPedido = function (status) {
        this.carrinho.statusAcaoPedido = status;
    };
    CadastroPedidoService.prototype.getStatusAcaoPedido = function () {
        return this.carrinho.statusAcaoPedido;
    };
    CadastroPedidoService.prototype.setSelectedIndex = function (index) { this.selectedIndex = index; };
    CadastroPedidoService.prototype.getSelectedIndex = function () { return this.selectedIndex; };
    CadastroPedidoService.prototype.setCadastroClienteLista = function (cliente) { this.cadastroClienteLista = cliente; };
    CadastroPedidoService.prototype.getCadastroClienteLista = function () { return this.cadastroClienteLista; };
    CadastroPedidoService.prototype.setSubtotal = function (valor) { this.carrinho.subtotal = valor; };
    CadastroPedidoService.prototype.setEmpresaCarrinho = function (empresa) {
        this.carrinho.empresa.id = empresa.id;
        this.carrinho.empresa.imagem = empresa.imagem;
        this.carrinho.empresa.nome = empresa.nome;
        this.carrinho.empresa.telefone = empresa.telefone;
    };
    CadastroPedidoService.prototype.setOrigemPedido = function (origem) {
        this.carrinho.origempedido = origem;
        try {
            this.bottomSheet.dismiss();
        }
        catch (e) { }
    };
    CadastroPedidoService.prototype.getOrigemPedido = function () {
        try {
            this.bottomSheet.dismiss();
        }
        catch (e) { }
        return this.carrinho.origempedido;
    };
    CadastroPedidoService.prototype.setIdEmpresaCar = function (id) {
        this.carrinho.id_empresa = id;
    };
    CadastroPedidoService.prototype.getIdEmpresaCar = function () {
        return this.carrinho.id_empresa;
    };
    CadastroPedidoService.prototype.setTipoPedido = function (tipo) {
        this.carrinho.tipopedido = tipo;
    };
    CadastroPedidoService.prototype.setCliente = function (id) {
        this.carrinho.cliente = id;
    };
    CadastroPedidoService.prototype.setCupomCarrinho = function (cupom) {
        this.carrinho.cupom = cupom;
    };
    CadastroPedidoService.prototype.setDescontoCarrinho = function (valor) {
        this.carrinho.desconto = valor;
    };
    CadastroPedidoService.prototype.getDescontoCarrinho = function () {
        return this.carrinho.desconto;
    };
    CadastroPedidoService.prototype.getFalta = function () {
        var total = 0;
        total = this.getTotalFP() - this.getTotalCarrinho();
        if (total > 0) {
            total = 0;
        }
        return total;
    };
    CadastroPedidoService.prototype.limparCarrinho = function () {
        console.log('Limpa carrinho');
        this.carrinho.itens = [];
        this.carrinho.formasPagamento = [];
        this.carrinho.taxaextra = '';
        this.carrinho.taxaentrega = 0;
        this.carrinho.origempedido = false;
        this.carrinho.total = 0;
        this.carrinho.total_pedido = 0;
        this.carrinho.subtotal = '';
        this.carrinho.desconto = 0;
        this.carrinho.cliente = '';
        this.carrinho.tipopedido = 'false';
        this.carrinho.statusAcaoPedido = false;
        this.carrinho.id_pedido = 0;
        this.carrinho.observacao = '';
        this.taxaEntregaAltManual = 0;
    };
    CadastroPedidoService.prototype.getTipoPedido = function () {
        return this.carrinho.tipopedido;
    };
    CadastroPedidoService.prototype.setCidadeEnderecoEntrega = function (nome) {
        this.carrinho.endereco.cidade = nome;
        console.log(this.carrinho);
    };
    CadastroPedidoService.prototype.setBairroEnderecoEntrega = function (nome) {
        this.carrinho.endereco.bairro = nome;
    };
    CadastroPedidoService.prototype.setEnderecoEntrega = function (endereco) {
        this.carrinho.endereco = endereco;
        console.log(this.carrinho);
    };
    CadastroPedidoService.prototype.getEnderecoEntrega = function () {
        return this.carrinho.endereco;
    };
    CadastroPedidoService.prototype.setItensEndereco = function (form) {
        this.carrinho.endereco.rua = form.rua;
        this.carrinho.endereco.numero = form.numero;
        this.carrinho.endereco.complemento = form.complemento;
        this.carrinho.endereco.tiporesidencia = form.tiporesidencia;
        console.warn('Endereço salvo');
        console.log(this.carrinho.endereco);
    };
    CadastroPedidoService.prototype.getStatusEndereco = function () {
        if (!this.carrinho.endereco.cidade) {
            return false;
        }
        if (!this.carrinho.endereco.bairro) {
            return false;
        }
        if (!this.carrinho.endereco.rua) {
            return false;
        }
        if (!this.carrinho.endereco.numero) {
            return false;
        }
        if (!this.carrinho.endereco.complemento) {
            return false;
        }
        return true;
    };
    CadastroPedidoService.prototype.getConfigTipoPedido = function () {
        return this.tipoPedido;
    };
    CadastroPedidoService.prototype.getFP = function () {
        return this.formadepagamento;
    };
    CadastroPedidoService.prototype.getTotalFP = function () {
        var total = 0;
        this.carrinho.formasPagamento.forEach(function (element) {
            total += parseFloat(element.valor);
        });
        return total;
    };
    CadastroPedidoService.prototype.getFPUsuario = function () {
        return this.carrinho.formapagamento;
    };
    CadastroPedidoService.prototype.setFormaPag = function (fp) {
        this.carrinho.formapagamento.tipo = fp.tipo;
        this.carrinho.formapagamento.nome = fp.nome;
        this.carrinho.formapagamento.troco = fp.troco;
        console.log(this.carrinho);
    };
    CadastroPedidoService.prototype.setTroco = function (valor) {
        this.carrinho.formapagamento.troco = valor;
    };
    CadastroPedidoService.prototype.getCarrinho = function () {
        return this.carrinho;
    };
    CadastroPedidoService.prototype.getTaxaExtra = function () {
        var taxa = this.carrinho.taxaextra;
        var te = parseFloat(taxa);
        if (!te) {
            te = 0;
        }
        return te;
    };
    CadastroPedidoService.prototype.getQntItensCar = function () {
        return this.carrinho.itens.length;
    };
    CadastroPedidoService.prototype.setTaxaEntrega = function (valor) {
        // console.log('setTaxaEntrega');
        // console.log(valor);
        if (!valor) {
            valor = 0;
        }
        this.carrinho.taxaentrega = valor;
    };
    CadastroPedidoService.prototype.getTaxaEntrega = function () {
        return this.carrinho.taxaentrega;
    };
    CadastroPedidoService.prototype.addItemCarrinho = function (item) {
        if (!item) {
            console.error('Erro ao tentar adicionar o item ao carrinho!');
            return false;
        }
        this.alteraValorCarrinhoSOMA(item.preco);
        this.carrinho.itens.push(item);
        var indexitemarray = 0;
        for (var x = 0; x < this.carrinho.itens.length; x++) {
            indexitemarray = x;
        }
        console.log(indexitemarray);
        this.carrinho.itens[indexitemarray].indiceitemarray = indexitemarray;
        // alert('Item adicionado com sucesso');
        console.log(this.carrinho);
        return true;
    };
    CadastroPedidoService.prototype.getItensCarrinho = function () {
        return this.carrinho.itens;
    };
    CadastroPedidoService.prototype.getQtdItensCarrinho = function () {
        return this.carrinho.itens.length;
    };
    CadastroPedidoService.prototype.getSubTotalCarrinho = function () {
        var total = 0;
        try {
            this.carrinho.itens.forEach(function (element) {
                total += element.total;
            });
        }
        catch (e) {
            console.log(e);
        }
        return total;
    };
    CadastroPedidoService.prototype.getTotalCarrinho = function () {
        var total = 0;
        try {
            this.carrinho.itens.forEach(function (element) {
                total += element.total;
            });
        }
        catch (e) {
            console.log(e);
            console.log(this.carrinho);
        }
        // Calcular com desconto
        if (!this.carrinho.desconto) {
            this.carrinho.desconto = 0;
        }
        total -= this.carrinho.desconto;
        // Calcula com taxa extra
        total += this.getTaxaExtra();
        total += this.getTaxaEntrega();
        if (total < 0) {
            total = 0;
        }
        return total;
    };
    CadastroPedidoService.prototype.alteraValorCarrinhoSOMA = function (valor) {
        if (!valor) {
            valor = 0;
        }
        this.carrinho.total += parseFloat(valor);
    };
    CadastroPedidoService.prototype.alteraValorCarrinhoSUB = function (valor) {
        if (!valor) {
            valor = 0;
        }
        this.carrinho.total -= parseFloat(valor);
    };
    CadastroPedidoService.prototype.removeItemCar = function (item) {
        var indeArray;
        for (var x in this.carrinho.itens) {
            if (this.carrinho.itens[x] === item) {
                indeArray = x;
            }
        }
        this.carrinho.itens.splice(indeArray, 1);
    };
    CadastroPedidoService.prototype.atualizaItem = function (item, indiceitemarray) {
        console.log('#atualizaItem');
        console.log(indiceitemarray);
        console.log('===========');
        for (var x in this.carrinho.itens) {
            if (this.carrinho.itens[x].indiceitemarray === indiceitemarray) {
                this.carrinho.itens[x] = item;
                console.log('Att item');
                console.log(item);
            }
        }
    };
    CadastroPedidoService.prototype.atualizaTotalComTaxa = function () {
        // funcao é chamada somente quando for para enviar o pedido para o servidor
        this.carrinho.total_pedido = this.getTotalCarrinho();
    };
    CadastroPedidoService.prototype.setTipoSheet = function (tipo, bottomSheet) {
        this.tiposheet = tipo;
        this.bottomSheet = bottomSheet;
    };
    CadastroPedidoService.prototype.getTipoSheet = function () {
        return this.tiposheet;
    };
    CadastroPedidoService.prototype.onclickEntregaTipo = function () {
        var _this = this;
        if (this.servico.getDadosEmpresa().formasfuncionamento.tipo === '2') {
            // Verifica as formas de servico da empresa
            this.servico.mostrarMensagem('O estabelecimento só aceita pedidos para retirada');
            return;
        }
        // Se a taxa de entrega foi alterada manualmente nao altera pela taxa do bairro
        if (!this.taxaEntregaAltManual) {
            this.setTaxaEntrega(this.servico.getDadosEmpresa().taxa_entrega);
        }
        else {
            this.setTaxaEntrega(this.taxaEntregaAltManual);
        }
        this.setTipoPedido(this.getConfigTipoPedido().entrega);
        this.bottomSheet.dismiss();
        setTimeout(function () { _this.servico.mostrarMensagem('Pedido para entrega'); }, 700);
    };
    CadastroPedidoService.prototype.onclickRetiradaTipo = function () {
        var _this = this;
        if (this.servico.getDadosEmpresa().formasfuncionamento.tipo === '1') {
            // Verifica as formas de servico da empresa
            this.servico.mostrarMensagem('O estabelecimento só aceita pedidos para entrega');
            return;
        }
        this.setTaxaEntrega(0);
        this.setTipoPedido('retirada');
        this.bottomSheet.dismiss();
        setTimeout(function () { _this.servico.mostrarMensagem('Pedido para retirada'); }, 700);
    };
    CadastroPedidoService.prototype.onClickFp = function (item) {
        // if (item.nome === 'Dinheiro' || item.nome === 'dinheiro') { this.onclickFPDinheiro(item); }
        // if (item.nome === 'cartao' || item.nome === 'Cartão') { this.onclickFPCartao(); }
        /*if (item.nome === 'Fiado' || item.nome === 'Fiado') {
          this.carrinho.item_pagamento.status = false;
         }
        */
        this.addFp(item);
        this.bottomSheet.dismiss();
        /*
        this.setFormaPag({tipo: item.nome, nome: item.nome, troco: ''});
        setTimeout( () => {
           this.servico.mostrarMensagem('Pagamento selecionado: ' + item.nome);
           if (item.nome === 'Tranferência bancária') {
             console.log('Selecionar o banco');
             this.funcaoEmitter.emit();
            }
      
           if (item.nome.toLowerCase() === 'cartão'
           || item.nome.toLowerCase() === 'cartão de crédito'
           || item.nome.toLowerCase() === 'cartão de débito'
           || item.nome.toLowerCase() === 'cartão poupança') {
              console.log('Selecionar o banco');
              this.selecionarCartao.emit(item);
             }
      
      
          }, 700 );
      */
    };
    CadastroPedidoService.prototype.onclickFPDinheiro = function (item) {
        var _this = this;
        console.log('onclickFPDinheiro');
        console.log(item);
        if (this.servico.getDadosEmpresa().formaspagamento[0].disponivel === false) {
            // Verifica as formas de pagamento da empresa
            this.servico.mostrarMensagem('Este estabelecimento não aceita pagamento em dinheiro');
            return;
        }
        this.bottomSheet.dismiss();
        this.setFormaPag({ tipo: 'dinheiro', nome: 'dinheiro', troco: '' });
        this.carrinho.item_pagamento.status = false;
        setTimeout(function () { _this.servico.mostrarMensagem('Pagamento em dinheiro selecionado'); }, 700);
    };
    CadastroPedidoService.prototype.onclickFPCartao = function () {
        var _this = this;
        this.bottomSheet.dismiss();
        if (this.servico.getDadosEmpresa().formaspagamento[1].disponivel === false) {
            // Verifica as formas de pagamento da empresa
            this.servico.mostrarMensagem('Este estabelecimento não aceita pagamento em cartão');
            return;
        }
        this.setFormaPag({ tipo: 'cartão', nome: 'cartão', troco: '' });
        setTimeout(function () { _this.servico.mostrarMensagem('Pagamento com cartão selecionado'); }, 700);
    };
    CadastroPedidoService.prototype.verificaFpsTotal = function () {
        var total = 0;
        this.carrinho.formasPagamento.forEach(function (element) {
            total += parseFloat(element.valor);
        });
        return total;
    };
    CadastroPedidoService.prototype.verificaFp = function () {
        // Se existir forma de pagamento selecionada retornar  true
        var statusErro = false;
        this.carrinho.formasPagamento.forEach(function (element) {
            statusErro = true;
        });
        return statusErro;
    };
    CadastroPedidoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CadastroPedidoService);
    return CadastroPedidoService;
}());
exports.CadastroPedidoService = CadastroPedidoService;
