import { PedidosService } from './../../pedidos/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-dialog-pedido',
  templateUrl: './dialog-pedido.component.html',
  styleUrls: ['./dialog-pedido.component.css']
})
export class DialogPedidoComponent implements OnInit {

  displayedColumns: string[] = ['status', 'info'];
  detalhespedido: string[] = ['quantidade', 'item', 'observacao', 'adicionais', 'desconto', 'preco', 'total'];
  historico: any;
  produtosPedido: any;
  btCstatus = false;

  constructor(public servpedidos: PedidosService, private servapp: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {


  }


  onClickAttStatusPedido(statusPedido) {
    this.btCstatus = true;
    const loginres = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.mensagem);
        this.btCstatus = false;
      } else {
        this.servapp.mostrarMensagem(r.mensagem);
        this.servpedidos.consultaPedidos();
      }
    };
    const data = { id_pedido: this.servpedidos.getPedido().id, id_empresa: this.servapp.getDadosEmpresa().id, status: statusPedido};
    console.log( this.crud.post_api('att_status_pedido', loginres, data ) );
  }



}