import { ProgressSistemaService } from './componentes/progress-sistema/progress-sistema.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InicioService } from './inicio/inicio.service';
import { isEqual } from 'lodash';
import { ConfigServicoService } from './config/config-servico.service';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private dadosEntregador = false;
  private dadosCliente = false;
  private defaultImg = '/assets/semImg.png';
  private logoEmpresa = '/assets/logoEmpresa.png';
  private urlapi = 'http://10.0.0.104/sistema_zecarlos/apiVulto/';
  // private urlapi = 'https://jfortalapi.ecig.app/index.php';
  // private urlapi = 'https://api.vulto.site/index.php';
  // private urlapi = 'https://api.dinp.com.br/index.php';
  private API = 'apiEstabelecimento';
  private statusLogado = false;
  private dadosLogin: any;
  private respApi: any;
  private token = '';
  private listaNotificacoes: any;
  private dadosEmpresa: any;
  private listaEntregadores: Array<any> = [];
  private listaCidades: any;
  private listaBairros: any;
  private listaCidadesEntrega: any;
  private entregaSelecionada: any;
  private formEditarCliente: any;
  private listaEntregas: Array<any> = [];
  private quantidadeEntOn = 0;
  private audio: any;
  private notificar = false;
  private mostrarNot = true;
  private listaMotoboysEmpresa: any;
  private dialogapp: any;
  private clientesEmpresa: any;
  private attListaEntregasEstatus = false;
  private entregaPedeAi: any;
  private statusentPedeai = false;
  private cardapioDigtal = '0';
  private statusDelivery = false;
  private statusSistemaDelivery = false;
  private statusFatura = false;
  private fSistema = [];
  private statusCaixa = false;
  private dataRetroativa = false;
  private intervalPedidos = 25000;
  private intervalEntregadores = 7000;
  public versao = '1.0.2';
  public faturas = false;
  public subimgs = false;
  public fidelidade = false;
  public dataRetro = false;
  public altoCalcTxEnt = false;
  public orgEnt = false;
  public configMaster = false;
  public estEnt = false;
  public batEstoque = false;

  public concBanc = false;
  public concCartao = false;
  public concDinheiro = false;
  public contFiado = false;
  public comissaoEntrega = false;
  public concFinanceira = false;
  public financeiro = false;
  public alterarPedido = false;
  public posEstEnt = false;
  public criarRota = false;

  // tslint:disable-next-line: max-line-length
  constructor(private snackBar: MatSnackBar, private inicioServico: InicioService, private config: ConfigServicoService, private servProg: ProgressSistemaService) { }


  getInterEntregadores(): number {
    return this.intervalEntregadores;
  }
  getInterPedidos(): number {
    return this.intervalPedidos;
  }

  setStatusDR(status: boolean) {
    this.dataRetroativa = status;
  }
  getStatusDR(): boolean {
    return this.dataRetroativa;
  }

  setStatusCaixa(status: boolean) {
    this.statusCaixa = status;
  }

  getStatusCaixa(): boolean {
    return this.statusCaixa;
  }

  setStatusfatura(status: boolean) {
    this.statusFatura = status;
  }

  getStatusfatura(): boolean {
    return this.statusFatura;
  }


  getApiAcao(acao: string, mostrarProgresso?: boolean): string {
    if (mostrarProgresso) { this.servProg.showProgress.emit(mostrarProgresso); }

    // console.log(this.urlapi + '?acao=' + acao + '&token=' + this.token + '&api=' + this.API);
    return this.urlapi + '?acao=' + acao + '&token=' + this.token + '&api=' + this.API;
  }

  setHost(host: string, api: string) {
    // this.urlapi = host;
    // this.API = api;
  }

  getDefaultImage() {
    return this.defaultImg;
  }

  getLogoEmpresa() {
    return this.logoEmpresa;
  }

  getEntregadoeSelecionado() {
    return this.dadosEntregador;
  }
  setEntregadoeSelecionado(entregador: any) {
    this.dadosEntregador = entregador;
  }

  getClienteSelecionado() {
    return this.dadosCliente;
  }
  setClienteSelecionado(cliente: any) {
    this.dadosCliente = cliente;
  }


  getStatusLogado() {
    return this.statusLogado;
  }

  setDadosLogin(dados: any) {
    this.token = dados.dados_conta.token;
    this.dadosEmpresa = dados.dados_conta;
    this.dadosLogin = dados.dados_conta;
    this.setStatusDR(dados.status_data_r);
    try {
    this.listaCidades = dados.cidade;
  } catch (e) { console.warn('Cidades não configuradas'); }
    try {
      this.listaCidadesEntrega = dados.cidade;
    } catch (e) { console.warn('Cidades não configuradas'); }

    this.cardapioDigtal = this.dadosEmpresa.cardapio_digital;
    // this.listaBairros = dados;
    if (this.statusLogado === false) {
      // document.getElementById('btnav').click();
    }
    this.statusLogado = true;
    this.config.iniciarConfig();
    this.setStatusDelivery(this.dadosEmpresa.status_delivery);
    this.setStatusSistemaDelivery(this.dadosEmpresa.sistema_delivery);

    this.faturas =  dados.config_dash.faturas;
    this.subimgs =  dados.config_dash.sub_imgs;
    this.fidelidade =  dados.config_dash.fidelidade;
    this.dataRetro =  dados.config_dash.data_retro;
    this.altoCalcTxEnt =  dados.config_dash.alto_calc_tx_ent;
    this.orgEnt =  dados.config_dash.org_ent;
    this.configMaster =  dados.config_dash.config_master;
    this.estEnt =  dados.config_dash.est_ent;
    this.batEstoque =  dados.config_dash.bat_estoque;

    this.concBanc =  dados.config_dash.conc_banc;
    this.concCartao =  dados.config_dash.conc_cartao;
    this.concDinheiro =  dados.config_dash.conc_din;
    this.contFiado =  dados.config_dash.cont_fiado;
    this.comissaoEntrega =  dados.config_dash.com_entrega;
    this.concFinanceira =  dados.config_dash.conc_fin;
    this.financeiro =  dados.config_dash.financeiro;
    this.alterarPedido =  dados.config_dash.alt_pedido;
    this.posEstEnt =  dados.config_dash.pos_est_ent;
    this.criarRota =  dados.config_dash.criar_rota;
  }

  retornaDataHoraAtual() {
    const dNow = new Date();
    // tslint:disable-next-line: max-line-length
    const localdate = dNow.getDate() + '/' + (dNow.getMonth() + 1) + '/' + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
    return localdate;
  }

  getDadosLogin() {
    return this.dadosLogin;
  }

  setRespostaApi(resp: any) {
    this.respApi = resp;
  }
  getRespostaApi() {
    return this.respApi;
  }

  getToken() {
    return this.token;
  }

  setListaNotificacoesNoFiltro(lista: any) {
    this.listaNotificacoes = lista;
  }

  setListaNotificacoes(lista) {
    if (!lista) { return; }
    // tslint:disable-next-line: prefer-for-of
    for (let a = 0; a < lista.length; a++) {
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
  }

  getListaNotificacoes() { return this.listaNotificacoes; }
  getDadosEmpresa() { return this.dadosEmpresa; }


  addListaEntregador(item: any) {
    this.listaEntregadores.push(item);
  }

  setListaEntregador(lista: any) {
    // só adiciona o entregador na lista se ele ainda nao estiver adicionado
    if (this.getsetQntEntOn() === 0) { this.listaEntregadores = []; return; }
    if (this.listaEntregadores.length === 0) {
      this.listaEntregadores = lista;
    } else {

      try {
        if (lista.length === this.listaEntregadores.length || lista.length > this.listaEntregadores.length) {

          for (const key in lista) {
            let adicionado = false;
            // tslint:disable-next-line: forin
            for (const key2 in this.getListaEntregador()) {
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

            } else {
              // entregador ja adicionado

            }
          }

        } else {
          // tslint:disable-next-line: forin
          for (const key in this.listaEntregadores) {
            let adicionado = false;
            for (const key2 in lista) {
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

      } catch (e) { console.log(e); }

    }
  }

  getListaEntregador() { return this.listaEntregadores; }

  mostrarMensagem(msg: string) {
    // alert(msg);
    this.openSnackBar(msg, 'Fechar');
  }

  getListaCidades() { return this.listaCidadesEntrega; }
  setListaBairros(lista: any) { console.log('Bairros inseridos com sucesso!'); this.listaBairros = lista; }
  getListaBairros() { return this.listaBairros; }

  setEntrega(entrega: any) { return this.entregaSelecionada = entrega; }
  getEntrega() { return this.entregaSelecionada; }

  setFormEditarCliente(formEditarCliente: any) { return this.formEditarCliente = formEditarCliente; }
  getFormEditarCliente() { return this.formEditarCliente; }

  addObjListaEntrega() {

  }

  setListaEntregas(listaEntregas: any) {
    if (isEqual(this.listaEntregas, listaEntregas) === false) {
      this.listaEntregas = listaEntregas;
    }
  }
  getListaEntregas() { return this.listaEntregas; }

  setQntEntOn(qnt: number) { return this.quantidadeEntOn = qnt; }
  getsetQntEntOn() { return this.quantidadeEntOn; }

  setMotoboysEmpresa(lista: any) { return this.listaMotoboysEmpresa = lista; }
  getMotoboysEmpresa() { return this.listaMotoboysEmpresa; }

  setDialogapp(lista: any) { return this.dialogapp = lista; }
  getDialogapp() { return this.dialogapp; }

  setClientesEmpresa(lista: any) { return this.clientesEmpresa = lista; }
  getClientesEmpresa() { return this.clientesEmpresa; }

  playAudio() {
    const audio = new Audio();
    audio.src = 'https://www.xdelssy.com.br/sis_entregas/php/audio/notification.mp3';
    audio.load();
    audio.play();
  }

  getMostrarNost() {
    return this.mostrarNot;
  }
  setMostrarNost(status: boolean) {
    this.mostrarNot = status;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }


  getEntregaPedeAi() {
    return this.entregaPedeAi;
  }
  setEntregaPedeAi(entrega: any) {
    this.entregaPedeAi = entrega;
  }

  setStatusEntregaPedeai(status: boolean) {
    this.statusentPedeai = status;
  }
  getStatusEntregaPedeai() {
    return this.statusentPedeai;
  }

  getStatusCardapioDigital() {
    return this.cardapioDigtal;
  }

  getStatusDelivery() {
    return this.statusDelivery;
  }

  setStatusDelivery(status) {
    this.statusDelivery = status;
  }

  setStatusSistemaDelivery(status) {
    this.statusSistemaDelivery = status;
  }
  getStatusSistemaDelivery() { return this.statusSistemaDelivery; }




}
