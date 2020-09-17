import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDinamComponent } from '../dialog-dinam/dialog-dinam.component';
import { FormFormapagamentoComponent } from './form-formapagamento/form-formapagamento.component';

@Component({
  selector: 'app-formas-pagamento',
  templateUrl: './formas-pagamento.component.html',
  styleUrls: ['./formas-pagamento.component.css']
})
export class FormasPagamentoComponent implements OnInit {

  displayedColumns: string[] = ['c0', 'c1', 'c2', 'c3', 'c4'];
  itens = [];


  constructor(private crud: CrudServicoService, private servico: ServicoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('formas_pag').subscribe(data => {
       console.log(data);
       this.itens = data;
    });
}

add() {
  const dialogRef = this.dialog.open(FormFormapagamentoComponent, {
    width: '250px',
    data: {tipo: 'add', nomeDialog: 'form_formaspagamento'}
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
    data: {tipo: 'editar', nomeDialog: 'form_formaspagamento', item: i}
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
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.mensagem);
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('attFormaspagamento', accallback, form);
}

f1(form) {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
     this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('addFormaspagamento', accallback, form);
}

removerItem(item) {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem('Item removido');
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('removerFormaspagamento', accallback, item);

}

}
