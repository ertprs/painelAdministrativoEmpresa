import { ValorItemPagamentoComponent } from './../valor-item-pagamento/valor-item-pagamento.component';
import { ServicoService } from './../../../../servico.service';
import { CadastroPedidoService } from './../cadastro-pedido.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-selecionar-forma-pag',
  templateUrl: './selecionar-forma-pag.component.html',
  styleUrls: ['./selecionar-forma-pag.component.css']
})
export class SelecionarFormaPagComponent implements OnInit {

  form: FormGroup;


  constructor(public servcard: CadastroPedidoService, public servico: ServicoService, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {

  }


  openDialog(element): void {

    this.servcard.bottomSheet.dismiss();

    if (element.nome === 'Crédito') {
      this.addFP(element);
      return;
    }

    setTimeout( () => {


          const dialogRef = this.dialog.open(ValorItemPagamentoComponent, {
            width: '250px',
            data: element
          });

          dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            console.log(result);
            this.servcard.addFp(result);
          });


  } , 800 );
  }


  addFP(data) {
    let totalPagar = 0;


    if (data.nome === 'Crédito') {

      // verifica se ja tem uma forma de pag. credito adidionada
      let erroCred = false;
      this.servcard.getCarrinho().formasPagamento.forEach(element => {
        if (element.nome === data.nome) {
          erroCred = true;
         }
      });
      if (erroCred && !data.editar) {
        this.servico.mostrarMensagem('Você não pode adicionar mais de uma forma de pagamento da modalidade crédito');
        return;
      }

      console.warn('forma de pag crédito');
      if (this.servcard.getCarrinho().credito > this.servcard.getTotalCarrinho()) {
        // crédido suficiente para pagar total pedido
         this.servcard.getCarrinho().credito -= this.servcard.getTotalCarrinho();
         totalPagar = this.servcard.getTotalCarrinho();
      } else {
        totalPagar = this.servcard.getCarrinho().credito;
        this.servcard.getCarrinho().credito = 0;
      }
    }

    data.valor = totalPagar;
    this.servcard.addFp(data);
  }

}
