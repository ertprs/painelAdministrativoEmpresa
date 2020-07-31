import { Component, OnInit } from '@angular/core';
import { InicioService } from '../inicio/inicio.service';

@Component({
  selector: 'app-dialog-entregador',
  templateUrl: './dialog-entregador.component.html',
  styleUrls: ['./dialog-entregador.component.css']
})
export class DialogEntregadorComponent implements OnInit {

  constructor(public inicioServico: InicioService) { }

  ngOnInit(): void {
  }

}
