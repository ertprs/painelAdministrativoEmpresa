import { CrudServicoService } from './../../crud-servico.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadimagemService } from 'src/app/upload-imagem/uploadimagem.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-form-item-pagamento',
  templateUrl: './form-item-pagamento.component.html',
  styleUrls: ['./form-item-pagamento.component.css']
})
export class FormItemPagamentoComponent implements OnInit {

  form: FormGroup;
  formaspagamento: any;
  acao: string;

  constructor(public dialogRef: MatDialogRef<FormItemPagamentoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private crud: CrudServicoService,
              private upImg: UploadimagemService, private servico: ServicoService) { }

  ngOnInit(): void {

    if (this.data.tipo === 'add') {
      this.acao = 'addItensFormaspagamento';
      this.form = this.fb.group({
        id_formapagamento: [null],
        imagem: [this.upImg.getImagem()],
        nome: [null],
        status: [null],
      });
    } else {
      this.acao = 'attItenFormaspagamento';
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

  salvar() {
    if (this.upImg.getImagem()) {
      this.form.controls.imagem.setValue(this.upImg.getImagem());
    }
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.mostrarMensagem(r.mensagem);
        this.upImg.limpaDadosServivoImagem();
        this.dialogRef.close(true);
      }
      console.log(r);
    };
    this.crud.post_api(this.acao, accallback, this.form.value);
  }

}
