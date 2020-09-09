import { CrudServicoService } from './../../crud-servico.service';
import { ServicoService } from './../../servico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-relatorio-itens',
  templateUrl: './relatorio-itens.component.html',
  styleUrls: ['./relatorio-itens.component.css']
})
export class RelatorioItensComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'c3', 'c4'];
  itens: any;

  constructor(private servapp: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    const fcallb = () => {
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {

      } else {

        this.itens = r.resultado.itens;
        console.log('relatorio_itens');
        console.log(r);
      }
    };
    this.crud.post_api('relatorio_itens', fcallb, '');
}

}
