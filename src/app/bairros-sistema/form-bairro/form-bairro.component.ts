import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-bairro',
  templateUrl: './form-bairro.component.html',
  styleUrls: ['./form-bairro.component.css']
})
export class FormBairroComponent implements OnInit {

  form: FormGroup;
  constructor(public dialogRef: MatDialogRef<FormBairroComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {

    console.log(this.data);


    if (this.data.tipo === 'add') {

      this.form = this.fb.group({
        bairro: [null],
        longetude: [null],
        latitude: [null],
        cidade_id: [this.data.item.id_cidade],
      });
    } else {
      console.log('Form editar');
      this.form = this.fb.group({
        id: [this.data.item.id],
        bairro: [this.data.item.nome],
        longetude: [this.data.item.lng],
        latitude: [this.data.item.lat],
        cidade_id: [this.data.item.cidade_id],
      });
    }


  }

}
