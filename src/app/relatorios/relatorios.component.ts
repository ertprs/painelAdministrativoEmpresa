import { RelatorioService } from './../painel-relatorio/relatorio.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidosService } from '../delivery/pedidos/pedidos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

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


  // Gráfico de pedidos
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartLabels: Label[] = []; // Label
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Qnt. Pedidos finalizados' },
     { data: [], label: 'Qnt.Pedidos cancelados' },
  ];


  // Gráfico de vendas
  public barChartOptionsSales: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartTypeSales: ChartType = 'line';
  public barChartLegendSales = true;
  public barChartLabelsSales: Label[] = []; // Label
  public barChartDataSales: ChartDataSets[] = [
    { data: [], label: 'Faturamento' },
  ];

  // Gráfico de cliente
  public barChartOptionsClient: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartTypeClient: ChartType = 'bar';
  public barChartLegendClient = true;
  public barChartLabelsClient: Label[] = []; // Label
  public barChartDataClient: ChartDataSets[] = [
    { data: [], label: 'Qnt. pedidos' },
  ];

  // Gráfico de Fps
  public barChartOptionsFp: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartTypeFp: ChartType = 'bar';
  public barChartLegendFp = true;
  public barChartLabelsFp: Label[] = []; // Label
  public barChartDataFp: ChartDataSets[] = [
    { data: [], label: 'Formas de pagamento' },
  ];
  public pieChartColorsFp = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


   // Gráfico de Tipos Pedido
   public barChartOptionsTipoPedido: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartTypeTipoPedido: ChartType = 'line';
  public barChartLegendTipoPedido = true;
  public barChartLabelsTipoPedido: Label[] = []; // Label
  public barChartDataTipoPedido: ChartDataSets[] = [
    { data: [], label: 'Qbt. tipo pedido' },
  ];

   // Gráfico de Produto
   public barChartOptionsProduto: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
  };
  public barChartTypeProduto: ChartType = 'pie';
  public barChartLegendProduto = true;
  public barChartLabelsProduto: Label[] = []; // Label
  public barChartDataProduto: ChartDataSets[] = [
    { data: [], label: 'Qbt. Produto' },
  ];
  public pieChartColorsProduto = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', '#ff98009c;', 'rgba(0,0,255,0.3)', '#0094857d', '#ffeb3b', '#9c27b0', '#03a9f4'],
    },
  ];

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private fb: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService, public servrelat: RelatorioService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      data: [null],
      datafinal: [null],
      periodo: [null],
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
    this.form.controls.periodo.setValue(':)');
    this.f5();
  }

  f5() {

    this.statusloadpedidos = true;

    const loginres = () => {
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.detalhes);
      } else {
        this.resetaGrafico();
        this.statusloadpedidos = false;
        this.itens = r.itens;

        this.servrelat.setTotalFat(r.faturamento_total);
        this.servrelat.setQntPedido(r.qnt_pedidos);
        this.servrelat.setCupom(r.qnt_cupom_usado);
        this.servrelat.setTicketMedio(r.ticket_medio);

        r.itens.forEach(element => {
          this.barChartLabels.push(element.day_week); // Data completa do dia
          this.barChartData[1].data.push(element.canceled_orders.qnt); // Qnt pedidos cancelados do dia
          this.barChartData[0].data.push(element.finalized_orders.qnt); // Qnt pedidos finalizados ou conc do dia

          this.barChartLabelsSales.push(element.day_week); // Data completa do dia
          this.barChartDataSales[0].data.push(element.finalized_orders.total);
          console.log(element.finalized_orders.total);


        });

        r.top_clientes.forEach((element, key) => {
          this.barChartLabelsClient.push(element.nome); // Data completa do dia
          this.barChartDataClient[0].data.push(element.qntPedidosCliente);
        });

        r.fps_clientes.forEach((element, key) => {
          try {
          this.barChartLabelsFp.push(element.formapag); // Data completa do dia
          this.barChartDataFp[0].data.push(element.qnt);
          } catch (e) { console.log(e); }
        });

        r.tipos_pedido.forEach((element, key) => {
          try {
          this.barChartLabelsTipoPedido.push(element.nome); // Data completa do dia
          this.barChartDataTipoPedido[0].data.push(element.qnt);
          } catch (e) { console.log(e); }
        });

        r.itens_pedido.forEach((element, key) => {
          try {
          this.barChartLabelsProduto.push(element.nome); // Data completa do dia
          this.barChartDataProduto[0].data.push(element.qnt_pedidos);
          } catch (e) { console.log(e); }
        });


        this.form.controls.data.setValue(r.datafiltro);
        this.form.controls.datafinal.setValue(r.datafiltro_fim);
        console.log('Relatorio');
        console.log(r);

      }
    };
    this.crud.post_api('relatorio', loginres, this.form.value);
}

altSelectPeriodo(val) {
  console.log('altSelectPeriodo');
  console.log(val);

  switch (val) {

    case 'hoje' : {

      this.form.controls.tipo.setValue(true);
      this.form.controls.periodo.setValue('hoje');
      this.f5();

    }             break;

    case 'ontem' : {

      this.form.controls.tipo.setValue(true);
      this.form.controls.periodo.setValue('ontem');
      this.f5();

    }              break;

    case '15' : {

      this.form.controls.tipo.setValue(true);
      this.form.controls.periodo.setValue('15');
      this.f5();

    }           break;

    case '30' : {

      this.form.controls.tipo.setValue(true);
      this.form.controls.periodo.setValue(30);
      this.f5();

    }           break;
    default: { alert('?'); }
  }
}

resetaGrafico() {
  this.barChartLabels = []; // Data completa do dia
  this.barChartData[1].data = []; // Qnt pedidos cancelados do dia
  this.barChartData[0].data = []; // Qnt pedidos finalizados ou conc do dia

  this.barChartLabelsSales = []; // Data completa do dia
  this.barChartDataSales[0].data = [];

  this.barChartLabelsClient = []; // Data completa do dia
  this.barChartDataClient[0].data = [];

  this.barChartLabelsFp = []; // Data completa do dia
  this.barChartDataFp[0].data = [];

  this.barChartLabelsTipoPedido = []; // Data completa do dia
  this.barChartDataTipoPedido[0].data = [];

  this.barChartLabelsProduto = []; // Data completa do dia
  this.barChartDataProduto[0].data = [];
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
