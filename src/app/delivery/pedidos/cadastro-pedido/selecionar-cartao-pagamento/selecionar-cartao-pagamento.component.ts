import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-selecionar-cartao-pagamento',
  templateUrl: './selecionar-cartao-pagamento.component.html',
  styleUrls: ['./selecionar-cartao-pagamento.component.css']
})
export class SelecionarCartaoPagamentoComponent implements OnInit {

  itens: any;
  itemSelecionado: any;

  constructor(public dialogRef: MatDialogRef<SelecionarCartaoPagamentoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
    this.itens = this.data.item.itens;
  }

  onClickItem(item) {
    console.log(item);

    this.itens.forEach(element => {
      if (element.id === item.id) { element.selecionado = true; this.itemSelecionado = item; } else { element.selecionado = false;   }
    });
  }

  onClickConfirmar() {
    this.dialogRef.close(this.itemSelecionado);
  }

}
