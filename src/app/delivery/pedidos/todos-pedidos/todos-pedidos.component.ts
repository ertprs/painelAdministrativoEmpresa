import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidosService } from '../pedidos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicoService } from 'src/app/servico.service';
import { DialogPedidoComponent } from '../../dialogs/dialog-pedido/dialog-pedido.component';

@Component({
  selector: 'app-todos-pedidos',
  templateUrl: './todos-pedidos.component.html',
  styleUrls: ['./todos-pedidos.component.css']
})
export class TodosPedidosComponent implements OnInit {

  displayedColumns: string[] = ['botoes', 'status', 'nome', 'tipo', 'formapagamento', 'total', 'info', 'statusmotoboy', 'id'];
  pedidos = [];
  statusLoadEntregas: boolean;
  form: FormGroup;
  dialogDelsuc: any;


  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService) { }

  ngOnInit(): void {

    setTimeout( () => {
      this.servpedidos.consultaTodosPedidos();
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
