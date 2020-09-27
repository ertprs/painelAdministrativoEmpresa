import { ServicoService } from 'src/app/servico.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-impressao-pedido',
  templateUrl: './impressao-pedido.component.html',
  styleUrls: ['./impressao-pedido.component.css']
})
export class ImpressaoPedidoComponent implements OnInit {

  dataDia: string;

  constructor(public dialogRef: MatDialogRef<ImpressaoPedidoComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              public servapp: ServicoService) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  onClickImprimir() {

    // Obtém a data/hora atual
    const data = new Date();

    // Guarda cada pedaço em uma variável
    const dia = data.getDate();           // 1-31
    const mes = data.getMonth();          // 0-11 (zero=janeiro)
    const ano4 = data.getFullYear();       // 4 dígitos
    const hora = data.getHours();          // 0-23
    const min = data.getMinutes();        // 0-59
    const seg = data.getSeconds();        // 0-59
    const mseg = data.getMilliseconds();   // 0-999
    const tz = data.getTimezoneOffset(); // em minutos

    // Formata a data e a hora (note o mês + 1)
    const strData = dia + '/' + (mes + 1) + '/' + ano4;
    const strHora = hora + ':' + min + ':' + seg;

    this.dataDia = strData + ' às ' + strHora;

    const divContents = document.getElementById('impressao').innerHTML;
    const a = window.open('', '', 'height=500, width=640');
    a.document.write(divContents);
    a.document.close();
    a.print();
  }

}
