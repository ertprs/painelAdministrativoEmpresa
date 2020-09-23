import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDinamComponent } from 'src/app/dialog-dinam/dialog-dinam.component';

@Component({
  selector: 'app-retornar-de-motoboy',
  templateUrl: './retornar-de-motoboy.component.html',
  styleUrls: ['./retornar-de-motoboy.component.css']
})
export class RetornarDeMotoboyComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogDinamComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { tipo: string, nomeDialog: string, item: any }, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data);


    this.form = this.fb.group({
      quantidade: ['', Validators.required],
      id_motoboy: [this.data.item.propriedade, Validators.required],
      id_estoque: [this.data.item.id, Validators.required],
      id_item_estoque: [this.data.item.id_item_estoque, Validators.required],
    });
  }
}
