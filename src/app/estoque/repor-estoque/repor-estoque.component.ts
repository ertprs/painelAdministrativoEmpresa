import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDinamComponent } from 'src/app/dialog-dinam/dialog-dinam.component';

@Component({
  selector: 'app-repor-estoque',
  templateUrl: './repor-estoque.component.html',
  styleUrls: ['./repor-estoque.component.css']
})
export class ReporEstoqueComponent implements OnInit {

  form: FormGroup;
  iddes: any;

  constructor(public dialogRef: MatDialogRef<DialogDinamComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { tipo: string, nomeDialog: string, item: any }, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: [this.data.item.id],
      quantidade: [null],
    });

  }

}
