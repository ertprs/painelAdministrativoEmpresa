import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
 
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
  filteredOptions: Observable<string[]>;
  
  
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
    this.f5();

    this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''),
        map(value => this.filter(value))
      );
  }

  f5() {
    this.crud.get_api('cons_cliente_lista_emp').subscribe(data => {
       console.log(data);
       this.clientes = data;
    });
}

  estoque() {
    this.crud.get_api('consulta_ent_lista_emp').subscribe(data => {
        this.dataSource = data.resultado;
    });
}


 filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.clientes.filter(option => option.toLowerCase().includes(filterValue));
}







}
