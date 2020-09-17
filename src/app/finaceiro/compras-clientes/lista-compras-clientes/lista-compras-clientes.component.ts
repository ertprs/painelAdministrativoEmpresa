import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lista-compras-clientes',
  templateUrl: './lista-compras-clientes.component.html',
  styleUrls: ['./lista-compras-clientes.component.css']
})
export class ListaComprasClientesComponent implements OnInit {

  columnsToDisplay = ['c1', 'c2', 'c3', 'c4', 'c5'];
  dataSource = [];

  constructor() { }

  ngOnInit(): void {

  }

}
