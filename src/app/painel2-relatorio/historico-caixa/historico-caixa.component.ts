import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-historico-caixa',
  templateUrl: './historico-caixa.component.html',
  styleUrls: ['./historico-caixa.component.css']
})
export class HistoricoCaixaComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];

  constructor(private servico: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.histCaixa();
  }

  histCaixa() {
    const fcall = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes.resultado.mensagem);
      } else {
        this.dataSource = r.resultado.itens;
      }
    };
    this.crud.post_api('hist_caixa', fcall, '' );
  }


}
