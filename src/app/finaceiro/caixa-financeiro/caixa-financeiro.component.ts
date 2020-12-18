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
  totalValores = 0;
  dataCaixaAberto = '';
  horaCaixaAberto = '';
  statusCaixaFechado = false;
  operador = '';
  operadorFechou = '';
  dataCaixaFechado = '';
  horaCaixaFechado = '';

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
    public servapp: ServicoService, private crud: CrudServicoService, private router: Router) { }

  ngOnInit(): void {
    this.statusCaixa();
  }

  abrirCaixa() {
    const fcall = () => {
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.resultado.mensagem);
      } else {
        this.servapp.setStatusCaixa(true);
        this.statusCaixaFechado = true;
        this.servapp.mostrarMensagem(r.resultado.mensagem);
        /*  */
        this.dataSource = r.resultado.itens.caixa.itens.fps;
        this.totalPagamento = r.resultado.itens.caixa.itens.total_pagamento;
        this.totalValores = r.resultado.itens.caixa.itens.total_valores;

        this.dataCaixaAberto = r.resultado.itens.caixa.itens.itens.info;
        this.horaCaixaAberto = r.resultado.itens.caixa.itens.itens.horario;
        this.operador = r.resultado.itens.caixa.itens.itens.operador;

        this.dataCaixaFechado = r.resultado.itens.caixa.itens.itens.data_fechou;
        this.horaCaixaFechado = r.resultado.itens.caixa.itens.itens.hora_fechou;
        this.operadorFechou = r.resultado.itens.caixa.itens.itens.operador_fechou;

      }
    };
    this.crud.post_api('abrirCaixa', fcall, this.dataSource, true);
  }

  statusCaixa() {
    this.crud.get_api('statuscaixa').subscribe(data => {

      if (data.erro === true) {
        return;
      }

      this.dataSource = data.resultado.itens.fps;
      this.totalPagamento = data.resultado.itens.total_pagamento;
      this.totalValores = data.resultado.itens.total_valores;

      this.dataCaixaAberto = data.resultado.itens.itens.info;
      this.horaCaixaAberto = data.resultado.itens.itens.horario;
      this.operador = data.resultado.itens.itens.operador;

      this.dataCaixaFechado = data.resultado.itens.itens.data_fechou;
      this.horaCaixaFechado = data.resultado.itens.itens.hora_fechou;
      this.operadorFechou = data.resultado.itens.itens.operador_fechou;


      this.statusCaixaFechado = data.resultado.itens.status_caixa;
    });
  }

  getTotalValores() {
    let total = 0;
    this.dataSource.forEach(element => {
      total += element.valor;
    });
    return total;
  }

  getTotalDiferenca() {
    let total = 0;
    this.dataSource.forEach(element => {
      total += element.valor - element.total;
    });
    return total;
  }

  lancarCaixa() {
    const fcall = () => {
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.resultado.mensagem);
      } else {
        this.servapp.mostrarMensagem(r.resultado.mensagem);
        this.servapp.setStatusCaixa(false);
        this.statusCaixaFechado = false;
      }
    };
    this.crud.post_api('fecharCaixa', fcall, this.dataSource, true);
  }

}
