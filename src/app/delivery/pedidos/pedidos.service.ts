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

      this.servapp.setStatusEmpresaHorarioProgramado(data.resultado.status_empresa_horario);

      this.servapp.setListaEntregas(data.resultado.entregas);

      try {
        // Faz chamada no aplicativo CORDOVA
        parent.postMessage({acao: 'pedidoPendente', data: this.pedidos}, '*');
      } catch (e) { console.log(e); }

    });
  }

  consultaTodosPedidos(filtro: any) {
    this.statusloadpedidos = true;
    this.crud.get_api('consulta_todos_pedidos&id=' + this.servapp.getDadosEmpresa().id +
      '&datai=' + filtro.datai +
      '&dataf=' + filtro.dataf).subscribe(data => {
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


  solicitaMotoboy(idPedido: any, element: any) {
    element.statusBtSm = true;
    const loginres = () => {
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.mensagem);
      } else {
        this.servapp.mostrarMensagem(r.mensagem);
        element.status_motoboy = 1;
        // this.consultaPedidos();
      }
      setTimeout(() => {
        this.statusBtSm = false;
      }, 500);
    };
    const data = { id_pedido: idPedido, id_empresa: this.servapp.getDadosEmpresa().id };
    this.crud.post_api('solicita_motoboy_pedido', loginres, data, false);
  }

  cacelarSolicitacaoMotoboy(idPedido, element) {
    const loginres = () => {
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.mensagem);
      } else {
        this.servapp.mostrarMensagem(r.mensagem);
        element.statusBtSm = false;
        element.status_motoboy = 0;
        // this.consultaPedidos();
      }
    };
    const data = { id_pedido: idPedido, id_empresa: this.servapp.getDadosEmpresa().id };
    this.crud.post_api('cancelar_solicitacao_motoboy', loginres, data, true);
  }

  onClickAttStatusPedido(statusPedido, idPedido, element) {

    const loginres = () => {
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.detalhes);
      } else {
        this.servapp.mostrarMensagem(r.resultado.itens.detalhes);
        element.status_pedido = statusPedido;
        switch (statusPedido) {
          case 1 : { element.status_texto = 'Aceito';  element.status_pedido = statusPedido; } break;
          case 2 : { element.status_texto = 'Pronto para sair';  element.status_pedido = statusPedido; } break;
          case 3 : { element.status_texto = 'Pronto para retirar';  element.status_pedido = statusPedido; } break;
          case 4 : { element.status_texto = 'A caminho';  element.status_pedido = statusPedido; } break;
          case 5 : { element.status_texto = 'Entregue';  element.status_pedido = statusPedido; } break;
          case 6 : { element.status_texto = 'Concluído';  element.status_pedido = statusPedido; } break;
          default : {
            element.status_texto = 'Carregando...';
            this.consultaPedidos();
          }
        }
      }

    };

    const params = element;
    const data = { id_pedido: idPedido, id_empresa: this.servapp.getDadosEmpresa().id, status: statusPedido, params };
    this.crud.post_api('att_status_pedido', loginres, data, false);

  }

  onClickAttStatusDelivery(statusDelivery) {
    const loginres = () => {
      const r = this.servapp.getRespostaApi();
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
