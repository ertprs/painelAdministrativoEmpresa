import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-selecionar-banco',
  templateUrl: './selecionar-banco.component.html',
  styleUrls: ['./selecionar-banco.component.css']
})
export class SelecionarBancoComponent implements OnInit {

  itens: any;
  itemSelecionado: any;

  constructor(public dialogRef: MatDialogRef<SelecionarBancoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private servico: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.consultabancos();
  }

  consultabancos() {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.resultado.mensagem); } else {
      }
      this.itens = r.resultado;
    };
    this.crud.post_api('consultaContasBancaria', accallback, '');
  }

  onClickItem(item) {
    console.log(item);

    this.itens.forEach(element => {
      if (element.id === item.id) { element.selecionado = true; this.itemSelecionado = item; } else { element.selecionado = false;   }
    });
  }

  onClickConfirmar() {
    // Enviar a entrega ao motoboy
    this.dialogRef.close(this.itemSelecionado);
  }

}
