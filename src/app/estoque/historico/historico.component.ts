import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})
export class HistoricoComponent implements OnInit {

  statusBT = false;
  statusLoader = false;

  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['c1', 'c2', 'c3'];

  constructor(private crud: CrudServicoService, private router: Router, public servapp: ServicoService) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.statusLoader = true;
    this.crud.get_api('historico_estoque').subscribe(data => {
      this.statusLoader = false;
      this.dataSource = new MatTableDataSource<any>(data);
      this.dataSource.paginator = this.paginator;

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
