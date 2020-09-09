import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-notificacoes-sistema',
  templateUrl: './notificacoes-sistema.component.html',
  styleUrls: ['./notificacoes-sistema.component.css']
})
export class NotificacoesSistemaComponent implements OnInit {

  displayedColumns: string[] = ['c0', 'c1', 'c2', 'c3', 'c4'];
  itens = [];
  statusBtRemove = false;


  constructor(private crud: CrudServicoService, private servico: ServicoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('notificacoes_sistema').subscribe(data => {
       console.log(data);
       this.itens = data;
    });
}

removeItem(item: any) {
  this.statusBtRemove = true;
  this.crud.get_api('rem_notificacoes_sistema&id=' + item.id).subscribe(data => {
    this.servico.mostrarMensagem(data.detalhes);
    this.statusBtRemove = false;
    this.itens = data.resultado;
 });
}

}
