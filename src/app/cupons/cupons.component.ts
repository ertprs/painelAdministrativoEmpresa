import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDinamComponent } from '../dialog-dinam/dialog-dinam.component';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.css']
})
export class CuponsComponent implements OnInit {


  displayedColumns: string[] = ['c7', 'c0', 'c1', 'c2', 'c8', 'c5', 'c6', 'c3', 'c4'];
  itens = [];
  dadosCupomAdd: any;
  acao: string;

  constructor(private crud: CrudServicoService, private servico: ServicoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('cupons').subscribe(data => {
       console.log(data);
       this.itens = data.resultado;
    });
}

add() {
  const dialogRef = this.dialog.open(DialogDinamComponent, {
    width: '350px',
    data: {tipo: 'add', nomeDialog: 'form_cupom'}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);

    if (result) {
      this.dadosCupomAdd = result;
      this.acao = 'add';
      this.inSenha();
    }

  });
}

inSenha() {
  const dialogRef = this.dialog.open(DialogDinamComponent, {
    width: '350px',
    data: {tipo: 'add', nomeDialog: 'form_pass'}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);

    if (result) {
      console.log('Envia backend');
      console.log(result);
      this.dadosCupomAdd.senha = result.senha;
      if (this.acao === 'add') {
      this.f1(this.dadosCupomAdd);
      } else {
        this.f2(this.dadosCupomAdd);
      }
    }

  });
}

reabrir() {

  const dialogRef = this.dialog.open(DialogDinamComponent, {
    width: '350px',
    data: {tipo: 'editar', nomeDialog: 'form_cupom', item: this.dadosCupomAdd}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);

    if (result) {
      this.inSenha();
    }

  });

}

onClickRemover(item) {
  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); this.reabrir();  } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('removerCupom', accallback, item);
}


f1(form) {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); this.reabrir();  } else {
      this.servico.mostrarMensagem('Cupom adicionado');
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('enviarCupom', accallback, form);
}

f2(form) {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); this.reabrir();  } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('editarCupom', accallback, form);
}



onClickEditar(element) {
  const dialogRef = this.dialog.open(DialogDinamComponent, {
    width: '350px',
    data: {tipo: 'editar', nomeDialog: 'form_cupom', item: element}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);

    if (result) {
      this.dadosCupomAdd = result;
      this.acao = 'editar';
      this.inSenha();
    }

  });
}



}
