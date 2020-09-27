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

  constructor(public dialogRef: MatDialogRef<PagarDividaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder,
              private servico: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      id_cliente: [this.data.item.dadoscliente.id],
      id_pedido: [this.data.item.id],
      valor_pag: [null],
      operador: [this.servico.getDadosEmpresa().operador.nome],
    });
  }

  onClickPagar() {
    const fcall = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.resultado.mensagem);
      } else {
        this.servico.mostrarMensagem(r.resultado.mensagem);
        this.dialogRef.close();
      }
    };
    this.crud.post_api('pagar_pedido_fiado', fcall, this.form.value);
  }

}
