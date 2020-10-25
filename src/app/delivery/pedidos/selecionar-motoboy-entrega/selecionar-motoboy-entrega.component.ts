import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-selecionar-motoboy-entrega',
  templateUrl: './selecionar-motoboy-entrega.component.html',
  styleUrls: ['./selecionar-motoboy-entrega.component.css']
})
export class SelecionarMotoboyEntregaComponent implements OnInit {

  itens: any;
  itemSelecionado: any;
  pedido: any;
  constructor(public dialogRef: MatDialogRef<SelecionarMotoboyEntregaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private servico: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.pedido = this.data;
    this.itens = this.servico.getListaEntregador();
    console.log(this.data );
    /* PAREEEEI AQUI */
  }

  onClickItem(item) {
    console.log(item);

    this.itens.forEach(element => {
      if (element.id === item.id) { element.selecionado = true; this.itemSelecionado = item; } else { element.selecionado = false;   }
    });
  }

  onClickConfirmar() {
    // Enviar a entrega ao motoboy
    const accallback = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.dialogRef.close();
      }
    };
    this.crud.post_api('enviaEntregaEntregador', accallback, {idEntregador: this.itemSelecionado, idPedido: this.pedido}, true);
  }

}
