import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { AdicionarBancoComponent } from '../conciliacao-bancaria/adicionar-banco/adicionar-banco.component';

@Component({
  selector: 'app-consolidacao-dinheiro',
  templateUrl: './consolidacao-dinheiro.component.html',
  styleUrls: ['./consolidacao-dinheiro.component.css']
})
export class ConsolidacaoDinheiroComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'entregador', 'c8', 'c9', 'c2', 'c3', 'c5', 'c6'];
  dataSource: any;
  total: any;
  form: FormGroup;
  totalDesc: any;
  constructor(private servico: ServicoService, private crud: CrudServicoService, public dialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit(): void {
     this.form = this.fb.group({
       porcentagem: [''],
       datai: [''],
       dataf: [''],
     });

     this.conciliacaoDin();

  }

  onfcalldelsuc(evento) {
    console.log(evento);
    this.conciliacaoDin();
  }

  conciliacaoDin() {
    const fcall = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes.resultado.mensagem);
      } else {
        this.dataSource = r.resultado.itens.lista;
        this.total = r.resultado.itens.total;
        this.totalDesc = r.resultado.itens.total_valor_conciliado;
      }
    };
    this.crud.post_api('conciliacaoDinheiro', fcall, this.form.value );
  }

  adicionarbanco() {
    const dialogRef = this.dialog.open(AdicionarBancoComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  lancarFluxo(element, porcentagem) {
    const fcall = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.resultado.mensagem);
      } else {
        this.servico.mostrarMensagem(r.resultado.mensagem);
        this.conciliacaoDin();
      }
    };
    this.crud.post_api('lancarConsolidacaoDinheiro', fcall,
{ id_pagamento: element.id, porc: porcentagem, operador: this.servico.getDadosEmpresa().operador.nome } );
  }
}
