import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CancelarPedidoComponent } from '../cancelar-pedido/cancelar-pedido.component';
import { PedidosService } from '../pedidos.service';

@Component({
  selector: 'app-aviso-taxa-pedido',
  templateUrl: './aviso-taxa-pedido.component.html',
  styleUrls: ['./aviso-taxa-pedido.component.css']
})
export class AvisoTaxaPedidoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CancelarPedidoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
