import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDinamComponent } from '../dialog-dinam/dialog-dinam.component';

@Component({
  selector: 'app-itens-pagamento',
  templateUrl: './itens-pagamento.component.html',
  styleUrls: ['./itens-pagamento.component.css']
})
export class ItensPagamentoComponent implements OnInit {

 
  displayedColumns: string[] = [ 'c00', 'c0', 'c1', 'c2', 'c3', 'c5', 'c4'];
  itens = [];


  constructor(private crud: CrudServicoService, private servico: ServicoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('itens_pagamento').subscribe(data => {
       console.log(data);
       this.itens = data;
    });
}

add() {
  const dialogRef = this.dialog.open(DialogDinamComponent, {
    width: '250px',
    data: {tipo: 'add', nomeDialog: 'itens_formaspagamento'}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    this.f1(result);
  });
}


onClickEditar(i): void {
  const dialogRef = this.dialog.open(DialogDinamComponent, {
    width: '450px',
    data: {tipo: 'editar', nomeDialog: 'itens_formaspagamento', item: i}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
    this.editar(result) ;
    }
  });
}

editar(form) {
  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
      this.servico.mostrarMensagem(r.mensagem);
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('attItenFormaspagamento', accallback, form);
}

f1(form) {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
      this.servico.mostrarMensagem(r.mensagem);
      this.itens = r.mensagem;
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('addItensFormaspagamento', accallback, form);
}

removerItem(item) {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
      this.servico.mostrarMensagem('Item removido');
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('removerItenFormaspagamento', accallback, item);

}


}
