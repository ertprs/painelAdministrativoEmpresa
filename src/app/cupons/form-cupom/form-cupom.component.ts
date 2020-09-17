import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-cupom',
  templateUrl: './form-cupom.component.html',
  styleUrls: ['./form-cupom.component.css']
})
export class FormCupomComponent implements OnInit {


  form: FormGroup;
  iddes: any;


  constructor(public dialogRef: MatDialogRef<FormCupomComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { tipo: string, nomeDialog: string, item: any }, private fb: FormBuilder) { }

  ngOnInit(): void {

    if (this.data.item) {
        this.iddes = this.data.item.id;
    } else {
      this.iddes = 0;
    }


    if (this.data.tipo === 'add') {

      this.form = this.fb.group({
        id_destino: [this.iddes, Validators.required],
        titulo: [null, Validators.required],
        texto: [null, Validators.required],
        regras: [null, Validators.required],
        valor: [null, Validators.required],
        datafim: [null, Validators.required],
        pedido_min: [null, Validators.required],

      });
    } else {
      console.log('Form editar');
      console.log(this.data.item);
      this.form = this.fb.group({
        id: [this.data.item.id, Validators.required],
        id_destino: [this.data.item.id_destino, Validators.required],
        titulo: [this.data.item.titulo, Validators.required],
        texto: [this.data.item.texto, Validators.required],
        regras: [this.data.item.regras, Validators.required],
        valor: [this.data.item.valor, Validators.required],
        datafim: [this.data.item.datafim, Validators.required],
        pedido_min: [this.data.item.pedido_min, Validators.required],
      });
    }


  }

}
