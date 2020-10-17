import { TelaUmComponent } from './tela-um/tela-um.component';
import { Component, Inject, OnInit } from '@angular/core';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TelaDoisComponent } from './tela-dois/tela-dois.component';

@Component({
  selector: 'app-estoque-logistica',
  templateUrl: './estoque-logistica.component.html',
  styleUrls: ['./estoque-logistica.component.css']
})
export class EstoqueLogisticaComponent implements OnInit {

  columnsToDisplay = ['data', 'valor_pedido', 'local_saida', 'local_chegada', 'previsao_chegada',
  'tipo_entrada', 'quantidade', 'produtos', 'bt1'];
  dataSource = [];
  dadosItemLogista: any;

  constructor(public servapp: ServicoService, private crud: CrudServicoService, public dialog: MatDialog) { }

  ngOnInit(): void {
   this.f1();
  }

  f1() {

    const accallback = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) { this.servapp.mostrarMensagem(r.detalhes.mensagem); } else {
        this.dataSource = r.resultado.itens;
      }
      console.log(r);
    };
    this.crud.post_api('logistica', accallback, '');
  }

  onClickAdd() {
    const dialogRef = this.dialog.open(TelaUmComponent, {
      width: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.dadosItemLogista = result;
        this.tela2();
      }
    });
  }

  tela2() {
    const dialogRef = this.dialog.open(TelaDoisComponent, {
      width: '450px',
      data: this.dadosItemLogista
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.dadosItemLogista.produto = result.produto;
        this.dadosItemLogista.quantidade = result.quantidade;
        this.dadosItemLogista.precoCompra = result.precoCompra;
        this.dadosItemLogista.tipoEntrada = result.tipoEntrada;
        console.log(this.dadosItemLogista);

        this.f1();
      }
    });
  }

    lacarEstoque(item) {

    const accallback = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) { this.servapp.mostrarMensagem(r.detalhes.mensagem); } else {
        this.f1();
        this.servapp.mostrarMensagem(r.resultado.mensagem);
      }
      console.log(r);
    };
    this.crud.post_api('addEstoqueItemLogistica', accallback, item.id);
  }

}
