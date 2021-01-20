import { CrudServicoService } from './../crud-servico.service';
import { ServicoService } from './../servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fidelidade',
  templateUrl: './fidelidade.component.html',
  styleUrls: ['./fidelidade.component.css']
})
export class FidelidadeComponent implements OnInit {

  displayedColumns: string[] = ['cliente', 'id_pedido', 'info', 'valor'];
  dataSource: Array<any>;

  form: FormGroup;

  constructor(private fb: FormBuilder, private servapp: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: [''],
      status: [false],
      valor_desconto: [''],
      mensagem: [''],
      qtd_pedido_ganhar: [''],
      qtd_max_ganhos: [''],
      di: [''],
      df: [''],
    });

    this.consultaPrograma();

  }

  salvarFidelidade() {
    const accallback = () => {
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) { this.servapp.mostrarMensagem(r.resultado.mensagem); } else {
        this.servapp.mostrarMensagem(r.resultado.mensagem);
      }
    };
    this.crud.post_api('salvarFidelidade', accallback, this.form.value, true);
  }

  consultaPrograma() {
    const accallback = () => {
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) { this.servapp.mostrarMensagem(r.resultado.mensagem); } else {
        this.form.controls.id.setValue(r.resultado.itens.id);
        this.form.controls.status.setValue(r.resultado.itens.status_fidelidade);
        this.form.controls.mensagem.setValue(r.resultado.itens.mensagem);
        this.form.controls.qtd_max_ganhos.setValue(r.resultado.itens.qtd_max_ganhos);
        this.form.controls.qtd_pedido_ganhar.setValue(r.resultado.itens.qtd_pedido_ganhar);
        this.form.controls.valor_desconto.setValue(r.resultado.itens.valor_desconto);
        this.dataSource = r.resultado.itens.registros;
      }
    };
    this.crud.post_api('consultaPFidelidade', accallback, '', true);
  }

  consultaRegristros() {
    const accallback = () => {
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) { this.servapp.mostrarMensagem(r.resultado.mensagem); } else {
        this.dataSource = r.resultado.itens;
      }
    };
    this.crud.post_api('consultaRegristros', accallback, this.form.value, true);
  }

}
