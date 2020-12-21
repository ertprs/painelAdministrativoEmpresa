import { CrudServicoService } from 'src/app/crud-servico.service';
import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-faturas',
  templateUrl: './faturas.component.html',
  styleUrls: ['./faturas.component.css']
})
export class FaturasComponent implements OnInit {

  columnsToDisplay = ['id', 'status', 'termos', 'periodo', 'total', 'pdf', 'boleto'];
  dataSource = [];
  sst = false;
  token = '';
  constructor(private crud: CrudServicoService, public servico: ServicoService) { }

  ngOnInit(): void {
    this.f5();
    this.token = this.servico.getToken();
  }

  f5() {
    this.crud.get_api('faturas').subscribe(data => {
        this.dataSource = data.resultado;
    });
  }

}
