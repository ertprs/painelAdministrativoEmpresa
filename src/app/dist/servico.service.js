"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ServicoService = void 0;
var core_1 = require("@angular/core");
var lodash_1 = require("lodash");
var ServicoService = /** @class */ (function () {
    // tslint:disable-next-line: max-line-length
    function ServicoService(snackBar, inicioServico, config) {
        this.snackBar = snackBar;
        this.inicioServico = inicioServico;
        this.config = config;
        this.dadosEntregador = false;
        this.dadosCliente = false;
        this.defaultImg = '/assets/semImg.png';
        // private urlapi = 'http://192.168.0.112/sistema_zecarlos/apiVulto/?api=apiEstabelecimento&acao=';
        this.urlapi = 'HOST DEFINIDO NO ARQUIVO JSON EM ASSETS';
        this.API = 'DEFINIDO NO ARQUIVO JSON EM ASSETS';
        this.statusLogado = false;
        this.token = '';
        this.listaEntregadores = [];
        this.listaEntregas = [];
        this.quantidadeEntOn = 0;
        this.notificar = false;
        this.mostrarNot = true;
        this.attListaEntregasEstatus = false;
        this.statusentPedeai = false;
        this.cardapioDigtal = '0';
        this.statusDelivery = false;
        this.statusSistemaDelivery = false;
        this.fSistema = [];
    }
    ServicoService.prototype.getApiAcao = function (acao) {
        console.log(this.urlapi + '?acao=' + acao + '&token=' + this.token + '&api=' + this.API);
        return this.urlapi + '?acao=' + acao + '&token=' + this.token + '&api=' + this.API;
    };
    ServicoService.prototype.setHost = function (host, api) {
        this.urlapi = host;
        this.API = api;
    };
    ServicoService.prototype.getDefaultImage = function () {
        return this.defaultImg;
    };
    ServicoService.prototype.getEntregadoeSelecionado = function () {
        return this.dadosEntregador;
    };
    ServicoService.prototype.setEntregadoeSelecionado = function (entregador) {
        this.dadosEntregador = entregador;
    };
    ServicoService.prototype.getClienteSelecionado = function () {
        return this.dadosCliente;
    };
    ServicoService.prototype.setClienteSelecionado = function (cliente) {
        this.dadosCliente = cliente;
    };
    ServicoService.prototype.getStatusLogado = function () {
        return this.statusLogado;
    };
    ServicoService.prototype.setDadosLogin = function (dados) {
        console.log(dados);
        this.token = dados.dados_conta.token;
        this.dadosEmpresa = dados.dados_conta;
        this.dadosLogin = dados.dados_conta;
        this.listaCidades = dados.cidade.lista_cidades;
        this.listaCidadesEntrega = dados.cidade.lista_cidades_entrega;
        this.cardapioDigtal = this.dadosEmpresa.cardapio_digital;
        // this.listaBairros = dados;
        if (this.statusLogado === false) {
            // document.getElementById('btnav').click();
        }
        this.statusLogado = true;
        this.config.iniciarConfig();
        this.setStatusDelivery(this.dadosEmpresa.status_delivery);
        this.setStatusSistemaDelivery(this.dadosEmpresa.sistema_delivery);
    };
    ServicoService.prototype.retornaDataHoraAtual = function () {
        var dNow = new Date();
        // tslint:disable-next-line: max-line-length
        var localdate = dNow.getDate() + '/' + (dNow.getMonth() + 1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
        return localdate;
    };
    ServicoService.prototype.getDadosLogin = function () {
        return this.dadosLogin;
    };
    ServicoService.prototype.setRespostaApi = function (resp) {
        this.respApi = resp;
    };
    ServicoService.prototype.getRespostaApi = function () {
        return this.respApi;
    };
    ServicoService.prototype.getToken = function () {
        return this.token;
    };
    ServicoService.prototype.setListaNotificacoesNoFiltro = function (lista) {
        this.listaNotificacoes = lista;
    };
    ServicoService.prototype.setListaNotificacoes = function (lista) {
        if (!lista) {
            return;
        }
        // tslint:disable-next-line: prefer-for-of
        for (var a = 0; a < lista.length; a++) {
            if (lista[a].notificar === true) {
                this.notificar = true;
                console.log('notificar');
                this.openSnackBar(lista[a].texto_notificacao, 'Fechar');
            }
        }
        if (this.notificar === true) {
            this.notificar = false;
            this.playAudio();
            this.setMostrarNost(false);
        }
        this.listaNotificacoes = lista;
    };
    ServicoService.prototype.getListaNotificacoes = function () { return this.listaNotificacoes; };
    ServicoService.prototype.getDadosEmpresa = function () { return this.dadosEmpresa; };
    ServicoService.prototype.addListaEntregador = function (item) {
        this.listaEntregadores.push(item);
    };
    ServicoService.prototype.setListaEntregador = function (lista) {
        // só adiciona o entregador na lista se ele ainda nao estiver adicionado
        if (this.getsetQntEntOn() === 0) {
            this.listaEntregadores = [];
            return;
        }
        if (this.listaEntregadores.length === 0) {
            this.listaEntregadores = lista;
        }
        else {
            try {
                if (lista.length === this.listaEntregadores.length || lista.length > this.listaEntregadores.length) {
                    for (var key in lista) {
                        var adicionado = false;
                        // tslint:disable-next-line: forin
                        for (var key2 in this.getListaEntregador()) {
                            if (lista[key].id === this.getListaEntregador()[key2].id) {
                                // console.log('entregador ja adicionado na lista, entao deve ser atualizado');
                                this.getListaEntregador()[key2].coordenadas[0] = lista[key].coordenadas[0];
                                this.getListaEntregador()[key2].coordenadas[1] = lista[key].coordenadas[1];
                                adicionado = true;
                            }
                        }
                        if (adicionado === false) {
                            console.warn('ADD ENTREGADOR NA LISTA!');
                            this.addListaEntregador(lista[key]);
                        }
                        else {
                            // entregador ja adicionado
                        }
                    }
                }
                else {
                    // tslint:disable-next-line: forin
                    for (var key in this.listaEntregadores) {
                        var adicionado = false;
                        for (var key2 in lista) {
                            if (lista[key2].id === this.getListaEntregador()[key].id) {
                                adicionado = true;
                            }
                        }
                        if (adicionado === false) {
                            console.log('remover item');
                            console.log(this.listaEntregadores[key]);
                            this.listaEntregadores[key].coordenadas[0] = 0;
                            this.listaEntregadores[key].coordenadas[1] = 0;
                        }
                    }
                }
            }
            catch (e) {
                console.log(e);
            }
        }
    };
    ServicoService.prototype.getListaEntregador = function () { return this.listaEntregadores; };
    ServicoService.prototype.mostrarMensagem = function (msg) {
        // alert(msg);
        this.openSnackBar(msg, 'Fechar');
    };
    ServicoService.prototype.getListaCidades = function () { return this.listaCidadesEntrega; };
    ServicoService.prototype.setListaBairros = function (lista) { console.log('Bairros inseridos com sucesso!'); this.listaBairros = lista; };
    ServicoService.prototype.getListaBairros = function () { return this.listaBairros; };
    ServicoService.prototype.setEntrega = function (entrega) { return this.entregaSelecionada = entrega; };
    ServicoService.prototype.getEntrega = function () { return this.entregaSelecionada; };
    ServicoService.prototype.setFormEditarCliente = function (formEditarCliente) { return this.formEditarCliente = formEditarCliente; };
    ServicoService.prototype.getFormEditarCliente = function () { return this.formEditarCliente; };
    ServicoService.prototype.addObjListaEntrega = function () {
    };
    ServicoService.prototype.setListaEntregas = function (listaEntregas) {
        if (lodash_1.isEqual(this.listaEntregas, listaEntregas) === false) {
            this.listaEntregas = listaEntregas;
        }
    };
    ServicoService.prototype.getListaEntregas = function () { return this.listaEntregas; };
    ServicoService.prototype.setQntEntOn = function (qnt) { return this.quantidadeEntOn = qnt; };
    ServicoService.prototype.getsetQntEntOn = function () { return this.quantidadeEntOn; };
    ServicoService.prototype.setMotoboysEmpresa = function (lista) { return this.listaMotoboysEmpresa = lista; };
    ServicoService.prototype.getMotoboysEmpresa = function () { return this.listaMotoboysEmpresa; };
    ServicoService.prototype.setDialogapp = function (lista) { return this.dialogapp = lista; };
    ServicoService.prototype.getDialogapp = function () { return this.dialogapp; };
    ServicoService.prototype.setClientesEmpresa = function (lista) { return this.clientesEmpresa = lista; };
    ServicoService.prototype.getClientesEmpresa = function () { return this.clientesEmpresa; };
    ServicoService.prototype.playAudio = function () {
        var audio = new Audio();
        audio.src = 'https://www.xdelssy.com.br/sis_entregas/php/audio/notification.mp3';
        audio.load();
        audio.play();
    };
    ServicoService.prototype.getMostrarNost = function () {
        return this.mostrarNot;
    };
    ServicoService.prototype.setMostrarNost = function (status) {
        this.mostrarNot = status;
    };
    ServicoService.prototype.openSnackBar = function (message, action) {
        this.snackBar.open(message, action, {
            duration: 4000
        });
    };
    ServicoService.prototype.getEntregaPedeAi = function () {
        return this.entregaPedeAi;
    };
    ServicoService.prototype.setEntregaPedeAi = function (entrega) {
        this.entregaPedeAi = entrega;
    };
    ServicoService.prototype.setStatusEntregaPedeai = function (status) {
        this.statusentPedeai = status;
    };
    ServicoService.prototype.getStatusEntregaPedeai = function () {
        return this.statusentPedeai;
    };
    ServicoService.prototype.getStatusCardapioDigital = function () {
        return this.cardapioDigtal;
    };
    ServicoService.prototype.getStatusDelivery = function () {
        return this.statusDelivery;
    };
    ServicoService.prototype.setStatusDelivery = function (status) {
        this.statusDelivery = status;
    };
    ServicoService.prototype.setStatusSistemaDelivery = function (status) {
        this.statusSistemaDelivery = status;
    };
    ServicoService.prototype.getStatusSistemaDelivery = function () { return this.statusSistemaDelivery; };
    ServicoService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ServicoService);
    return ServicoService;
}());
exports.ServicoService = ServicoService;
