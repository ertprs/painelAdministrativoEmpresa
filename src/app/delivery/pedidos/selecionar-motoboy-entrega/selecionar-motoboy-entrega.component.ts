import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-selecionar-motoboy-entrega',
  templateUrl: './selecionar-motoboy-entrega.component.html',
  styleUrls: ['./selecionar-motoboy-entrega.component.css']
})
export class SelecionarMotoboyEntregaComponent implements OnInit {

  itens: any;
  itemSelecionado: any;

  constructor(public dialogRef: MatDialogRef<SelecionarMotoboyEntregaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.itens = [
      {id: '1', nome: 'Entregador', selecionado: false},
      {id: '2', nome: 'Entregador', selecionado: false},
      {id: '3', nome: 'Entregador', selecionado: false},
      {id: '4', nome: 'Entregador', selecionado: false},
      {id: '5', nome: 'Entregador', selecionado: false},
      {id: '6', nome: 'Entregador', selecionado: false},
      {id: '7', nome: 'Entregador', selecionado: false},
      {id: '8', nome: 'Entregador', selecionado: false},
      {id: '9', nome: 'Entregador', selecionado: false},
      {id: '10', nome: 'Entregador', selecionado: false},
      {id: '11', nome: 'Entregador', selecionado: false},
    ];
  }

  onClickItem(item) {
    console.log(item);

    this.itens.forEach(element => {
      if (element.id === item.id) { element.selecionado = true; this.itemSelecionado = item; } else { element.selecionado = false;   }
    });
  }

  onClickConfirmar() {
    // Enviar a entrega ao motoboy
    alert('Envia entrega ao motoboy');
    this.dialogRef.close();
  }

}
