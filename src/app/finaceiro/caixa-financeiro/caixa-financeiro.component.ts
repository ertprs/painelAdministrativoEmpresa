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

  columnsToDisplay = ['c5', 'c0', 'c1', 'c2', 'c3', 'c4'];
  dataSource = [];

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = [
      {nome: 'Dinheiro', total: 5.000, valorInserido: '', diferenca: 0, },
      {nome: 'Fiado', total: 1.000, valorInserido: '', diferenca: 0, },
      {nome: 'Cartão', total: 7.000, valorInserido: '', diferenca: 0, },
    ];
   // this.estoque();
  }
  estoque() {
    this.crud.get_api('itens_estoque_det').subscribe(data => {
        this.dataSource = data;
    });
}
}
