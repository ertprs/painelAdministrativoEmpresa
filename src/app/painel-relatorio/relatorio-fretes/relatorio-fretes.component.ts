import { Component, OnInit } from '@angular/core';
import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';

@Component({
  selector: 'app-relatorio-fretes',
  templateUrl: './relatorio-fretes.component.html',
  styleUrls: ['./relatorio-fretes.component.css']
})
export class RelatorioFretesComponent implements OnInit {

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
        console.log('relatorio');
        console.log(r);
      }
    };
    this.crud.post_api('relatorio_frete', fcallb, '');
}

}
