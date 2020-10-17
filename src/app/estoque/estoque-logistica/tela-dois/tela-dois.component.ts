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

  constructor(public dialogRef: MatDialogRef<TelaDoisComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private crud: CrudServicoService,
              private servapp: ServicoService) { }

  ngOnInit(): void {
    this.f5();
    this.form = this.fb.group({
      produto: [''],
      quantidade: [''],
      precoCompra: [''],
      tipoEntrada: [''],
    });
  }

  prosseguir() {
    this.data.produto = this.form.value.produto;
    this.data.quantidade = this.form.value.quantidade;
    this.data.precoCompra = this.form.value.precoCompra;
    this.data.tipoEntrada = this.form.value.tipoEntrada;
    console.log(this.data);
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
    this.crud.post_api('addItemLogistica', accallback, form);
  }

  f5() {
    this.crud.get_api('itens_cardapio').subscribe(data => {
      console.log(data);
      this.itensCatalogo = data.resultado;
   });
  }

}