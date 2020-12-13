import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-total',
  templateUrl: './barra-total.component.html',
  styleUrls: ['./barra-total.component.css']
})
export class BarraTotalComponent implements OnInit {

  @Input() valor  = 0;
  @Input() nome  = '';
  @Input() naomostrarReal  = false;

  constructor() { }

  ngOnInit(): void {
  }

}
