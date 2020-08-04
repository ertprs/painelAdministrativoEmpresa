import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  private pedidos: any;
  private pedido: {
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
      formapagamento: '',
      desconto: '',
      info: '',
      troco: '',
      total: '',
      subtotal: '',
      taxaentrega: '',
      detalhes: {}
  };

  constructor(private crud: CrudServicoService, private servapp: ServicoService) { }

  consultaEntregas() {
    console.log('#consultaEntregas');
    this.crud.get_api('pedidos&id=' + this.servapp.getDadosEmpresa().id).subscribe(data => {
      console.log(data);

      this.pedidos = data;
    });
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

}
