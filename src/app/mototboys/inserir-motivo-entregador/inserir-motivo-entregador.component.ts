import { ServicoService } from 'src/app/servico.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inserir-motivo-entregador',
  templateUrl: './inserir-motivo-entregador.component.html',
  styleUrls: ['./inserir-motivo-entregador.component.css']
})
export class InserirMotivoEntregadorComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InserirMotivoEntregadorComponent>, private servicoApp: ServicoService) { }

  ngOnInit(): void {
  }

  onClickConfirmar(motivo: string) {
    if (!motivo) {
      this.servicoApp.mostrarMensagem('Informe o motivo');
      return;
    }
    this.dialogRef.close(motivo);
  }

}
