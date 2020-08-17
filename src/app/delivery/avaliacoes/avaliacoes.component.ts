import { RespavaliacaoComponent } from './../dialogs/respavaliacao/respavaliacao.component';
import { ServicoService } from './../../servico.service';
import { CrudServicoService } from './../../crud-servico.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-avaliacoes',
  templateUrl: './avaliacoes.component.html',
  styleUrls: ['./avaliacoes.component.css']
})
export class AvaliacoesComponent implements OnInit {

  respotasItem: any;

  constructor(private crud: CrudServicoService, private servico: ServicoService, public dialog: MatDialog) { }

  listaavaliacoes: any;
  itemClicado: any;

  ngOnInit(): void {
    this.consultaAvaliacoes();
  }

  consultaAvaliacoes() {
    console.log('#avaliacoes');
    const loginres = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.mensagem);
      } else {
        this.listaavaliacoes = r.resultado;
      }
    };
    console.log( this.crud.post_api('avaliacoes', loginres, this.servico.getDadosEmpresa().id ) );
  }

  enviarRespAval() {
    const loginres = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.mensagem);
      } else {
        this.servico.mostrarMensagem(r.mensagem);
        this.itemClicado.resposta = this.respotasItem.resposta;
      }
    };
    const params = {idEmpresa: this.servico.getDadosEmpresa().id, aval: this.respotasItem };
    this.crud.post_api('respavaliacao', loginres, params  );
  }

  onClickResponderAval(item): void {
    this.itemClicado = item;
    const dialogRef = this.dialog.open(RespavaliacaoComponent, {
      width: '450px',
      data: {item}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.respotasItem = result;
      console.log(this.respotasItem);
      this.enviarRespAval();
    });
  }

}




