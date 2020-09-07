import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-formulario-usuario',
  templateUrl: './formulario-usuario.component.html',
  styleUrls: ['./formulario-usuario.component.css']
})
export class FormularioUsuarioComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<FormularioUsuarioComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    if (this.data.acao === 'add') {
    this.form = this.fb.group({
      tipo: [null, Validators.required],
      nome: [null, Validators.required],
      email: [null, Validators.required],
      senha: [null, Validators.required],
      acao: [this.data.acao],
    });

  } else {
    this.form = this.fb.group({
      id: [this.data.usuario.id],
      tipo: [this.data.usuario.tipo, Validators.required],
      nome: [this.data.usuario.nome, Validators.required],
      email: [this.data.usuario.email, Validators.required],
      senha: [this.data.usuario.senha, Validators.required],
      acao: [this.data.acao],
    });

  }

  }

}
