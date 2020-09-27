import { CrudServicoService } from './../../../crud-servico.service';
import { ServicoService } from './../../../servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-adicionar-pagamento',
  templateUrl: './adicionar-pagamento.component.html',
  styleUrls: ['./adicionar-pagamento.component.css']
})
export class AdicionarPagamentoComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<AdicionarPagamentoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private servico: ServicoService,
              private crud: CrudServicoService) { }

  ngOnInit(): void {
    console.log(this.data);

    this.form = this.fb.group({
      data: [''],
      id_entrega: [this.data.item.id],
      operador: [''],
    });

  }

  onClickPagar() {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.resultado.mensagem); } else {
        this.servico.mostrarMensagem(r.resultado.mensagem);
        this.dialogRef.close(true);
      }
      console.log(r);
    };
    this.crud.post_api('pagar_entregador', accallback, this.form.value);
  }

}
