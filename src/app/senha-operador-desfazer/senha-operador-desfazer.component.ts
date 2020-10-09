import { ConciliacaoBancariaComponent } from './../finaceiro/conciliacao-bancaria/conciliacao-bancaria.component';
import { InserirSenhaComponent } from './inserir-senha/inserir-senha.component';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-senha-operador-desfazer',
  templateUrl: './senha-operador-desfazer.component.html',
  styleUrls: ['./senha-operador-desfazer.component.css']
})
export class SenhaOperadorDesfazerComponent implements OnInit {

  @Input() apiacao = '';
  @Input() itemElement = '';
  @Output() fcallb = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClick() {
    this.openDialog();

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(InserirSenhaComponent, {
      width: '250px',
      data: {acaoApi: this.apiacao, params: this.itemElement}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (this.fcallb) {
        this.fcallb.emit(result);
       }
    });
  }



}
