import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-endereco-cliente',
  templateUrl: './form-endereco-cliente.component.html',
  styleUrls: ['./form-endereco-cliente.component.css']
})
export class FormEnderecoClienteComponent implements OnInit {

  cidadeClienteSelecionada: any;
  statusLoaderBairros = false;
  form: FormGroup;
  statusBt = false;

  constructor(public servico: ServicoService, private crud: CrudServicoService, private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,  public dialogRef: MatDialogRef<FormEnderecoClienteComponent>) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [this.data.item.email],
      rua: [null],
      numero: [null],
      tiporesidencia: [null],
      complemento: [null],
      cidade: [null],
      bairro: [null],
      telefone: [this.data.item.telefone],
    });
  }

  selectionChangeCidade(item: any) {
    console.log('#selectionChangeCidade');
    console.log(item);

    this.cidadeClienteSelecionada = item;
    this.statusLoaderBairros = true;

    const accallback = () => {
      console.log('callback');
      this.statusLoaderBairros = false;
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.setListaBairros(r);
      }
      console.log(r);
    };
    this.crud.post_api('bairros', accallback, this.cidadeClienteSelecionada);

  }

  addEndereco() {
    this.statusBt = true;
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); this.statusBt = false; } else {
        this.servico.mostrarMensagem(r.resultado.mensagem);
        this.dialogRef.close(true);
      }
      console.log(r);
    };
    this.crud.post_api('add_end_usuario', accallback, this.form.value);
  }

}
