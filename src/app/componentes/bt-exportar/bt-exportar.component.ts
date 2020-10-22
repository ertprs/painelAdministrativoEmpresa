import { CrudServicoService } from './../../crud-servico.service';
import { ServicoService } from './../../servico.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bt-exportar',
  templateUrl: './bt-exportar.component.html',
  styleUrls: ['./bt-exportar.component.css']
})
export class BtExportarComponent implements OnInit {

  nomeBt: 'Exportar';
  @Input() lista: Array<any>;
  @Input() acao;
  constructor(private servico: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    console.log('app-bt-exportar');
  }

  exportar() {
    const fcall = () => {
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.resultado.mensagem);
      } else {
        this.servico.mostrarMensagem(r.resultado.mensagem);
      }
    };
    this.crud.post_api(this.acao, fcall, this.lista );
  }

}
