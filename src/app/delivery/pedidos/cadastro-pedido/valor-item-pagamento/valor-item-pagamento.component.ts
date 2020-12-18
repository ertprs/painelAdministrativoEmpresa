import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicoService } from './../../../../servico.service';
import { CadastroPedidoService } from 'src/app/delivery/pedidos/cadastro-pedido/cadastro-pedido.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-valor-item-pagamento',
  templateUrl: './valor-item-pagamento.component.html',
  styleUrls: ['./valor-item-pagamento.component.css']
})
export class ValorItemPagamentoComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<ValorItemPagamentoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public servcard: CadastroPedidoService,
              private servico: ServicoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.data);
    
    this.form = this.fb.group({
      valor: [],
    });

  }

  onClickConfirmar() {
    console.log(this.form.value.valor);
   if (!this.form.value.valor) { return; };
   if (this.form.value.valor > this.servcard.getTotalCarrinho()) {
     return this.servico.mostrarMensagem('Você informou o valor maior que o total do pedido');
    }
   this.data.valor = this.form.value.valor;
   this.dialogRef.close(this.data);
  }

}
