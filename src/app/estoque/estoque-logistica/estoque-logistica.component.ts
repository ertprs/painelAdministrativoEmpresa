import { TelaUmComponent } from './tela-um/tela-um.component';
import { Component, Inject, OnInit } from '@angular/core';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TelaDoisComponent } from './tela-dois/tela-dois.component';
import { UsuariosAdmService } from 'src/app/usuarios/usuarios-adm.service';
import { Tela3Component } from './tela3/tela3.component';

@Component({
  selector: 'app-estoque-logistica',
  templateUrl: './estoque-logistica.component.html',
  styleUrls: ['./estoque-logistica.component.css']
})
export class EstoqueLogisticaComponent implements OnInit {

  columnsToDisplay = ['data', 'valor_pedido', 'local_saida', 'local_chegada', 'previsao_chegada', 'produtos', 'bt1'];
  dataSource = [];
  dadosItemLogista: any;

  btAddLog = true;
  btAdd = true;

  params = {
    saida: '', chegada: '', valorPedido: '', previsaoEntrega: '',
    itens: [],
  };

  constructor(public servapp: ServicoService, private crud: CrudServicoService, public dialog: MatDialog,
              public us: UsuariosAdmService) { }

  ngOnInit(): void {
  this.btAdd = this.us.getPermissoessuario()[5].children[4].status;
  this.btAddLog = this.us.getPermissoessuario()[5].children[5].status;
  this.f1();
  }

  verProdutos(item: any) {
    console.log(item);
    const dialogRef = this.dialog.open(Tela3Component, {
      width: '850px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.f1();
      }
    });
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
      data: {parametros: this.params}
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
      width: '850px',
      data: this.dadosItemLogista
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.f1();
      }
    });
  }

    lacarEstoque(item) {

    const accallback = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) { this.servapp.mostrarMensagem(r.resultado.mensagem); } else {
        this.f1();
        this.servapp.mostrarMensagem(r.resultado.mensagem);
      }
      console.log(r);
    };
    this.crud.post_api('addEstoqueItemLogistica', accallback, item.id);
  }

}
