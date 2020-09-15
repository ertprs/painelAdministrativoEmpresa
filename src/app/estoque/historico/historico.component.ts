import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from 'src/app/crud-servico.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  itens: any;


  constructor(private crud: CrudServicoService, private router: Router) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('historico_estoque').subscribe(data => {
        this.itens = data;
    });
}



}
