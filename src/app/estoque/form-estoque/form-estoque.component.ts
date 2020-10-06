import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';

@Component({
  selector: 'app-form-estoque',
  templateUrl: './form-estoque.component.html',
  styleUrls: ['./form-estoque.component.css']
})
export class FormEstoqueComponent implements OnInit {

  form: FormGroup;
  itensCatalogo: any;

  constructor(public dialogRef: MatDialogRef<FormEstoqueComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { tipo: string, nomeDialog: string, item: any }, private fb: FormBuilder,
              private crud: CrudServicoService) { }

  ngOnInit(): void {

    if (this.data.tipo === 'add') { this.formadd(); } else { this.formeditar(); }

    this.f5();
  }

  f5() {
    this.crud.get_api('itens_cardapio').subscribe(data => {
      console.log(data);
      this.itensCatalogo = data.resultado;
   });
  }

  formadd() {
    this.form = this.fb.group({
      id_item_estoque: [null],
      quantidade: [null],
      descricao: [null],
      valor: [null, Validators.required],
      tipo_entrada: [null],
    });
  }
  formeditar() {
    this.form = this.fb.group({
      id: [this.data.item.id, Validators.required],
      id_item_estoque: [this.data.item.id, Validators.required],
      quantidade: [this.data.item.nome, Validators.required],
      descricao: [this.data.item.descricao, Validators.required],
      valor: [this.data.item.valor, Validators.required],
      tipo_entrada: [null],
    });
  }
 
}
