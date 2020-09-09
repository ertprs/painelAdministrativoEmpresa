import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidosService } from '../delivery/pedidos/pedidos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  displayedColumns: string[] = ['botoes', 'status', 'nome', 'tipo', 'formapagamento', 'total', 'info', 'statusmotoboy', 'id'];
  itens = [];
  dialogDelsuc: any;
  statusLoadEntregas: boolean;
  statusloadpedidos = false;
  form: FormGroup;

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private fb: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      data: [null],
      id: [this.servapp.getDadosEmpresa().id],
      tipo: [null]
    });

    this.statusLoadEntregas = true;
    setTimeout(() => {
      this.form.controls.tipo.setValue(false);
      this.f5();
    }, 600);


  }

  onClickDataDiltro(tipo) {
    this.form.controls.tipo.setValue(tipo);
    this.f5();
  }

  f5() {

    
    this.statusloadpedidos = true;

    const loginres = () => {
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {

      } else {

        this.statusloadpedidos = false;
        this.itens = r.itens;
        this.form.controls.data.setValue(r.datafiltro);
        console.log('Relatorio');
        console.log(r);

      }
    };
    this.crud.post_api('relatorio', loginres, this.form.value);
}

}
