import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { DialogCadastroCategoriaAdcService } from './../dialogs/dialog-categoria-adicional/dialog-cadastro-categoria-adc.service';
import { DialogCategoriaAdicionalComponent } from './../dialogs/dialog-categoria-adicional/dialog-categoria-adicional.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogPedidoComponent } from '../dialogs/dialog-pedido/dialog-pedido.component';
import { CategoriaAdicionalService } from './categoria-adicional.service';

@Component({
  selector: 'app-categorias-adicionais',
  templateUrl: './categorias-adicionais.component.html',
  styleUrls: ['./categorias-adicionais.component.css']
})
export class CategoriasAdicionaisComponent implements OnInit {

  displayedColumns: string[] = ['opcoes', 'disponivel', 'nome', 'descricao', 'info', 'datamodificado', 'btsfim'];
  dialogDelsuc: any;

  constructor(private dialog: MatDialog, private servDCadc: DialogCadastroCategoriaAdcService,
              private servapp: ServicoService, private crud: CrudServicoService, public servcatadc: CategoriaAdicionalService) { }

  ngOnInit(): void {


    setTimeout( () => {
      console.log('#getCategoriasAdicional');
      this.servcatadc.consultaCategoriasAdicionais();
    } , 600 );

  }


  onClickItem(item) {
    console.log(item);
    this.servDCadc.setCategoriaAdicional(item);
  }

  onClickEditarItem() {
    this.servDCadc.setTipoacao(true);
    this.dialogDelsuc = this.dialog.open(DialogCategoriaAdicionalComponent, {
      width: '500px',
    });

    this.dialogDelsuc.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onClickAddCat(): void {
    this.servDCadc.setTipoacao(false);

    this.dialogDelsuc = this.dialog.open(DialogCategoriaAdicionalComponent, {
      width: '500px',
    });

    this.dialogDelsuc.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  onClickRemover(item) {
    this.servDCadc.setCategoriaAdicional(item);
  }

}
