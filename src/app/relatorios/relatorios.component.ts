import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidosService } from '../delivery/pedidos/pedidos.service';
import { FormBuilder } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';

@Component({
  selector: 'app-relatorios',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css']
})
export class RelatoriosComponent implements OnInit {

  displayedColumns: string[] = ['botoes', 'status', 'nome', 'tipo', 'formapagamento', 'total', 'info', 'statusmotoboy', 'id'];
  pedidos = [];
  dialogDelsuc: any;
  statusLoadEntregas: boolean;
  statusloadpedidos = false;

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {



    this.statusLoadEntregas = true;
    setTimeout(() => {
      this.f5(false);
    }, 600);


  }

  onClickDataDiltro(dataFiltro: any) {
    this.f5(dataFiltro);
  }

  f5(dataFiltro: any) {
    this.statusloadpedidos = true;
    this.crud.get_api('relatorio&id=' + this.servapp.getDadosEmpresa().id + '&data=' + dataFiltro).subscribe(data => {
      // console.log(data);
      this.statusloadpedidos = false;
      this.pedidos[0] = data;
      console.log('Relatorio');
      console.log(this.pedidos);
    });
}

}
