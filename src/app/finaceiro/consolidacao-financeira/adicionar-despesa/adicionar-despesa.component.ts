import { ServicoService } from './../../../servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelecionarMotoboyComponent } from 'src/app/estoque/itens-estoque-detalhes/selecionar-motoboy/selecionar-motoboy.component';

@Component({
  selector: 'app-adicionar-despesa',
  templateUrl: './adicionar-despesa.component.html',
  styleUrls: ['./adicionar-despesa.component.css']
})
export class AdicionarDespesaComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<SelecionarMotoboyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, public servico: ServicoService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nome: [null],
      descricao: [null],
      valor: [null],
      operador: [this.servico.getDadosEmpresa().operador.nome],
    });
  }

}
