import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDinamComponent } from '../dialog-dinam/dialog-dinam.component';

@Component({
  selector: 'app-cupons',
  templateUrl: './cupons.component.html',
  styleUrls: ['./cupons.component.css']
})
export class CuponsComponent implements OnInit {

  
  displayedColumns: string[] = ['c0', 'c1', 'c2', 'c3', 'c4'];
  itens = [];


  constructor(private crud: CrudServicoService, private servico: ServicoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('cupons').subscribe(data => {
       console.log(data);
       this.itens = data;
    });
}

add() {
  const dialogRef = this.dialog.open(DialogDinamComponent, {
    width: '250px',
    data: {nomeDialog: 'itens_formaspagamento'}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
  });
}

}