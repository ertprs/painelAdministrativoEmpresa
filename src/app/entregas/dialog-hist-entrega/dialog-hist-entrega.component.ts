import { Component, OnInit } from '@angular/core';
import { ServicoEntregaService } from '../servico-entrega.service';
import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';

@Component({
  selector: 'app-dialog-hist-entrega',
  templateUrl: './dialog-hist-entrega.component.html',
  styleUrls: ['./dialog-hist-entrega.component.css']
})
export class DialogHistEntregaComponent implements OnInit {

  entrega: any;
  constructor(private servicoEnt: ServicoEntregaService, private servico: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    console.log(this.servicoEnt.getentHist());
    const loginres = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) { alert(r.mensagem); } else {
        this.entrega = r;
      }
    };
    console.log(this.crud.post_api('ver_entrega_selecionada', loginres, this.servicoEnt.getentHist()));
  }

}
