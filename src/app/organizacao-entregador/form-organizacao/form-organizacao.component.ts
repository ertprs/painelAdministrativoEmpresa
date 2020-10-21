import { CrudServicoService } from './../../crud-servico.service';
import { ServicoService } from './../../servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-organizacao',
  templateUrl: './form-organizacao.component.html',
  styleUrls: ['./form-organizacao.component.css']
})
export class FormOrganizacaoComponent implements OnInit {

  form: FormGroup;
  entregadores: any;
  constructor(private fb: FormBuilder,  public dialogRef: MatDialogRef<FormOrganizacaoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private servico: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      data: [this.data],
      entregador: [''],
      horai: [''],
      horaf: [''],
      descricao: [''],
    });
    this.consultaEntregagores();
  }

  consultaEntregagores() {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {  this.servico.mostrarMensagem(r.resultado.mensagem);  } else {
        /*this.servico.mostrarMensagem(r.resultado.mensagem);*/
        if (r.resultado) {
          this.entregadores = r.resultado;
        }
      }
    };
    this.crud.post_api('consulta_ent_lista_emp', accallback, '');
  }


  confirmar() {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {  this.servico.mostrarMensagem(r.resultado.mensagem);  } else {
        this.servico.mostrarMensagem(r.resultado.mensagem);
        if (r.resultado) {
          this.dialogRef.close(true);
        }
      }
    };
    this.crud.post_api('addOrgEnt', accallback, this.form.value);
  }


}
