import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    console.log('Pedidos');
    console.log(this.pedidos);
  }

  selecionarMotoboy(item) {
    this.dialogDelsuc = this.dialog.open(SelecionarMotoboyEntregaComponent, {
      width: '460px', data: item.id
    });
    this.dialogDelsuc.afterClosed().subscribe(result => {
      console.log('The dialog was closed result');
      console.log(result);
      if (result) {

      }
    });
  }


  onClickImprimir() {
    this.dialogDelsuc = this.dialog.open(ImpressaoPedidoComponent, {
      width: '360px', data: this.servpedidos.getPedido()
    });
    this.dialogDelsuc.afterClosed().subscribe(result => {
      console.log('The dialog was closed result');
      console.log(result);
      if (result) {
        alert('ok');
      }
    });
  }



  onClickPedido(item: any) {
    this.servpedidos.setPedido(item);
    console.log(item);
  }



  onClickverPedido(): void {
    this.dialogDelsuc = this.dialog.open(DialogPedidoComponent, {
      width: '900px',
    });

    this.servapp.setDialogapp(this.dialogDelsuc);

    this.dialogDelsuc.afterClosed().subscribe(result => {
      console.log('The dialog was closed result');
      console.log(result);
      if (result === 'cancelar_pedido') {
        setTimeout(() => { this.onClickCancelarPedido(this.servpedidos.getPedido()); }, 600);
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
      console.log('The dialog was closed cancelar pedido');
      console.log(result);
      this.servpedidos.onClickAttStatusPedido(7, result.idPedido, result);
    });
  }

  dialogAvisoTaxa(item): void {

    const loginres = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.mensagem);
      } else {

        const dialogRef = this.dialog.open(AvisoTaxaPedidoComponent, {
          width: '450px',
          data: r
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed cancelar pedido');
          console.log(result);
          if (result) {
            // Atualiza a taxa de entrega do motoboy
            const callb = () => {
              this.servpedidos.solicitaMotoboy(item.id);
            };
            this.crud.post_api('attTaxaMotoboy', callb, { idPedido: item.id, taxaEntrega: r.taxa_entrega  }, true);
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
