import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { AdicionarBancoComponent } from '../conciliacao-bancaria/adicionar-banco/adicionar-banco.component';
import { AdicionarDespesaComponent } from '../consolidacao-financeira/adicionar-despesa/adicionar-despesa.component';
import { DetalhesItemTabelaComponent } from '../consolidacao-financeira/detalhes-item-tabela/detalhes-item-tabela.component';

@Component({
  selector: 'app-consolidacao-cartao',
  templateUrl: './consolidacao-cartao.component.html',
  styleUrls: ['./consolidacao-cartao.component.css']
})
export class ConsolidacaoCartaoComponent implements OnInit {


  displayedColumns: string[] = ['c1', 'c8', 'c9', 'c7', 'c2', 'c3', 'c4', 'c5', 'c6'];
  dataSource: any;
  total: any;
  form: FormGroup;
  totalDesc: any;
  constructor(private servico: ServicoService, private crud: CrudServicoService, public dialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit(): void {
     this.conciliacaoCartao();
     this.form = this.fb.group({
       porcentagem: [''],
     });
  }

  conciliacaoCartao() {
    const fcall = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes.resultado.mensagem);
      } else {
        this.dataSource = r.resultado.itens.lista;
        this.total = r.resultado.itens.total;
        this.totalDesc = r.resultado.itens.total_valor_conciliado;
      }
    };
    this.crud.post_api('conciliacaoCartao', fcall, '' );
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

  lancarFluxo(pedido, porcentagem) {
    const fcall = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.resultado.mensagem);
      } else {
        this.servico.mostrarMensagem(r.resultado.mensagem);
        this.conciliacaoCartao();
      }
    };
    this.crud.post_api('lancarConsolidacaoCartao', fcall,
{ idPedido: pedido.id, porc: porcentagem, operador: this.servico.getDadosEmpresa().operador.nome } );
  }

}
