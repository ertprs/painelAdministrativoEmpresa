import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { DialogAddMototboyComponent } from 'src/app/dialog-add-mototboy/dialog-add-mototboy.component';
import { InserirMotivoEntregadorComponent } from 'src/app/mototboys/inserir-motivo-entregador/inserir-motivo-entregador.component';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-lista-empresas',
  templateUrl: './lista-empresas.component.html',
  styleUrls: ['./lista-empresas.component.css']
})
export class ListaEmpresasComponent implements OnInit {

  displayedColumns: string[] = ['status_conta', 'op', 'c1', 'c2', 'c3', 'add'];
  itens = [];


  constructor(private crud: CrudServicoService, public servico: ServicoService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.f5();
  }

  attStatusEnt(item, statusConta) {
    let statusC = false;
    if (statusConta._checked) { statusC = false; } else { statusC = true; }

    if (!statusC) {
      setTimeout ( () => { 
         item.status_conta = true;
         statusConta._checked = true;
      } , 100);

      const dialogRef = this.dialog.open(InserirMotivoEntregadorComponent, {
        width: '450px',
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result) {
          this.crud.get_api('att_status_entregador&id=' + item.id + '&status=' + statusC + '&motivo=' + result).subscribe(data => {
            item.status_conta = false;
            statusConta._checked = false;
          });
        } else {
          statusConta._checked = true;
          item.status_conta = true;
        }
      });
    }


    if (statusC) {
      this.crud.get_api('att_status_entregador&id=' + item.id + '&status=' + statusC).subscribe(data => {
      });
    } else {

    }

  }

  f5() {
    this.crud.get_api('empresas_cadastradas').subscribe(data => {
      console.log(data);
      this.itens = data;
    });
  }

  add(): void {
    this.router.navigate(['./cadastro-loja']);
  }

  onClickEditar(item): void {
    const dialogRef = this.dialog.open(DialogAddMototboyComponent, {
      width: '450px',
      data: { acao: 'editar', usuario: item }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.f5();
      }
    });
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
