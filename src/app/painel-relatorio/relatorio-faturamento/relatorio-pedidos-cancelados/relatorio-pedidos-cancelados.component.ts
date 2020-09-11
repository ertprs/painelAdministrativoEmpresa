import { Component, OnInit } from '@angular/core';
import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-relatorio-pedidos-cancelados',
  templateUrl: './relatorio-pedidos-cancelados.component.html',
  styleUrls: ['./relatorio-pedidos-cancelados.component.css']
})
export class RelatorioPedidosCanceladosComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartLabels: Label[] = ['01/08/2020', '02/08/2020', '03/08/2020', '04/08/2020', '05/08/2020', '06/08/2020'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
 
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Pedidos' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  
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

 // events
 public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public randomize(): void {
  this.barChartType = this.barChartType === 'bar' ? 'line' : 'bar';
}

}
