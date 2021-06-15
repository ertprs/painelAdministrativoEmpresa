import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { Injectable } from '@angular/core';
import { isEqual } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private pedidos: any;
  private pedido: {
    id: '',
    status_pedido: any,
    taxaextra: '',
    formaspagamento: '',
    comprovante: '',
    dadosempresa: any,
    dadoscliente: {
      imagem: '',
      nome: '',
      sobrenome: '',
      tiporesidencia: '',
      complementno: '',
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
      telefone: '',
    },
    historico: [],
    itens: [],
    observacoes: [],
    tipopedido: string,
    endereco: any,
    formapagamento: '',
    desconto: '',
    info: '',
    troco: '',
    total: '',
    subtotal: '',
    taxaentrega: number,
    cupom: any,
    detalhes: {}
  };
  private audio1 = new Audio(this.servapp.urlAudio);
  public statusloadpedidos = false;
  private qntPedidosEmaberto = 0;
  private statusNotificar = false;
  public statusBtSm = false;
  private todospedidos: [];


  constructor(private crud: CrudServicoService, public servapp: ServicoService) {

    setInterval(() => {
      if (this.servapp.getDadosEmpresa().status_delivery) {
        this.consultaPedidos();
      }
    }, this.servapp.getInterPedidos());
  }

  getTotalPedido(): number {
    return parseFloat(this.pedido.total);
  }

  getTaxaExtra(): number {
    return parseFloat(this.pedido.taxaextra);
  }

  consultaPedidos() {
    this.statusloadpedidos = true;
    // console.log('#consultaPEDIDOS');
    this.crud.get_api('pedidos&id=' + this.servapp.getDadosEmpresa().id).subscribe(data => {

      this.qntPedidosEmaberto = data.resultado.pedidos.qnt_pedidos_pendente;
      this.statusloadpedidos = false;
      // this.servapp.setStatusDelivery(data.status_loja.status_empresa);
      if (isEqual(this.pedidos, data.resultado.pedidos.lista_pedidos) === false) {
        this.pedidos = data.resultado.pedidos.lista_pedidos;
      }

      this.statusNotificar = data.resultado.pedidos.notificar;
      if (this.statusNotificar === true) {
        this.playAudio1();
      }

      this.servapp.setListaEntregas(data.resultado.entregas);

      try {
        // Faz chamada no aplicativo CORDOVA
        parent.postMessage({acao: 'pedidoPendente', data: this.pedidos}, '*');
      } catch (e) { console.log(e); }

    });
  }

  consultaTodosPedidos(filtro: any) {
    console.log(filtro);
    this.statusloadpedidos = true;
    console.log('#consultaTodosPedidos');
    this.crud.get_api('consulta_todos_pedidos&id=' + this.servapp.getDadosEmpresa().id +
      '&datai=' + filtro.datai +
      '&dataf=' + filtro.dataf).subscribe(data => {
        console.log(data);
        this.qntPedidosEmaberto = data.resultado.pedidos.qnt_pedidos_pendente;
        this.statusloadpedidos = false;

        // if (isEqual(this.pedidos, data.lista_pedidos) === false) {
        this.todospedidos = data.resultado.pedidos.lista_pedidos;
        // }

        this.statusNotificar = data.notificar;
      });
  }

  getQntPedidoAberto() {
    return this.qntPedidosEmaberto;
  }
  getStatusNotificar() {
    return this.qntPedidosEmaberto;
  }


  solicitaMotoboy(idPedido) {
    this.statusBtSm = true;
    const loginres = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.mensagem);
      } else {
        this.servapp.mostrarMensagem(r.mensagem);
        this.consultaPedidos();
      }
      setTimeout(() => {
        this.statusBtSm = false;
      }, 1000);
    };
    const data = { id_pedido: idPedido, id_empresa: this.servapp.getDadosEmpresa().id };
    this.crud.post_api('solicita_motoboy_pedido', loginres, data, true);
  }

  cacelarSolicitacaoMotoboy(idPedido) {
    const loginres = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.mensagem);
      } else {
        this.servapp.mostrarMensagem(r.mensagem);
        this.consultaPedidos();
      }
    };
    const data = { id_pedido: idPedido, id_empresa: this.servapp.getDadosEmpresa().id };
    this.crud.post_api('cancelar_solicitacao_motoboy', loginres, data, true);
  }

  onClickAttStatusPedido(statusPedido, idPedido, params) {

    const loginres = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.detalhes);
      } else {
        this.servapp.mostrarMensagem(r.resultado.itens.detalhes);
        this.consultaPedidos();

      }

    };


    const data = { id_pedido: idPedido, id_empresa: this.servapp.getDadosEmpresa().id, status: statusPedido, params };
    this.crud.post_api('att_status_pedido', loginres, data, true);

  }

  onClickAttStatusDelivery(statusDelivery) {
    const loginres = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.mensagem);
      } else {
        this.servapp.mostrarMensagem(r.mensagem);
        this.servapp.setStatusDelivery(statusDelivery);
      }
    };
    const data = { id_empresa: this.servapp.getDadosEmpresa().id, status: statusDelivery };
    this.crud.post_api('att_status_delivery', loginres, data, true);
  }

  getPedidos() {
    return this.pedidos;
  }


  setPedido(pedido: any) {
    this.pedido = pedido;
  }
  getPedido() {
    return this.pedido;
  }

  playAudio1() {
    this.audio1.play();
  }

  getTodosPedidos() {
    return this.todospedidos;
  }

}
