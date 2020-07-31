import { PedidosService } from './../../pedidos/pedidos.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(public servpedidos: PedidosService) { }

  ngOnInit(): void {

    // this.historico = this.servpedidos.getPedido();
/*
    this.produtosPedido = [{
    id: '1',
    nome: 'Artesanal Frango',
    preco: 100.0,
    total: '200',
    desconto: '0',
    qnt: 2,
    observacao: 'Sem cebola, com muito molho de tomate',
    adicionais: [
      {qnt: '1', nome: 'Bacon', preco: '7'},
      {qnt: '1', nome: 'Sem Sal', preco: '7'},
      {qnt: '1', nome: 'Fanta', preco: '7'},
    ]
}];
*/

  }



}
