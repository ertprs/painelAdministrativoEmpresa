import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-estoque',
  templateUrl: './form-estoque.component.html',
  styleUrls: ['./form-estoque.component.css']
})
export class FormEstoqueComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<FormEstoqueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { tipo: string, nomeDialog: string, item: any }, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: [this.data.item.id, Validators.required],
      nome: [this.data.item.nome, Validators.required],
      descricao: [this.data.item.descricao, Validators.required],
      valor: [this.data.item.valor, Validators.required],

    });

  }

}
