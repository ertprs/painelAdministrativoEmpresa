import { Component, OnInit } from '@angular/core';
import { DialogAddMototboyComponent } from '../dialog-add-mototboy/dialog-add-mototboy.component';
import { MatDialog } from '@angular/material/dialog';
import { ServicoService } from '../servico.service';
import { Router } from '@angular/router';
import { CrudServicoService } from '../crud-servico.service';

@Component({
  selector: 'app-mototboys',
  templateUrl: './mototboys.component.html',
  styleUrls: ['./mototboys.component.css']
})
export class MototboysComponent implements OnInit {
  listaMotoboys: any;
  nomeTeste: 'Iaguinho';
  constructor(public dialog: MatDialog, public servico: ServicoService, public router: Router, private crud: CrudServicoService) { }

  getEntregadorSelecionado() {
    return this.nomeTeste;
  }

  onclickAddMtb() {
    const dialogRef = this.dialog.open(DialogAddMototboyComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.servico.setDialogapp(dialogRef);
  }

  onclickCadEntrega(entregador: any) {
    console.log(entregador);
    this.servico.setEntregadoeSelecionado(entregador);
    this.router.navigate(['/entregas']);
  }

  consultaMotoboys() {
    console.log('#consultaMotoboys');
    this.crud.get_api('consulta_ent_lista_emp').subscribe(data => {
      console.log(data);
      if (data.lista === null) { } else {
        this.servico.setMotoboysEmpresa(data.lista);
      }
    });
  }

  onclickRemoveMotoboy(item: any) {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.servico.setMotoboysEmpresa(r.lista);
      }
      this.servico.mostrarMensagem(r.detalhes);
    };
    this.crud.post_api('remove_ent_lista_emp', accallback, item);
  }

  ngOnInit(): void {
    this.consultaMotoboys();
    /*
    this.listaMotoboys = [
      {
        imagem: 'https://xdelssy.com.br/sis_entregas/php/upload/fc508c6105d69ce25972f8360a6c06cc.jpg',
        nome: 'Iago',
        telefone: '(74)988420307',
        rua: 'Rua Canadá',
        numero: '83',
        bairro: 'Maria Goretti',
        cidade: 'Juazeiro',
        info: '13/05/2020 13:49',
      },
      {
        imagem: 'https://xdelssy.com.br/sis_entregas/php/upload/fc508c6105d69ce25972f8360a6c06cc.jpg',
        nome: 'Iago',
        telefone: '(74)988420307',
        rua: 'Rua Canadá',
        numero: '83',
        bairro: 'Maria Goretti',
        cidade: 'Juazeiro',
        info: '13/05/2020 13:49',
      }
    ];
    */
  }

}
