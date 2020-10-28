import { CrudServicoService } from 'src/app/crud-servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServicoService } from 'src/app/servico.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alterar-senha',
  templateUrl: './alterar-senha.component.html',
  styleUrls: ['./alterar-senha.component.css']
})
export class AlterarSenhaComponent implements OnInit {
  form: FormGroup;
  btS = false;
  constructor(private fb: FormBuilder, private crud: CrudServicoService, private servico: ServicoService,
              public dialogRef: MatDialogRef<AlterarSenhaComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nvSenha: [''],
      cSenha: [''],
      senha: [''],
    });

  }

  confirmar() {
    this.btS = true;
    const loginres = () => {
      const r = this.servico.getRespostaApi();
      setTimeout(() => { this.btS = false; }, 1500);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes);
      } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.dialogRef.close();
      }
    };
    this.crud.post_api('attsenha', loginres, this.form.value, true);
  }
}


