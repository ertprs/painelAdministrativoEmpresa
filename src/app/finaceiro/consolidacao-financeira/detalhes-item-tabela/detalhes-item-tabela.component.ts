import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalhes-item-tabela',
  templateUrl: './detalhes-item-tabela.component.html',
  styleUrls: ['./detalhes-item-tabela.component.css']
})
export class DetalhesItemTabelaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DetalhesItemTabelaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
