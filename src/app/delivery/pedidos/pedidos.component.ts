import { PedidosService } from './pedidos.service';
import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from './../../crud-servico.service';
import { DialogPedidoComponent } from './../dialogs/dialog-pedido/dialog-pedido.component';
import { Component, OnInit } from '@angular/core';
import { DialoDelsucgComponent } from 'src/app/dialo-delsucg/dialo-delsucg.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  constructor(private dialog: MatDialog, public servpedidos: PedidosService) { }
  displayedColumns: string[] = ['botoes', 'status', 'nome', 'tipo', 'formapagamento', 'total', 'info', 'id'];
  pedidos = [];
  dialogDelsuc: any;
  statusLoadEntregas: boolean;

  ngOnInit(): void {

    this.statusLoadEntregas = true;
    setTimeout( () => {
      this.servpedidos.consultaEntregas();
    } , 600 );


  }


  onClickPedido(item: any) {
    this.servpedidos.setPedido(item);
    console.log(item);
  }

  onClickverPedido(): void {
    this.dialogDelsuc = this.dialog.open(DialogPedidoComponent, {
      width: '800px',
    });

    this.dialogDelsuc.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }


}


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
