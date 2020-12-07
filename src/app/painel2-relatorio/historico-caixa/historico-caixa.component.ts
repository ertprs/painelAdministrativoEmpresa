import { FormGroup, FormBuilder } from '@angular/forms';
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
  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'dado_fechado'];
  total = 0;
  form: FormGroup;
  statosHist = false;
  constructor(private servico: ServicoService, private crud: CrudServicoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      di: [null],
      df: [null],
    });

    this.histCaixa();

  }

  onclickItensTb(item: any) {
    item.carregandoQuery = true;

    this.dataSource.forEach(element => {
      element.hidden = false;
    });

    const fcall = () => {
      const r = this.servico.getRespostaApi();
      item.carregandoQuery = false;
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes);
        item.hidden = false;
      } else {
        item.itens = r.resultado;
        item.hidden = true;
      }
    };
    this.crud.post_api('detalhamentoCaixa', fcall, item.id );

  }

  histCaixa() {
    this.statosHist = false;
    const fcall = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      this.statosHist = false;

      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes.resultado.mensagem);
      } else {
        this.dataSource = r.resultado.itens.lista;
        this.total = r.resultado.itens.total;
      }
    };
    this.crud.post_api('hist_caixa', fcall, this.form.value );
  }


}
