import { ServicoService } from 'src/app/servico.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogDinamComponent } from 'src/app/dialog-dinam/dialog-dinam.component';

@Component({
  selector: 'app-estoque-retirar-loja',
  templateUrl: './estoque-retirar-loja.component.html',
  styleUrls: ['./estoque-retirar-loja.component.css']
})
export class EstoqueRetirarLojaComponent implements OnInit {

  form: FormGroup;
  iddes: any;

  constructor(private servapp: ServicoService,public dialogRef: MatDialogRef<DialogDinamComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { tipo: string, nomeDialog: string, item: any }, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: [this.data.item.id_item_estoque],
      quantidade: [null],
      motivo: [null],
    });

  }

  confirmar() {
    if (!this.form.value.motivo) { this.servapp.mostrarMensagem('Informe o motivo da quebra do estoque'); return;  }
    this.dialogRef.close(this.form.value);
  }

}
