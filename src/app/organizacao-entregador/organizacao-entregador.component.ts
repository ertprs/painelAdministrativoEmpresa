import { FormOrganizacaoComponent } from './form-organizacao/form-organizacao.component';
import { CrudServicoService } from './../crud-servico.service';
import { ServicoService } from './../servico.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-organizacao-entregador',
  templateUrl: './organizacao-entregador.component.html',
  styleUrls: ['./organizacao-entregador.component.css']
})
export class OrganizacaoEntregadorComponent implements OnInit {

  itens: any;
  title = 'ng-calendar-demo';
  selectedDate: any;
  startAt: any;
  minDate: any;
  maxDate: any;
  year: any;
  DayAndDate: string;

  delsucData: any;

  constructor(private servico: ServicoService, private crud: CrudServicoService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.f1();
  }

  f1() {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { /* this.servico.mostrarMensagem(r.resultado.mensagem); */ } else {
        if (r.resultado) {
          this.itens = r.resultado.itens.lista;
          this.iniciaCalendario(r.resultado.itens.data);
        }
      }
    };
    this.crud.post_api('consultaOrgEnt', accallback, {nome: ''});
  }

  f2(f) {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { /* this.servico.mostrarMensagem(r.resultado.mensagem); */ } else {
        if (r.resultado) {
          this.itens = r.resultado.itens.lista;
          this.delsucData = r.resultado.itens.info;
        }
      }
    };
    this.crud.post_api('consultaOrgEnt', accallback, {filtro: f});
  }


  iniciaCalendario(data) {
    this.title = 'ng-calendar-demo';
    this.selectedDate = data;
    // this.startAt = new Date('2019/09/11');
    // this.minDate = new Date('2019/09/14');
    // this.maxDate = new Date(new Date().setMonth(new Date().getMonth() + 1));
    this.year = '';
    this.DayAndDate = '';
  }

  onSelect(event) {
    console.log(event);
    this.selectedDate = event;
    const dateString = event.toDateString();
    const dateValue = dateString.split(' ');
    this.year = dateValue[3];
    this.DayAndDate = dateValue[0] + ',' + ' ' + dateValue[1] + ' ' + dateValue[2];
    console.log(this.DayAndDate);
    this.f2(this.DayAndDate);
  }

  myDateFilter = (d: Date): boolean => {
    console.log('myDateFilter');
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 ;
  }

  addEvento(): void {
    const dialogRef = this.dialog.open(FormOrganizacaoComponent, {
      width: '450px',
      data: this.delsucData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.f2(this.delsucData);
      }
    });
  }

  removerItem(item) {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { /* this.servico.mostrarMensagem(r.resultado.mensagem); */ } else {
        this.servico.mostrarMensagem(r.resultado.mensagem);
        if (r.resultado) {
          this.f1();
        }
      }
    };
    this.crud.post_api('remOrgEnt', accallback, item.id);
  }

}
