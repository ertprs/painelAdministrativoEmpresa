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

  displayedColumns: string[] = ['c1', 'c2', 'c3'];
  dataSource: any;

  constructor(private servico: ServicoService, private crud: CrudServicoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataSource = [
        { nome: 'Bancos', itens: [
        { nome: 'Santander', valor: 400 },
        { nome: 'Bradesco', valor: 400 },
        { nome: 'Itaú', valor: 400 },
        { nome: 'Banco do Brasil', valor: 400 },
        { nome: 'Caixa', valor: 400 },
        { nome: 'Inter', valor: 400 },
        { nome: 'Nubank', valor: 400 },
        { nome: 'C6', valor: 400 },
        { nome: 'Original', valor: 400 },
        { nome: 'Neon', valor: 400 },
      ] },

    ];

    this.consultaBancos();

  }

  consultaBancos() {
    const fcall = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes.resultado.mensagem);
      } else {
        this.dataSource = r.resultado;
      }
    };
    this.crud.post_api('consultaContasBancaria', fcall, '' );
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

}
