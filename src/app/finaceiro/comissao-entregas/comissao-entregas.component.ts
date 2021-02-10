import { AdicionarPagamentoComponent } from './adicionar-pagamento/adicionar-pagamento.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { PedidosService } from 'src/app/delivery/pedidos/pedidos.service';
import { ServicoService } from 'src/app/servico.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-comissao-entregas',
  templateUrl: './comissao-entregas.component.html',
  styleUrls: ['./comissao-entregas.component.css']
})
export class ComissaoEntregasComponent implements OnInit {

  columnsToDisplay = ['c0', 'c66', 'c1', 'vp', 'c3', 'c5', 'c6', 'c4'];
  dataSource: any;
  total = 0;
  filtroPagos: any;
  filtroNome = '';
  form: FormGroup;

  myControl = new FormControl();
  filteredOptions: Observable<any>;
  itensOptions = [];

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private fb: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService, private router: Router) { }

  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(startWith(''),
    map(value => this.filter(value))
  );

    this.dataSource = [];
    this.form = this.fb.group({
      nome: [''],
      datainicio: [''],
      datafim: [''],
    });

    this.filtroPagos = 'todos-hoje';

    this.consulta();

  }

  consulta() {

    const accallback = () => {
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) { this.servapp.mostrarMensagem(r.resultado.mensagem); } else {
        // this.servapp.mostrarMensagem(r.resultado.mensagem);
        this.dataSource = r.resultado.itens.itens;
        this.total = r.resultado.itens.total;
      }
    };
    this.crud.post_api('comissao_entregas', accallback,
     {filtropag: this.filtroPagos, filtroNome: this.form.value.nome, dataInicio: this.form.value.datainicio,
      dataFim: this.form.value.datafim}
     );
  }

  onClickTodos() {
    this.filtroPagos = 'todos';
    this.consulta();
  }

  onClickFPagos() {
    this.filtroPagos = true;
    this.consulta();
  }

  onClickFNPagos() {
    this.filtroPagos = false;
    this.consulta();
  }



onClickPagar(element) {
  const dialogRef = this.dialog.open(AdicionarPagamentoComponent, {
    width: '250px',
    data: {item: element}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (dialogRef) {
      this.consulta();
    }
  });
}

filter(value: string): string[] {
  const filterValue = value.toLowerCase();

  return this.itensOptions.filter(option => option.toLowerCase().includes(filterValue));
}

consultaMNome() {
  const accallback = () => {
    const r = this.servapp.getRespostaApi();
    if (r.erro === true) { this.servapp.mostrarMensagem(r.resultado.mensagem); } else {
      // this.servapp.mostrarMensagem(r.resultado.mensagem);
      if (r.resultado) {
        this.itensOptions = r.resultado;
      }
    }
  };
  this.crud.post_api('consulta_motoboy_nome', accallback, {});
}

}
