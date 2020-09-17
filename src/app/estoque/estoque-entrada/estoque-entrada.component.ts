import { EstoqueEnviarComponent } from '../estoque-enviar/estoque-enviar.component';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-estoque-entrada',
  templateUrl: './estoque-entrada.component.html',
  styleUrls: ['./estoque-entrada.component.css']
})
export class EstoqueEntradaComponent implements OnInit {

  form: FormGroup;

  constructor(private crud: CrudServicoService, private servico: ServicoService, public dialogRef: MatDialogRef<EstoqueEnviarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { tipo: string, nomeDialog: string, item: any }, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
          id: [null],
          id_item_estoque: [null],
          descricao: [null],
          quantidade: [null],
    });

  }

}
