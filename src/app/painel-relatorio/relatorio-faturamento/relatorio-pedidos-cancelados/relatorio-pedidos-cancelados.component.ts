import { Component, OnInit } from '@angular/core';
import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';

@Component({
  selector: 'app-relatorio-pedidos-cancelados',
  templateUrl: './relatorio-pedidos-cancelados.component.html',
  styleUrls: ['./relatorio-pedidos-cancelados.component.css']
})
export class RelatorioPedidosCanceladosComponent implements OnInit {

  
  displayedColumns: string[] = ['c1', 'c3', 'c4'];
  itens: any;

  constructor(private servapp: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    const fcallb = () => {
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {

      } else {

        this.itens = r.resultado.itens;
        console.log('relatorio');
        console.log(r);
      }
    };
    this.crud.post_api('relatorio_pedidos_cancelados', fcallb, '');
}

}
