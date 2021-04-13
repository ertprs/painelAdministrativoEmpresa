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
    this.form = this.fb.group({
      valor: [],
    });

  }

  onClickConfirmar() {

    if (!this.form.value.valor) { this.form.value.valor = 0; }
    if (this.form.value.valor > this.servcard.getTotalCarrinho() && this.servcard.getCarrinho().pagcred === false) {
     return this.servico.mostrarMensagem('Você informou o valor maior que o total do pedido');
    }

    console.log('onClickConfirmar',  this.data );
    if (this.data.nome === 'Crédito') {
      console.warn('forma de pag crédito');
      if (this.form.value.valor > this.servcard.getCarrinho().credito) {
        return this.servico.mostrarMensagem('Crédito insuficiente.');
      }
      if (this.form.value.valor <= this.servcard.getCarrinho().credito  && this.form.value.valor > this.servcard.getTotalCarrinho()) {
        return this.servico.mostrarMensagem('Não é possível informar o valor de crédito maior que o valor total do pedido');
      }
      // verifica se ja tem uma forma de pag. credito adidionada
      let erroCred = false;
      this.servcard.getCarrinho().formasPagamento.forEach(element => {
        if (element.nome === this.data.nome) {
          erroCred = true;
         }
      });
      if (erroCred && !this.data.editar) {
        this.servico.mostrarMensagem('Você não pode adicionar mais de uma forma de pagamento da modalidade crédito');
        return;
      }
    }

    console.log('Total fps', this.servcard.verificaFpsTotal());
    console.log('Total carrinho', this.servcard.getTotalCarrinho());
    console.log(' pagcred ~~ ', this.servcard.getCarrinho().pagcred === false);
    // Verifica se as formas de pagamento o total esta maior que o valor do pedido em se
    if (this.servcard.verificaFpsTotal() + this.form.value.valor > this.servcard.getTotalCarrinho() &&
        this.servcard.getCarrinho().pagcred === false) {

            this.servico.mostrarMensagem('Os valores das formas de pagamento estão maior que o valor total do pedido');
            return;
    }

    this.data.valor = this.form.value.valor;
    this.dialogRef.close(this.data);
  }

}
