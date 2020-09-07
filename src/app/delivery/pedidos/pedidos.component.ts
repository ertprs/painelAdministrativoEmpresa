import { AvisoTaxaPedidoComponent } from './aviso-taxa-pedido/aviso-taxa-pedido.component';
import { CancelarPedidoComponent } from './cancelar-pedido/cancelar-pedido.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { PedidosService } from './pedidos.service';
import { ServicoService } from 'src/app/servico.service';
import { DialogPedidoComponent } from './../dialogs/dialog-pedido/dialog-pedido.component';
import { Component, OnInit } from '@angular/core';
import { DialoDelsucgComponent } from 'src/app/dialo-delsucg/dialo-delsucg.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  displayedColumns: string[] = ['botoes', 'status', 'nome', 'tipo', 'formapagamento', 'total', 'info', 'statusmotoboy', 'id'];
  pedidos = [];
  dialogDelsuc: any;
  statusLoadEntregas: boolean;
  form: FormGroup;

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {



    this.statusLoadEntregas = true;
    setTimeout(() => {
      this.servpedidos.consultaPedidos();
    }, 600);


  }






  onClickPedido(item: any) {
    this.servpedidos.setPedido(item);
    console.log(item);
  }



  onClickverPedido(): void {
    this.dialogDelsuc = this.dialog.open(DialogPedidoComponent, {
      width: '800px',
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
            this.crud.post_api('attTaxaMotoboy', callb, { idPedido: item.id, taxaEntrega: r.taxa_entrega  });
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


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
