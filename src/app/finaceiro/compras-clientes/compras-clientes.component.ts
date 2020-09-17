import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CrudServicoService } from 'src/app/crud-servico.service';

@Component({
  selector: 'app-compras-clientes',
  templateUrl: './compras-clientes.component.html',
  styleUrls: ['./compras-clientes.component.css']
})
export class ComprasClientesComponent implements OnInit {

  columnsToDisplay = ['motoboy'];
  dataSource = [];

  constructor( private crud: CrudServicoService) { }

  ngOnInit(): void {

    this.dataSource = [
      {nome: 'Cliente 1'},
      {nome: 'Cliente 2'},
      {nome: 'Cliente 3'},
      {nome: 'Cliente 4'},
      {nome: 'Cliente 5'},
    ];

   // this.estoque();
  }
  estoque() {
    this.crud.get_api('consulta_ent_lista_emp').subscribe(data => {
        this.dataSource = data.resultado;
    });
}










}
