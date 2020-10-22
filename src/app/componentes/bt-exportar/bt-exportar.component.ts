import { CrudServicoService } from './../../crud-servico.service';
import { ServicoService } from './../../servico.service';
import { Component, Input, OnInit } from '@angular/core';
import { tsXLXS } from 'ts-xlsx-export';
@Component({
  selector: 'app-bt-exportar',
  templateUrl: './bt-exportar.component.html',
  styleUrls: ['./bt-exportar.component.css']
})
export class BtExportarComponent implements OnInit {

  @Input() lista: Array<any>;
  @Input() nomeArquivo;
  constructor(private servico: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    console.log('app-bt-exportar');
  }

  exportar() {
    tsXLXS().exportAsExcelFile(this.lista).saveAsExcelFile(this.nomeArquivo);
  }

}
