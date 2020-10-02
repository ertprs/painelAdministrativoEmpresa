import { ComprasClienteService } from './compras-cliente.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CrudServicoService } from 'src/app/crud-servico.service';

@Component({
  selector: 'app-compras-clientes',
  templateUrl: './compras-clientes.component.html',
  styleUrls: ['./compras-clientes.component.css']
})
export class ComprasClientesComponent implements OnInit {

  columnsToDisplay = ['motoboy'];
  dataSource = [];
  clientes = [];

  myControl = new FormControl();
  form: FormGroup;
  filteredOptions: Observable<string[]>;

  constructor( private crud: CrudServicoService, private fb: FormBuilder, private servComp: ComprasClienteService) { }

  ngOnInit(): void {

    this.dataSource = [ ];

   // this.estoque();
   // this.f5();

    this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''),
        map(value => this.filter(value))
      );

    this.form = this.fb.group({
        clienteNome: [''],
        dataInicio: [''],
        dataFim: [''],
      });

    this.consultaPedidoCliente('periodo');
  }

  f5() {
    this.crud.get_api('cons_cliente_lista_emp').subscribe(data => {
       console.log(data);
       this.clientes = data;
    });
}


consultaClienteFiltro(valor) {
  console.log(this.form.value);
  if (!this.form.value) { return; }
  this.crud.get_api('consulta_cliente_filtro&nome=' + this.form.value.clienteNome).subscribe(data => {
    console.log(data);
    this.clientes = data.resultado;
 });
}

consultaPedidoCliente(tipo) {
    console.log('#consultaPedidoCliente');
    console.log(this.form.value.clienteNome);
    // tslint:disable-next-line: max-line-length

    this.crud.get_api('consulta_pedidos_cliente_filtro&nome=' +
    this.form.value.clienteNome +
    '&filtro=' + tipo +
    '&dataInicio=' + this.form.value.dataInicio +
    '&dataFim=' + this.form.value.dataFim

    ).subscribe(data => {
      console.log(data);
      this.servComp.setListaPedidos( data.resultado );
   });
}


 filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.clientes.filter(option => option.toLowerCase().includes(filterValue));
}







}
