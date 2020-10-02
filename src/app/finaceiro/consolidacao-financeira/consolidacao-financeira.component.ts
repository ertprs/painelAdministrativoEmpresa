import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudServicoService } from './../../crud-servico.service';
import { ServicoService } from './../../servico.service';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarDespesaComponent } from './adicionar-despesa/adicionar-despesa.component';
import { Component, OnInit } from '@angular/core';
import { DetalhesItemTabelaComponent } from './detalhes-item-tabela/detalhes-item-tabela.component';

@Component({
  selector: 'app-consolidacao-financeira',
  templateUrl: './consolidacao-financeira.component.html',
  styleUrls: ['./consolidacao-financeira.component.css']
})
export class ConsolidacaoFinanceiraComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'c2'];
  displayedColumnsDespesas: string[] = ['c1', 'c3'];

  displayedColumnsTotalDesp: string[] = ['c1', 'c2'];

  dataSource = [];
  dataSourceDespesa = [];
  despesas = [];
  fatliquido = [];

  resumoDespesa = 0;
  totalReceita = 0;
  totalLiquido = 0;

  form: FormGroup;

  constructor(private dialog: MatDialog, private servico: ServicoService, private crud: CrudServicoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.despesas = [];

    this.form = this.fb.group({
      dataInicio: [''],
      dataFim: [''],
    });

    this.dataSourceDespesa = [
    ];

    this.dataSource = [
    ];

    this.fatliquido = [
    ];

    this.consultaTabela();
  }

  consultaTabela() {

    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.resultado.mensagem); } else {
        // this.servico.mostrarMensagem(r.resultado.mensagem);
        this.despesas = r.resultado.itens.itens;
        this.resumoDespesa = r.resultado.itens.total_despesa;
        this.totalReceita = r.resultado.itens.total_receita;
        this.totalLiquido = r.resultado.itens.total_liquido;
      }
    };
    this.crud.post_api('consolidacao_financeira', accallback, '');
  }

  consultaTabelaFiltro() {

    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.resultado.mensagem); } else {
        // this.servico.mostrarMensagem(r.resultado.mensagem);
        this.despesas = r.resultado.itens.itens;
        this.resumoDespesa = r.resultado.itens.total_despesa;
        this.totalReceita = r.resultado.itens.total_receita;
        this.totalLiquido = r.resultado.itens.total_liquido;
      }
    };
    this.crud.post_api('consolidacao_financeira', accallback, {tipo: 'periodo',
    datai: this.form.value.dataInicio, dataf: this.form.value.dataFim});
  }


  addDespesa(): void {
    const dialogRef = this.dialog.open(AdicionarDespesaComponent, {
      width: '450px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

      if (!result) { return; }

      const fcall = () => {
        console.log('callback');
        const r = this.servico.getRespostaApi();
        console.log(r);
        if (r.erro === true) {
          this.servico.mostrarMensagem(r.resultado.mensagem);
        } else {
          this.servico.mostrarMensagem(r.resultado.mensagem);
          this.consultaTabela();
        }
      };
      this.crud.post_api('lancardespesa', fcall, result );

    });
  }

  detalhesItem(element): void {
    const dialogRef = this.dialog.open(DetalhesItemTabelaComponent, {
      width: '450px',
      data: {item: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
