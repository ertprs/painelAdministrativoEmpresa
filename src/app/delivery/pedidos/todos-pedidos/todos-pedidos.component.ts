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

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService) { }

  ngOnInit(): void {


  }
}
