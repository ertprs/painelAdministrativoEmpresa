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
    formaspagamento: '',
    comprovante: '',
    dadoscliente: {
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
    tipopedido: '',
    endereco: any,
    formapagamento: '',
    desconto: '',
    info: '',
    troco: '',
    total: '',
    subtotal: '',
    taxaentrega: '',
    cupom: any,
    detalhes: {}
  };
  private audio1 = new Audio('assets/audio/pedido.mp3');
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
    }, 4000);
  }

  consultaPedidos() {
      this.statusloadpedidos = true;
      // console.log('#consultaEntregas');
      this.crud.get_api('pedidos&id=' + this.servapp.getDadosEmpresa().id).subscribe(data => {
        // console.log(data);
        this.qntPedidosEmaberto = data.qnt_pedidos_pendente;
        this.statusloadpedidos = false;
        this.servapp.setStatusDelivery(data.status_loja.status_empresa);
        if (isEqual(this.pedidos, data.lista_pedidos) === false) {
          this.pedidos = data.lista_pedidos;
        }

        this.statusNotificar = data.notificar;
        if (this.statusNotificar === true) {
          this.playAudio1();
        }
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
      this.qntPedidosEmaberto = data.qnt_pedidos_pendente;
      this.statusloadpedidos = false;

      if (isEqual(this.pedidos, data.lista_pedidos) === false) {
        this.todospedidos = data.lista_pedidos;
      }

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
    console.log(this.crud.post_api('solicita_motoboy_pedido', loginres, data));
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
    console.log(this.crud.post_api('cancelar_solicitacao_motoboy', loginres, data));
  }

  onClickAttStatusPedido(statusPedido, idPedido, params) {

    const loginres = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.mensagem);
      } else {
        this.servapp.mostrarMensagem(r.detalhes);
        this.consultaPedidos();

      }

    };


    const data = { id_pedido: idPedido, id_empresa: this.servapp.getDadosEmpresa().id, status: statusPedido, params };
    this.crud.post_api('att_status_pedido', loginres, data);

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
    this.crud.post_api('att_status_delivery', loginres, data);
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
