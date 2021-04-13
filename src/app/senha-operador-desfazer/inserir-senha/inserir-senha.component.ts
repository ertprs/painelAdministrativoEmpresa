import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-inserir-senha',
  templateUrl: './inserir-senha.component.html',
  styleUrls: ['./inserir-senha.component.css']
})
export class InserirSenhaComponent implements OnInit {

  acaoApi = '';
  statusBT = false;


  form: FormGroup;

  constructor( public dialogRef: MatDialogRef<InserirSenhaComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any, private servico: ServicoService,
               private crud: CrudServicoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.acaoApi = this.data.acaoApi;
    this.form = this.fb.group({
      senha: [''],
      params: [this.data.params]
    });
  }


  onclick() {
    this.statusBT = true;

    const fcall = () => {
      this.statusBT = false;

      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.resultado.mensagem);
      } else {
        this.servico.mostrarMensagem(r.resultado.mensagem);
        this.dialogRef.close(r);
      }
    };
    this.crud.post_api(this.acaoApi, fcall, this.form.value);
  }


}
