import { ComprasClienteService } from './../compras-cliente.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-compras-clientes',
  templateUrl: './lista-compras-clientes.component.html',
  styleUrls: ['./lista-compras-clientes.component.css']
})
export class ListaComprasClientesComponent implements OnInit {

  columnsToDisplay = ['status', 'c1', 'c2', 'valorpago', 'c3', 'c4', 'c5'];
  columnsToDisplay2 = ['c1'];
   
  constructor(public servCompC: ComprasClienteService) { }

  ngOnInit(): void {

  }

}
