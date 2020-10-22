import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServicoService } from './servico.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public servico: ServicoService) { }
  title = 'Dashboard';
  statusLogin = false;
}
