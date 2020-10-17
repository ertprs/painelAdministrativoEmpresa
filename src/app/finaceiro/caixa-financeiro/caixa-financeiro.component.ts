import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { PedidosService } from 'src/app/delivery/pedidos/pedidos.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-caixa-financeiro',
  templateUrl: './caixa-financeiro.component.html',
  styleUrls: ['./caixa-financeiro.component.css']
})
export class CaixaFinanceiroComponent implements OnInit {

  columnsToDisplay = ['c0', 'c1', 'c2', 'c3', 'c4'];
  columnsToDisplay2 = ['c0', 'c1', 'c2', 'c3', 'c4'];
  dataSource = [];
  dataSource2 = [];
  totalPagamento = 0;
  dataCaixa = '';
  statusCaixaFechado = '';

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService, private router: Router) { }

  ngOnInit(): void {
    this.statusCaixa();
  }
  statusCaixa() {
    this.crud.get_api('statuscaixa').subscribe(data => {
        this.dataSource = data.resultado.itens.fps;
        this.totalPagamento = data.resultado.itens.total_pagamento;
        this.dataCaixa = data.resultado.itens.dataCaixa;
        this.statusCaixaFechado = data.resultado.itens.status_caixa;
    });
}


lancarCaixa() {
  const fcall = () => {
    console.log('callback');
    const r = this.servapp.getRespostaApi();
    console.log(r);
    if (r.erro === true) {
      this.servapp.mostrarMensagem(r.resultado.mensagem);
    } else {
      this.servapp.mostrarMensagem(r.resultado.mensagem);
    }
  };
  this.crud.post_api('lancarCaixa', fcall, this.dataSource );
}

}
