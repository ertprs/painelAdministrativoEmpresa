import { CrudServicoService } from './../crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-adicionar-credito-cliente',
  templateUrl: './adicionar-credito-cliente.component.html',
  styleUrls: ['./adicionar-credito-cliente.component.css']
})
export class AdicionarCreditoClienteComponent implements OnInit {

  form: FormGroup;
  statusbt = false;
  constructor(public dialogRef: MatDialogRef<AdicionarCreditoClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private servapp: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.form = this.fb.group({
      cliente_id: [this.data.id],
      observacao: [''],
      valor: [''],
      tabela: ['clientes_empresa'],
    });
  }

  add() {
    this.statusbt = true;

    const accallback = () => {
      const r = this.servapp.getRespostaApi();
      this.servapp.mostrarMensagem(r.detalhes);
      if (r.erro === true) { 
        this.statusbt = false;
      } else {
        this.dialogRef.close(true);
      }
      console.log(r);
    };
    this.crud.post_api('addCreditoCliente', accallback, this.form.value);
  }

}
