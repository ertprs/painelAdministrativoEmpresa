import { UploadimagemService } from './../../../upload-imagem/uploadimagem.service';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pagar-divida',
  templateUrl: './pagar-divida.component.html',
  styleUrls: ['./pagar-divida.component.css']
})
export class PagarDividaComponent implements OnInit {

  public form: FormGroup;
  itensPagamento: any;
  transf = false;
  cartao = false;
  itensPag: any;
  pagamentos: Array<any>;
  sbt = false;

  constructor(public dialogRef: MatDialogRef<PagarDividaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
              private servico: ServicoService, private crud: CrudServicoService, public upimgserv: UploadimagemService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.form = this.fb.group({
      id_cliente: [this.data.item.cliente.id],
      id_pedido: [this.data.item.pedido.id],
      tabelaCliente: [this.data.item.cliente.tabela],
      valor_pag: [null],
      formapagamento: [null],
      itemPagamento: [null],
      comprovante: [null],
      operador: [this.servico.getDadosEmpresa().operador.nome],
    });
    this.itensPagamento = this.servico.getDadosEmpresa().formaspagamento;
    this.consultaPagamentosFiado();
  }

  onClickPagar() {
    this.sbt = true;
    this.form.value.comprovante = this.upimgserv.getImagem();
    const fcall = () => {
      const r = this.servico.getRespostaApi();
      console.log(r.erro);
      if (r.erro === true) {
        this.sbt = false;
        this.servico.mostrarMensagem(r.resultado.mensagem);
      } else {
        this.servico.mostrarMensagem(r.resultado.mensagem);
        this.dialogRef.close();
      }
    };
    this.crud.post_api('pagar_pedido_fiado', fcall, this.form.value);
  }

  selectChange() {
    console.log(this.form.value);

    this.itensPag = this.form.value.formapagamento.itens;


    if (this.form.value.formapagamento.nome.indexOf('Transferência') > -1 || this.form.value.formapagamento.nome.indexOf('Transferencia') > -1) {
       this.transf = true;
       this.cartao = true;
       return;
      } else {
          this.transf = false;
        }
    if (this.form.value.formapagamento.nome.indexOf('Cartão') > -1 || this.form.value.formapagamento.nome.indexOf('Cartao') > -1) { this.cartao = true; } else { this.cartao = false; }

  }

  consultaPagamentosFiado() {

    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.resultado.mensagem); } else {
        // this.servico.mostrarMensagem(r.resultado.mensagem);
        this.pagamentos = r.resultado.itens;
      }
      console.log(r);
    };
    this.crud.post_api('consultaPagamentosFiadoPorIdPedido', accallback, {idPedido: this.data.item.pedido.id});
  }

}
