import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-data-retroativa',
  templateUrl: './data-retroativa.component.html',
  styleUrls: ['./data-retroativa.component.css']
})
export class DataRetroativaComponent implements OnInit {

  statusR = false;
  form: FormGroup;

  constructor(private crud: CrudServicoService, public servico: ServicoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.checarDataR();
    this.form = this.fb.group({
      info: [''],
      status: ['']
    });
  }

  start(st) {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.statusR = r.resultado.status;
        console.log(r.resultado.status);
        this.servico.setStatusDR(r.resultado.status);
      }
      console.log(r);
    };
    this.crud.post_api('iniciardataretroativa', accallback, {status: st, info: this.form.value.info});
  }


  checarDataR() {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.statusR = r.resultado.status;
        this.form.controls.info.setValue(r.resultado.data);
      }
      console.log(r);
    };
    this.crud.post_api('checarDataR', accallback, '');
  }

}
