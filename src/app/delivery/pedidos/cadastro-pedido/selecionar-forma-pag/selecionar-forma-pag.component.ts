import { ValorItemPagamentoComponent } from './../valor-item-pagamento/valor-item-pagamento.component';
import { ServicoService } from './../../../../servico.service';
import { CadastroPedidoService } from './../cadastro-pedido.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-selecionar-forma-pag',
  templateUrl: './selecionar-forma-pag.component.html',
  styleUrls: ['./selecionar-forma-pag.component.css']
})
export class SelecionarFormaPagComponent implements OnInit {

  constructor(public servcard: CadastroPedidoService, public servico: ServicoService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  openDialog(element): void {

    this.servcard.bottomSheet.dismiss();

    setTimeout( () => {


          const dialogRef = this.dialog.open(ValorItemPagamentoComponent, {
            width: '250px',
            data: element
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
            this.servcard.addFp(result);
          });


  } , 800 );
  }

}
