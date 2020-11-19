import { CrudServicoService } from 'src/app/crud-servico.service';
import { ItensService } from './itens.service';
import { DialogAddItemAdicionalComponent } from './../dialogs/dialog-add-item-adicional/dialog-add-item-adicional.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { CategoriaAdicionalService } from '../categorias-adicionais/categoria-adicional.service';

@Component({
  selector: 'app-itens-adicionais',
  templateUrl: './itens-adicionais.component.html',
  styleUrls: ['./itens-adicionais.component.css']
})
export class ItensAdicionaisComponent implements OnInit {

  displayedColumns: string[] = ['opcoes', 'disponivel', 'nome', 'nomecategoria', 'preco', 'info', 'datamodificado', 'remover'];
  itensadicionais = [];
  dialogDelsuc: any;
  cardapio: any;
  constructor(private dialog: MatDialog, public itensAdcServ: ItensService, private servcatadc: CategoriaAdicionalService,
              public servcadc: CategoriaAdicionalService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.servcadc.consultaCategoriasAdicionais();
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
      this.itensAdcServ.consultaAdicionais();
    }, 300);
    this.consultaCardapio();
  }

  onClickAddItemAdc(): void {
    this.itensAdcServ.setTipoacao(true);
    this.dialogDelsuc = this.dialog.open(DialogAddItemAdicionalComponent, {
      width: '500px',
      data: this.cardapio
    });
  }

  onClickEditarItem(): void {
    this.itensAdcServ.setTipoacao(false);
    this.dialogDelsuc = this.dialog.open(DialogAddItemAdicionalComponent, {
      width: '500px',
      data: this.cardapio
    });
  }

  onClickItemAdicional(item: any) {
    this.itensAdcServ.setItemAdicional(item);
  }


  consultaCardapio() {
    console.log('#consultaMotoboys');
    this.crud.get_api('cardapio&acmenu=listar').subscribe(data => {
      console.log('Catalogo itens');
      console.log(data.catalogo);
      this.cardapio = data.catalogo ;
    });
  }

}
