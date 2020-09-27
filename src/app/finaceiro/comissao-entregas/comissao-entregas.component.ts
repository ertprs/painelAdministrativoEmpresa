import { AdicionarPagamentoComponent } from './adicionar-pagamento/adicionar-pagamento.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { PedidosService } from 'src/app/delivery/pedidos/pedidos.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-comissao-entregas',
  templateUrl: './comissao-entregas.component.html',
  styleUrls: ['./comissao-entregas.component.css']
})
export class ComissaoEntregasComponent implements OnInit {

  columnsToDisplay = ['c0','c66', 'c1', 'c3', 'c5', 'c6', 'c4'];
  dataSource: any;

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = [];
    this.consultaPedidosFiado();
  }

  consultaPedidosFiado() {

    const accallback = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) { this.servapp.mostrarMensagem(r.resultado.mensagem); } else {
        // this.servapp.mostrarMensagem(r.resultado.mensagem);
        this.dataSource = r.resultado.itens;
      }
      console.log(r);
    };
    this.crud.post_api('comissao_entregas', accallback, '');
  }

onClickPagar(element) {
  const dialogRef = this.dialog.open(AdicionarPagamentoComponent, {
    width: '250px',
    data: {item: element}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    if (dialogRef) {
      this.consultaPedidosFiado();
    }
  });
}

}
