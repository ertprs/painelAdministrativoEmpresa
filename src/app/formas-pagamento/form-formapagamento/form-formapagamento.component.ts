import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-formapagamento',
  templateUrl: './form-formapagamento.component.html',
  styleUrls: ['./form-formapagamento.component.css']
})
export class FormFormapagamentoComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<FormFormapagamentoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { tipo: string, nomeDialog: string, item: any }, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data);

    if (this.data.tipo === 'add') {

    this.form = this.fb.group({
      status: [null, Validators.required],
      nome: [null, Validators.required],
      descricao: [null, Validators.required],
    });

  } else {
    console.log('Form editar');
    console.log(this.data.item);
    this.form = this.fb.group({
      id: [this.data.item.id, Validators.required],
      status: [this.data.item.status,  Validators.required],
      nome: [this.data.item.nome, Validators.required],
      descricao: [this.data.item.descricao, Validators.required],

    });
  }

  }

}