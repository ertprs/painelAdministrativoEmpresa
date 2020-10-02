import { CrudServicoService } from './../../crud-servico.service';
import { ServicoService } from './../../servico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-controle-fiado',
  templateUrl: './controle-fiado.component.html',
  styleUrls: ['./controle-fiado.component.css']
})
export class ControleFiadoComponent implements OnInit {

  columnsToDisplay = ['c1', 'c2'];
  dataSource = [];

  constructor(private servico: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.dataSource = [];

  }


 

}
