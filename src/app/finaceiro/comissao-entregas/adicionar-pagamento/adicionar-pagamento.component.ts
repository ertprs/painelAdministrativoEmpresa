import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-adicionar-pagamento',
  templateUrl: './adicionar-pagamento.component.html',
  styleUrls: ['./adicionar-pagamento.component.css']
})
export class AdicionarPagamentoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AdicionarPagamentoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
