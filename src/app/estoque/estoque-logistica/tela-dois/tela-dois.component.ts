import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tela-dois',
  templateUrl: './tela-dois.component.html',
  styleUrls: ['./tela-dois.component.css']
})
export class TelaDoisComponent implements OnInit {

  form: FormGroup;
  itensCatalogo: any;
  itensLista: Array<any>;

  constructor(public dialogRef: MatDialogRef<TelaDoisComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {saida: '', chagada: '', valorPedido: '', previsaoEntrega: '', itens: [any]},
              private fb: FormBuilder, private crud: CrudServicoService,
              private servapp: ServicoService) { }

  ngOnInit(): void {
    this.f5();
    this.form = this.fb.group({
      produto: [''],
      quantidade: [''],
      precoCompra: [''],
      tipoEntrada: [''],
    });

    console.log(this.data);
  }

  prosseguir() {
    this.f1(this.data);
  }

  f1(form) {

    const accallback = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) { this.servapp.mostrarMensagem(r.detalhes); } else {
        this.servapp.mostrarMensagem(r.detalhes);
        this.dialogRef.close(this.form.value);
      }
      console.log(r);
    };
    this.crud.post_api('addItemLogistica', accallback, this.data);
  }

  f5() {
    this.crud.get_api('itens_cardapio').subscribe(data => {
      console.log(data);
      this.itensCatalogo = data.resultado;
   });
  }

 addItem() {
   if (!this.form.value.produto) { this.servapp.mostrarMensagem('Selecione o produto'); return; }
   if (!this.form.value.quantidade) { this.servapp.mostrarMensagem('Informe a quantidade'); return; }
   if (!this.form.value.precoCompra) { this.servapp.mostrarMensagem('Informe o preço de compra'); return; }
   if (!this.form.value.tipoEntrada) { this.servapp.mostrarMensagem('Selecione o tipo de entrada'); return; }
   this.data.itens.push(this.form.value);
   console.log(this.data);
   this.form.reset();
 }

 removeItemFp(item: any) {
  let indeArray: any;
  for (const x in this.data.itens) {
    if (this.data.itens[x] === item) {
      indeArray = x;
    }
  }
  this.data.itens.splice(indeArray, 1);
}

}
