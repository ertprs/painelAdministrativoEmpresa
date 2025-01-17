import { FormBuilder, FormGroup } from '@angular/forms';
import { VerImagemComponent } from './../../upload-imagem/ver-imagem/ver-imagem.component';
import { AdicionarBancoComponent } from './adicionar-banco/adicionar-banco.component';
import { AdicionarDespesaComponent } from './../consolidacao-financeira/adicionar-despesa/adicionar-despesa.component';
import { CrudServicoService } from './../../crud-servico.service';
import { ServicoService } from './../../servico.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-conciliacao-bancaria',
  templateUrl: './conciliacao-bancaria.component.html',
  styleUrls: ['./conciliacao-bancaria.component.css']
})
export class ConciliacaoBancariaComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'c7', 'c2', 'c3', 'c4', 'c5', 'c6'];
  dataSource: any;
  total: any;
  form: FormGroup;
  bancos: Array<any>;
  loader = false;
  constructor(private servico: ServicoService, private crud: CrudServicoService, public dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dataSource = [];

    this.form = this.fb.group({
      idBanco: [''],
      datai: [''],
      dataf: [''],
    });

    this.conciliacaoBancaria();

  }

  onfcalldelsuc(evento) {
    console.log(evento);
    this.conciliacaoBancaria();
  }

  conciliacaoBancaria() {
    this.loader = true;
    const fcall = () => {
      const r = this.servico.getRespostaApi();
      this.loader = false;

      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes.resultado.mensagem);
      } else {
        this.dataSource = r.resultado.itens.lista;
        this.bancos = r.resultado.itens.bancos;
        this.total = r.resultado.itens.total;
      }
    };
    this.crud.post_api('conciliacaoBancaria', fcall, this.form.value );
  }

  adicionarbanco() {
    const dialogRef = this.dialog.open(AdicionarBancoComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  lancarFluxo(pedido) {
    const fcall = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.resultado.mensagem);
        this.conciliacaoBancaria();

      } else {
        this.servico.mostrarMensagem(r.resultado.mensagem);
        this.conciliacaoBancaria();
      }
    };
    this.crud.post_api('lancarConsolidacaoBancaria', fcall,
{ idPedido: pedido.id, operador: this.servico.getDadosEmpresa().operador.nome } );
  }


  verComprovante(element) {
      // if (!element) { this.servico.mostrarMensagem('Comprovante não encontrado'); }
      const dialogRef = this.dialog.open(VerImagemComponent, {
        width: '450px',
        data: element
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if (result) {
          this.conciliacaoBancaria();
        }
      });
  }

}
