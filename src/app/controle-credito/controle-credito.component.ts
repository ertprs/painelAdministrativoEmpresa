import { CreditoHistoricoComponent } from './credito-historico/credito-historico.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CrudServicoService } from '../crud-servico.service';
import { ImpressaoPedidoComponent } from '../delivery/pedidos/impressao-pedido/impressao-pedido.component';
import { PedidosService } from '../delivery/pedidos/pedidos.service';
import { PagarDividaComponent } from '../finaceiro/controle-fiado/pagar-divida/pagar-divida.component';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-controle-credito',
  templateUrl: './controle-credito.component.html',
  styleUrls: ['./controle-credito.component.css']
})
export class ControleCreditoComponent implements OnInit {

  columnsToDisplay = ['c4', 'c0', 'c3'];
  dataSource = [];
  dialogDelsuc: any;
  loader = false;
  total = 0;
  form: any;

  constructor(private servico: ServicoService, private crud: CrudServicoService, public dialog: MatDialog,
              public servpedidos: PedidosService, private fb: FormBuilder) { }

ngOnInit(): void {
this.dataSource = [];
this.form = this.fb.group({
  nome: [''],
  di: [''],
  df: [''],
});
this.consultaPedidosFiado();
}

historico(item): void {
  const dialogRef = this.dialog.open(CreditoHistoricoComponent, {
    width: '450px',
    data: item
  });

  dialogRef.afterClosed().subscribe(result => {

  });
}



consultaPedidosFiado() {
this.loader = true;

const accallback = () => {
this.loader = false;

const r = this.servico.getRespostaApi();
if (r.erro === true) { this.servico.mostrarMensagem(r.resultado.mensagem); } else {
// this.servico.mostrarMensagem(r.resultado.mensagem);
this.dataSource = r.resultado.itens.lista;
this.total = r.resultado.itens.total;
}
};
this.crud.post_api('consulaClientesCredito', accallback,
{tipoFiltro: '', dinicio:  this.form.value.di, dfim: this.form.value.df, nome: this.form.value.nome});
}

onClickPagar(element): void {
      const dialogRef = this.dialog.open(PagarDividaComponent, {
      width: '650px',
      data: {item: element}
      });

      dialogRef.afterClosed().subscribe(result => {
      this.consultaPedidosFiado();
      });
}

onClickImprimir(pedido) {

  const loginres = () => {
  const r = this.servico.getRespostaApi();
  if (r.erro === true) {
  this.servico.mostrarMensagem(r.detalhes);
  } else {
  this.servpedidos.setPedido(r.resultado.itens);
  setTimeout(() => {
  this.abrirjanela();
  } , 500);

}
};
const data = { idPedido: pedido.id_pedido, id_empresa: this.servico.getDadosEmpresa().id};
this.crud.post_api('consultaPedido', loginres, data , true);

}


abrirjanela() {
this.dialogDelsuc = this.dialog.open(ImpressaoPedidoComponent, {
width: '360px'
});
this.dialogDelsuc.afterClosed().subscribe(result => {
if (result) {
}
});
}

 

}
