import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  itens: any;
  statusBT = false;

  constructor(private crud: CrudServicoService, private router: Router, public servapp: ServicoService) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('historico_estoque').subscribe(data => {
        this.itens = data;
    });
}


remItemLog(item) {
  this.statusBT = true;
  const accallback = () => {
    const r = this.servapp.getRespostaApi();
    if (r.erro === true) { this.servapp.mostrarMensagem(r.detalhes); } else {
      this.statusBT = false;
      this.f5();
      this.servapp.mostrarMensagem(r.detalhes);
    }
  };
  this.crud.post_api('remItemHistEstoque', accallback, item.id);
}

}
