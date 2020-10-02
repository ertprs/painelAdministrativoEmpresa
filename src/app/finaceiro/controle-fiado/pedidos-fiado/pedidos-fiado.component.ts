import { PagarDividaComponent } from './../pagar-divida/pagar-divida.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { ImpressaoPedidoComponent } from 'src/app/delivery/pedidos/impressao-pedido/impressao-pedido.component';
import { PedidosService } from 'src/app/delivery/pedidos/pedidos.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pedidos-fiado',
  templateUrl: './pedidos-fiado.component.html',
  styleUrls: ['./pedidos-fiado.component.css']
})
export class PedidosFiadoComponent implements OnInit {


  columnsToDisplay = ['c00', 'c0', 'c1', 'c2', 'c3', 'c4', 'c5'];
  dataSource = [];
  dialogDelsuc: any;


  clientes = [];
  total = 0;

  form: FormGroup;
  myControl = new FormControl();
  filteredOptions: Observable<any>;
  itensOptions = [];

  tipof: any;

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

  onClickFiltroNome() {
    this.tipof = 'nome';
    this.consultaPedidosFiado();
  }

  onClickFiltroNomePeriodo() {
    this.tipof = 'nome_periodo';
    this.consultaPedidosFiado();
  }

  onClickFiltroMostrarTodos() {
 
   this.tipof = '';

   const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.resultado.mensagem); } else {
        // this.servico.mostrarMensagem(r.resultado.mensagem);
        this.dataSource = r.resultado.itens.lista;
        this.total = r.resultado.itens.total;
      }
      console.log(r);
    };
   this.crud.post_api('consulta_pedido_fiado', accallback,
    {tipoFiltro: this.tipof, dinicio:  '', dfim: '', nome: ''});
  }

  consultaPedidosFiado() {

    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.resultado.mensagem); } else {
        // this.servico.mostrarMensagem(r.resultado.mensagem);
        this.dataSource = r.resultado.itens.lista;
        this.total = r.resultado.itens.total;
      }
      console.log(r);
    };
    this.crud.post_api('consulta_pedido_fiado', accallback,
    {tipoFiltro: this.tipof, dinicio:  this.form.value.di, dfim: this.form.value.df, nome: this.form.value.nome});
  }

  onClickPagar(element): void {
    const dialogRef = this.dialog.open(PagarDividaComponent, {
      width: '650px',
      data: {item: element}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.consultaPedidosFiado();
    });
  }

  onClickImprimir(pedido) {
    this.dialogDelsuc = this.dialog.open(ImpressaoPedidoComponent, {
      width: '360px', data: pedido
    });
    this.dialogDelsuc.afterClosed().subscribe(result => {
      console.log('The dialog was closed result');
      console.log(result);
      if (result) {
        alert('ok');
      }
    });
  }

  consultaMNome() {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { /* this.servico.mostrarMensagem(r.resultado.mensagem); */ } else {
        // this.servapp.mostrarMensagem(r.resultado.mensagem);
        if (r.resultado) {
          this.itensOptions = r.resultado;
        }
      }
    };
    this.crud.post_api('consulta_cliente_filtro', accallback, {nome: this.form.value.nome});
  }

}
