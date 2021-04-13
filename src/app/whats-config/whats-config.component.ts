import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whats-config',
  templateUrl: './whats-config.component.html',
  styleUrls: ['./whats-config.component.css']
})
export class WhatsConfigComponent implements OnInit {

  configWhats = { cardapio: false, pedido: false, todasmsg: false, notificacaoPedido: false };
  numwhats = this.servico.getDadosEmpresa().num_whats;
  btS = false;
  constructor(private servico: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.consultaconfigWhats();
  }

  consultaconfigWhats() {
    this.btS = true;
    const accallback = () => {
      this.btS = false;
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.configWhats.cardapio = r.resultado.cardapio;
        this.configWhats.pedido = r.resultado.pedido;
        this.configWhats.todasmsg = r.resultado.todasmsg;
        this.configWhats.notificacaoPedido = r.resultado.notificacaoPedido;
        console.log(this.configWhats);
      }
    };
    this.crud.post_api('consultaconfigWhats', accallback, this.configWhats);
  }

  salvar() {
    this.btS = true;
    const accallback = () => {
      this.btS = false;
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);
      }
    };
    this.crud.post_api('salvarConfigWhats', accallback, this.configWhats);
  }

}
