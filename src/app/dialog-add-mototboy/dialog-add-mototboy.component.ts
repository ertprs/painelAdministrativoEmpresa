import { Component, OnInit, Inject } from '@angular/core';
import { ServicoService } from '../servico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudServicoService } from '../crud-servico.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-mototboy',
  templateUrl: './dialog-add-mototboy.component.html',
  styleUrls: ['./dialog-add-mototboy.component.css']
})
export class DialogAddMototboyComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogAddMototboyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    if (this.data.acao === 'add') {
    this.form = this.fb.group({
      nome: [null, Validators.required],
      email: [null, Validators.required],
      telefone: [null, Validators.required],
      senha: [null, Validators.required],
      cpf: [null, Validators.required],
      cnh: [null, Validators.required],
      placa: [null, Validators.required],
      rua: [null, Validators.required],
      numero: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      cep: [null, Validators.required],
      rg: [null, Validators.required],
    });

  } else {

  }

  }



}
