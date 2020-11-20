import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inserir-motivo-entregador',
  templateUrl: './inserir-motivo-entregador.component.html',
  styleUrls: ['./inserir-motivo-entregador.component.css']
})
export class InserirMotivoEntregadorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InserirMotivoEntregadorComponent>) { }

  ngOnInit(): void {
  }

  onClickConfirmar(motivo: string) {
    this.dialogRef.close(motivo);
  }

}
