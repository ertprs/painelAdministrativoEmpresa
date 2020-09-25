import { PagarDividaComponent } from './../pagar-divida/pagar-divida.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-pedidos-fiado',
  templateUrl: './pedidos-fiado.component.html',
  styleUrls: ['./pedidos-fiado.component.css']
})
export class PedidosFiadoComponent implements OnInit {


  columnsToDisplay = ['c0', 'c1', 'c2', 'c3', 'c4', 'c5'];
  dataSource = [];

  clientes = [];

  constructor(private servico: ServicoService, private crud: CrudServicoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = [];

    this.consultaPedidosFiado();
  }


  consultaPedidosFiado() {

    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.resultado.mensagem); } else {
        // this.servico.mostrarMensagem(r.resultado.mensagem);
        this.dataSource = r.resultado.itens;
      }
      console.log(r);
    };
    this.crud.post_api('consulta_pedido_fiado', accallback, '');
  }

  onClickPagar(element): void {
    const dialogRef = this.dialog.open(PagarDividaComponent, {
      width: '450px',
      data: {item: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
       
    });
  }

}