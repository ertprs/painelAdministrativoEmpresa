import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-credito-historico',
  templateUrl: './credito-historico.component.html',
  styleUrls: ['./credito-historico.component.css']
})
export class CreditoHistoricoComponent implements OnInit {

  itens = [];

  constructor(public dialogRef: MatDialogRef<CreditoHistoricoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.itens = this.data.historico;
  }



}
