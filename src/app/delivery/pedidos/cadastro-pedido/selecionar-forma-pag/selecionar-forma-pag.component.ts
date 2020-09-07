import { CadastroPedidoService } from './../cadastro-pedido.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selecionar-forma-pag',
  templateUrl: './selecionar-forma-pag.component.html',
  styleUrls: ['./selecionar-forma-pag.component.css']
})
export class SelecionarFormaPagComponent implements OnInit {

  constructor(public servcard: CadastroPedidoService) { }

  ngOnInit(): void {
  }

}
