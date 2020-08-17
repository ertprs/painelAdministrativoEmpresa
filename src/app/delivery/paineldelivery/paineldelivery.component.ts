import { ServicoService } from './../../servico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paineldelivery',
  templateUrl: './paineldelivery.component.html',
  styleUrls: ['./paineldelivery.component.css']
})
export class PaineldeliveryComponent implements OnInit {

  constructor(public servapp: ServicoService) { }

  ngOnInit(): void {
  }

}
