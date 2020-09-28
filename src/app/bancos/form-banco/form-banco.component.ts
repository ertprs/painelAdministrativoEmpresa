import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-banco',
  templateUrl: './form-banco.component.html',
  styleUrls: ['./form-banco.component.css']
})
export class FormBancoComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<FormBancoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.acao === 'add') {
      this.formAdd();
    } else { this.formEditar(); }
  }

  formAdd() {
    this.form = this.fb.group({
      nome: [''],
      conta: [''],
      operacao: [''],
      descricao: [''],
    });
  }

  formEditar() {
    this.form = this.fb.group({
      id: [this.data.item.id],
      nome: [this.data.item.nome],
      conta: [this.data.item.conta],
      operacao: [this.data.item.operacao],
      descricao: [this.data.item.descricao],
    });
  }

  onclickAdd() {
    this.dialogRef.close(this.form.value);
  }

}
