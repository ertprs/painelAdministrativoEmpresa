import { CrudServicoService } from './../crud-servico.service';
import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servico.service';
import { UsuariosAdmService } from '../usuarios/usuarios-adm.service';

@Component({
  selector: 'app-notificacoes',
  templateUrl: './notificacoes.component.html',
  styleUrls: ['./notificacoes.component.css']
})
export class NotificacoesComponent implements OnInit {
  notificacoesLista: any;
  btRem = true;
  constructor(public crud: CrudServicoService, public servico: ServicoService, public us: UsuariosAdmService) { }

  ngOnInit(): void {
    console.log('#notificações');
    this.crud.get_api('login_emrpesa');
    console.log(this.servico.getListaNotificacoes());
    this.notificacoesLista = this.servico.getListaNotificacoes();
    this.servico.setMostrarNost(true);
    this.btRem = this.us.getPermissoessuario()[4].children[0].status;
  }

  onClickRem(item: any) {
    const fcallb = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes);
      } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.crud.cc();
      }
    };
    this.crud.post_api('remove_notificacao', fcallb, item);
  }


}
