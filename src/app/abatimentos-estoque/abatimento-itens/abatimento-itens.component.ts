import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-abatimento-itens',
  templateUrl: './abatimento-itens.component.html',
  styleUrls: ['./abatimento-itens.component.css']
})
export class AbatimentoItensComponent implements OnInit {

  itens: any;
  constructor(public dialogRef: MatDialogRef<AbatimentoItensComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    console.log(this.data);
    this.itens = this.data;
  }

}
