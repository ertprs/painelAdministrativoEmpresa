import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/entregas/entregas.component';

@Component({
  selector: 'app-respavaliacao',
  templateUrl: './respavaliacao.component.html',
  styleUrls: ['./respavaliacao.component.css']
})
export class RespavaliacaoComponent implements OnInit {

  item: any;
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RespavaliacaoComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder) {  }

  ngOnInit(): void {
    this.item = this.data;
    console.log(this.item);

    this.form = this.formBuilder.group({
      idEmpresa: [this.item.item.id_empresa, Validators.required],
      id: [this.item.item.id, Validators.required],
      resposta: [this.item.item.resposta, Validators.required],
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
