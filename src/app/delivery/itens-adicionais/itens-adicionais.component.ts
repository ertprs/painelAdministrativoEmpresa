import { ItensService } from './itens.service';
import { DialogAddItemAdicionalComponent } from './../dialogs/dialog-add-item-adicional/dialog-add-item-adicional.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-itens-adicionais',
  templateUrl: './itens-adicionais.component.html',
  styleUrls: ['./itens-adicionais.component.css']
})
export class ItensAdicionaisComponent implements OnInit {

  displayedColumns: string[] = ['opcoes', 'disponivel', 'nome', 'nomecategoria', 'preco', 'info', 'datamodificado', 'remover'];
  itensadicionais = [];
  dialogDelsuc: any;
  constructor(private dialog: MatDialog, public itensAdcServ: ItensService) { }

  ngOnInit(): void {
    this.itensadicionais = [{
      id: '1',
      idcategoria: '1',
      nomecategoria: 'Molhos',
      nome: 'Barbecue',
      preco: 4.3,
      info: '10/06/1993 às 10:30',
      disponivel: true
    }];

    setTimeout(() => {
      this.itensAdcServ.consultaCategoriasAdicionais();
    }, 600);
  }

  onClickAddItemAdc(): void {
    this.itensAdcServ.setTipoacao(true);
    this.dialogDelsuc = this.dialog.open(DialogAddItemAdicionalComponent, {
      width: '500px',
    });
  }

  onClickEditarItem(): void {
    this.itensAdcServ.setTipoacao(false);
    this.dialogDelsuc = this.dialog.open(DialogAddItemAdicionalComponent, {
      width: '500px',
    });
  }

  onClickItemAdicional(item: any) {
    this.itensAdcServ.setItemAdicional(item);
  }


}
