import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';

@Component({
  selector: 'app-dialo-delsucg',
  templateUrl: './dialo-delsucg.component.html',
  styleUrls: ['./dialo-delsucg.component.css']
})
export class DialoDelsucgComponent implements OnInit {

  constructor(private router: Router, public servico: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
  }

  onclickEditarEntrega() {
    if (this.servico.getEntrega().status_pedido === 3) {  this.servico.mostrarMensagem('Não é possível mais editar essa entrega'); return; }
    if (this.servico.getEntrega().status_pedido === 4) {  this.servico.mostrarMensagem('Não é possível mais editar essa entrega'); return; }
    this.router.navigate(['/editar-entrega']);
  }

  attStatusEntrega(status: any) {
    const param = { id: this.servico.getEntrega().id, status_pedido_att: status };
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.mostrarMensagem(r.mensagem);
      }
      console.log(r);
    };
    this.crud.post_api('atualizar_status_entrega', accallback, param );
  }

  attStatus(status: any) {
    const param = { id: this.servico.getEntrega().id, status_pedido_att: status };
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.mostrarMensagem(r.mensagem);
      }
      console.log(r);
    };
    this.crud.post_api('atualizar_status_normal_entrega', accallback, param );
  }

  removerEntrega( ) {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.mostrarMensagem(r.mensagem);
      }
      console.log(r);
    };
    this.crud.post_api('remover_entrega', accallback, this.servico.getEntrega() );
  }

}
