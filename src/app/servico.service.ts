import { ChatservicoService } from './chat/chatservico.service';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { InicioService } from './inicio/inicio.service';
import { isEqual } from 'lodash';
import { ConfigServicoService } from './config/config-servico.service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  private dadosEntregador = false;
  private dadosCliente = false;
  // private urlapi = 'https://www.vulto.site/api';
  // private urlapi = 'http://localhost/sistema.vulto/api';
  private urlapi = 'http://192.168.0.108/apivulto/?api=apiEstabelecimento';
  private dir = '&acao=';
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

  // tslint:disable-next-line: max-line-length
  constructor(private snackBar: MatSnackBar, private inicioServico: InicioService, private config: ConfigServicoService, private servicoChat: ChatservicoService, private socket: Socket) { }

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

  getApiAcao(acao: string) {
    return this.urlapi + '' + this.dir + '' + acao + '&token=' + this.token;
  }

  getStatusLogado() {
    return this.statusLogado;
  }

  setDadosLogin(dados: any) {
    console.log(dados);
    this.token = dados.mensagem.dados_conta.token;
    this.dadosEmpresa = dados.mensagem.dados_conta;
    this.dadosLogin = dados.mensagem;
    this.listaCidades = dados.mensagem.cidade.lista_cidades;
    this.listaCidadesEntrega = dados.mensagem.cidade.lista_cidades_entrega;
    this.cardapioDigtal = this.dadosEmpresa.cardapio_digital;
    // this.listaBairros = dados;
    if (this.statusLogado === false) {
      //document.getElementById('btnav').click();
    }
    this.statusLogado = true;
    this.config.iniciarConfig();
    this.servicoChat.adicionaEmpresaChat(this.dadosEmpresa.nome, this.dadosEmpresa.id);
    this.setStatusDelivery(this.dadosEmpresa.status_delivery);
    this.setStatusSistemaDelivery(this.dadosEmpresa.sistema_delivery);

    this.socket.on('coordenadas', data => {
     // console.error(data);
      for (const x in this.listaEntregadores) {
          if (this.listaEntregadores[x].id === data.id) {
            this.listaEntregadores[x].coordenadas = data.coordenadas;
          }
      }

    });

    this.socket.on('qntmt', data => {
      console.error('Quantidade de motoboys online em tempo real');
      console.log(data);
      this.quantidadeEntOn = data;
    });

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
