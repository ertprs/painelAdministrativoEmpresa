import { CrudServicoService } from './../../crud-servico.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-item-pagamento',
  templateUrl: './form-item-pagamento.component.html',
  styleUrls: ['./form-item-pagamento.component.css']
})
export class FormItemPagamentoComponent implements OnInit {

  form: FormGroup;
  formaspagamento: any;

  constructor(public dialogRef: MatDialogRef<FormItemPagamentoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private crud: CrudServicoService) { }

  ngOnInit(): void {

    if (this.data.tipo === 'add') {

      this.form = this.fb.group({
        id_formapagamento: [null],
        imagem: [null],
        nome: [null],
        status: [null],
      });
    } else {
      console.log('Form editar');
      this.form = this.fb.group({
        id: [this.data.item.id],
        id_formapagamento: [this.data.item.id_formapagamento],
        imagem: [this.data.item.imagem],
        nome: [this.data.item.nome],
        status: [this.data.item.status],
      });
    }

    this.f5();
  }

  f5() {
    this.crud.get_api('formas_pag').subscribe(data => {
      console.log(data);
      this.formaspagamento = data;
    });
  }

}
