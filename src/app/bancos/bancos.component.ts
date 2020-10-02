import { CrudServicoService } from './../crud-servico.service';
import { ServicoService } from './../servico.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBancoComponent } from './form-banco/form-banco.component';

@Component({
  selector: 'app-bancos',
  templateUrl: './bancos.component.html',
  styleUrls: ['./bancos.component.css']
})
export class BancosComponent implements OnInit {

  displayedColumns: string[] = ['c0', 'c1', 'c2', 'c3', 'c5', 'c6'];
  dataSource: any;

  constructor(public dialog: MatDialog, private servico: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.consultabancos();
  }

  consultabancos() {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.resultado.mensagem); } else {
      }
      this.dataSource = r.resultado;
    };
    this.crud.post_api('consultaContasBancaria', accallback, '');
  }

  clickAdd() {
    const dialogRef = this.dialog.open(FormBancoComponent, {
      width: '250px',
      data: {acao: 'add'}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) { 
        this.requestAPI('cadastrarContaBancaria', result);
      }
    });
  }

  clickEditar(element) {
    const dialogRef = this.dialog.open(FormBancoComponent, {
      width: '250px',
      data: {acao: 'editar', item: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
         this.requestAPI('editarContaBancaria', result);
      }
    });
  }

  requestAPI(acao, param) {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem);  } else {
        this.servico.mostrarMensagem(r.mensagem);
        this.servico.setClienteSelecionado(false);
        this.consultabancos();
      }
      console.log(r);
    };
    this.crud.post_api(acao, accallback, param);
  }

  clickremove(element) {
    this.requestAPI('removerContaBancaria', element.id);
  }

}
