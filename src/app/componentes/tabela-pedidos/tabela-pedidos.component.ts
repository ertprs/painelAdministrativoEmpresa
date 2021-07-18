import { AddObservacaoPedidoComponent } from './../../add-observacao-pedido/add-observacao-pedido.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { DialogPedidoComponent } from 'src/app/delivery/dialogs/dialog-pedido/dialog-pedido.component';
import { AvisoTaxaPedidoComponent } from 'src/app/delivery/pedidos/aviso-taxa-pedido/aviso-taxa-pedido.component';
import { CancelarPedidoComponent } from 'src/app/delivery/pedidos/cancelar-pedido/cancelar-pedido.component';
import { ImpressaoPedidoComponent } from 'src/app/delivery/pedidos/impressao-pedido/impressao-pedido.component';
import { PedidosService } from 'src/app/delivery/pedidos/pedidos.service';
// tslint:disable-next-line: import-spacing
import { SelecionarMotoboyEntregaComponent }
  from 'src/app/delivery/pedidos/selecionar-motoboy-entrega/selecionar-motoboy-entrega.component';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-tabela-pedidos',
  templateUrl: './tabela-pedidos.component.html',
  styleUrls: ['./tabela-pedidos.component.css']
})
export class TabelaPedidosComponent implements OnInit {


  displayedColumns: string[] = ['botoes', 'status', 'nome', 'tipo', 'total', 'info', 'origem', 'id', 'statusmotoboy'];
  @Input() pedidos = [];
  dialogDelsuc: any;
  statusLoadEntregas: boolean;
  form: FormGroup;
  filtro: any;
  @Output() attListaPedidos = new EventEmitter();

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
    public servapp: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
  }

  selecionarMotoboy(item) {
    this.dialogDelsuc = this.dialog.open(SelecionarMotoboyEntregaComponent, {
      width: '560px', data: item.id
    });
    this.dialogDelsuc.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }


  onClickImprimir() {
    this.dialogDelsuc = this.dialog.open(ImpressaoPedidoComponent, {
      width: '360px', data: this.servpedidos.getPedido()
    });
    this.dialogDelsuc.afterClosed().subscribe(result => {
      if (result) {
        alert('ok');
      }
    });
  }



  onClickPedido(item: any) {

    try {

      if (item.id === this.servpedidos.getPedido().id && item.status_pedido === this.servpedidos.getPedido().status_pedido) {
        //  return;
      }

    } catch (e) { console.log('Pedido ainda nao carregado'); }

    this.servpedidos.setPedido({});

    const loginres = () => {
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.detalhes);
      } else {
        this.servpedidos.setPedido(r.resultado.itens);
        this.attListaPedidos.emit(r.resultado);
      }
    };
    const data = { idPedido: item.id, id_empresa: this.servapp.getDadosEmpresa().id };
    this.crud.post_api('consultaPedido', loginres, data);
  }





  onClickverPedido(element): void {
    this.dialogDelsuc = this.dialog.open(DialogPedidoComponent, {
      width: '1000px',
      data: element
    });

    this.servapp.setDialogapp(this.dialogDelsuc);

    this.dialogDelsuc.afterClosed().subscribe(result => {
      if (result === 'cancelar_pedido') {
        setTimeout(() => { this.onClickCancelarPedido(this.servpedidos.getPedido()); }, 600);
      } else {
        // this.servpedidos.setPedido({});
      }
    });

  }

  onClickCancelarPedido(item): void {
    this.servapp.getDialogapp().close();
    const dialogRef = this.dialog.open(CancelarPedidoComponent, {
      width: '450px',
      data: { item }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.servpedidos.onClickAttStatusPedido(7, result.idPedido, result);
    });
  }

  onClickAddObservacao(item): void {
    const dialogRef = this.dialog.open(AddObservacaoPedidoComponent, {
      width: '450px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  dialogAvisoTaxa(item): void {

    const loginres = () => {
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.mensagem);
      } else {

        const dialogRef = this.dialog.open(AvisoTaxaPedidoComponent, {
          width: '450px',
          data: r
        });

        dialogRef.afterClosed().subscribe(result => {
          if (result) {
            // Atualiza a taxa de entrega do motoboy
            const callb = () => {
              this.servpedidos.solicitaMotoboy(item.id, item);
            };
            this.crud.post_api('attTaxaMotoboy', callb, { idPedido: item.id, taxaEntrega: r.taxa_entrega }, true);
          }
        });


      }
    };


    const params = {
      coordendasBairro: item.endereco.bairro.lat + ', ' + item.endereco.bairro.lng,
      cidadeNome: item.endereco.cidade.nome
    };
    this.crud.post_api('calc_taxa', loginres, params);


  }
}
