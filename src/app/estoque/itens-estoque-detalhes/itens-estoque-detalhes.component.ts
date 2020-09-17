import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { PedidosService } from 'src/app/delivery/pedidos/pedidos.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-itens-estoque-detalhes',
  templateUrl: './itens-estoque-detalhes.component.html',
  styleUrls: ['./itens-estoque-detalhes.component.css']
})
export class ItensEstoqueDetalhesComponent implements OnInit {
  columnsToDisplay = ['c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c7'];
  dataSource = [];

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService, private router: Router) { }

  ngOnInit(): void {
   this.estoque();
  }
  estoque() {
    this.crud.get_api('itens_estoque_det').subscribe(data => {
        this.dataSource = data;
    });
}
}
