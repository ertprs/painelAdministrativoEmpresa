import { Component, OnInit } from '@angular/core';
import { DialogAddMototboyComponent } from '../dialog-add-mototboy/dialog-add-mototboy.component';
import { MatDialog } from '@angular/material/dialog';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';

@Component({
  selector: 'app-mototboys',
  templateUrl: './mototboys.component.html',
  styleUrls: ['./mototboys.component.css']
})
export class MototboysComponent implements OnInit {

  displayedColumns: string[] = ['op', 'op2', 'c1', 'c2', 'c3', 'add'];
  itens = [];


  constructor(private crud: CrudServicoService, private servico: ServicoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('consulta_ent_lista_emp').subscribe(data => {
       console.log(data);
       this.itens = data.resultado;
    });
}

add(): void {
  const dialogRef = this.dialog.open(DialogAddMototboyComponent, {
    width: '450px',
    data: {acao: 'add'}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
    this.f1(result) ;
    }
  });
}

onClickEditar(item): void {
  const dialogRef = this.dialog.open(DialogAddMototboyComponent, {
    width: '450px',
    data: {acao: 'editar', usuario: item}
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
      this.servico.mostrarMensagem(r.detalhes);
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('editarPerfilEntregador', accallback, form);
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
  this.crud.post_api('cadatrar_motoboy', accallback, form);
}

removerItem(item) {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('remover_motoboy', accallback, item);

}

}
