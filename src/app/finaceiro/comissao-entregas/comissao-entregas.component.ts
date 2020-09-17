import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { PedidosService } from 'src/app/delivery/pedidos/pedidos.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-comissao-entregas',
  templateUrl: './comissao-entregas.component.html',
  styleUrls: ['./comissao-entregas.component.css']
})
export class ComissaoEntregasComponent implements OnInit {

  columnsToDisplay = ['c0', 'c1', 'c2', 'c3', 'c4'];
  dataSource = [];

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService, private router: Router) { }

  ngOnInit(): void {
    this.dataSource = [
      {nome: 'Motoboy 1', total_entregas: 15, total_pagar: 30, status_pago: false, },
      {nome: 'Motoboy 2', total_entregas: 65, total_pagar: 73, status_pago: true, },
      {nome: 'Motoboy 3', total_entregas: 100, total_pagar: 96, status_pago: false, },
    ];
   // this.estoque();
  }
  estoque() {
    this.crud.get_api('itens_estoque_det').subscribe(data => {
        this.dataSource = data;
    });
}
}