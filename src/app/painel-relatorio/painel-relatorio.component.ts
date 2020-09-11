import { RelatorioService } from './relatorio.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-painel-relatorio',
  templateUrl: './painel-relatorio.component.html',
  styleUrls: ['./painel-relatorio.component.css']
})
export class PainelRelatorioComponent implements OnInit {

  constructor(public servrelat: RelatorioService) { }

  ngOnInit(): void {
  }

}
