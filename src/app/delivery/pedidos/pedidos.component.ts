import { ImpressaoPedidoComponent } from './impressao-pedido/impressao-pedido.component';
import { AvisoTaxaPedidoComponent } from './aviso-taxa-pedido/aviso-taxa-pedido.component';
import { CancelarPedidoComponent } from './cancelar-pedido/cancelar-pedido.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { PedidosService } from './pedidos.service';
import { ServicoService } from 'src/app/servico.service';
import { DialogPedidoComponent } from './../dialogs/dialog-pedido/dialog-pedido.component';
import { Component, OnInit } from '@angular/core';
import { DialoDelsucgComponent } from 'src/app/dialo-delsucg/dialo-delsucg.component';
import { MatDialog } from '@angular/material/dialog';
import { SelecionarMotoboyComponent } from 'src/app/estoque/itens-estoque-detalhes/selecionar-motoboy/selecionar-motoboy.component';
import { SelecionarMotoboyEntregaComponent } from './selecionar-motoboy-entrega/selecionar-motoboy-entrega.component';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {


   constructor(public servpedidos: PedidosService, public servapp: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {

    setTimeout( () => {
      this.servpedidos.consultaPedidos();
    } , 600 );

  }


}
