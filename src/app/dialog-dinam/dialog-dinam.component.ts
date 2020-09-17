import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-dinam',
  templateUrl: './dialog-dinam.component.html',
  styleUrls: ['./dialog-dinam.component.css']
})
export class DialogDinamComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogDinamComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { tipo: string, nomeDialog: string, item: any }, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data);

    

    if (this.data.tipo === 'add') {

    this.form = this.fb.group({
      cidade: [null, Validators.required],
      id_cidade: [null, Validators.required],
      status: [null, Validators.required],

      bairro: [null, Validators.required],
      longetude: [null, Validators.required],
      latitude: [null, Validators.required],
      cidade_id: [null, Validators.required],

      nome: [null, Validators.required],
      descricao: [null, Validators.required],
      // itens pag.
      id_formapagamento: [null, Validators.required],
      imagem: [null, Validators.required],

      senha: [null, Validators.required],
      quantidade: [null, Validators.required],
    });

  } else {
    console.log('Form editar');
    console.log(this.data.item);
    this.form = this.fb.group({
      id: [this.data.item.id, Validators.required],
      cidade: [this.data.item.nome, Validators.required],
      id_cidade: [this.data.item.id_cidade,  Validators.required],
      status: [this.data.item.status,  Validators.required],

      bairro: [this.data.item.nome, Validators.required],
      longetude: [this.data.item.lng, Validators.required],
      latitude: [this.data.item.lat, Validators.required],
      cidade_id: [this.data.item.cidade_id, Validators.required],

      nome: [this.data.item.nome, Validators.required],
      descricao: [this.data.item.descricao, Validators.required],

      id_formapagamento: [this.data.item.id_formapagamento, Validators.required],
      imagem: [this.data.item.imagem, Validators.required],

     
/*
      quantidade: ['', Validators.required],
      id_motoboy: [this.data.item.motoboy.dados.id, Validators.required],
      id_estoque: [this.data.item.id, Validators.required],
*/

    });
  }

  }

}
