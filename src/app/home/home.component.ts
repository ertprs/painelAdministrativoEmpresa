import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DialogAddCatComponent } from './dialog-add-cat/dialog-add-cat.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddItemComponent } from './dialog-add-item/dialog-add-item.component';
import { DialogEditarCarComponent } from './dialog-editar-car/dialog-editar-car.component';
import { DialogEditarItemComponent } from './dialog-editar-item/dialog-editar-item.component';
import { FormBuilder } from '@angular/forms';
import { HomeService } from './home.service';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  itenscardapio: any;
  categorias: any;
  dialogDelsuc: any;
  public formCategoria: any;
  itemRequest: any;
  statusloader = false;
  urlQR = '';

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, public servico: HomeService,
              private crud: CrudServicoService, public servicoapp: ServicoService, private route: Router) { }

  ngOnInit(): void {

    this.consultaCardapio();
    this.servico.consultaModelItem();

    setTimeout( () => { this.statusloader = true; } , 900);
    this.urlQR = this.servicoapp.getURLCODE();
    console.log(this.urlQR);
  }


  setItemRequest(item) {
      this.itemRequest = item;
  }
  getItemRequest() {
    return this.itemRequest;
}

  dialogAddCat() {
    this.dialogDelsuc = this.dialog.open(DialogAddCatComponent, {
      width: '450px',
    });

    this.dialogDelsuc.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.servicoapp.setDialogapp(this.dialogDelsuc);
  }

  dialogAddItem(categoria: any) {
    this.servico.setTipoAcao(false);
    this.servico.setCategoria(categoria);
    this.route.navigate(['painel/configitem']);
    /*
    this.dialogDelsuc = this.dialog.open(DialogAddItemComponent, {
      width: '550px',
    });

    this.dialogDelsuc.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

    this.servico.setCategoria(categoria);
    this.servicoapp.setDialogapp(this.dialogDelsuc);
    */
  }

  dialogEditarCar(categoria: any) {
    this.dialogDelsuc = this.dialog.open(DialogEditarCarComponent, {
      width: '550px',
    });

    this.dialogDelsuc.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.servico.setCategoria(categoria);
    this.servicoapp.setDialogapp(this.dialogDelsuc);
  }

  dialogEditarItem(item: any, categoria: any) {


    this.servico.setItem(item);

    this.dialogDelsuc = this.dialog.open(DialogEditarItemComponent, {
      width: '550px',
    });

    this.dialogDelsuc.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.servico.setCategoria(categoria);
    this.servicoapp.setDialogapp(this.dialogDelsuc);
  }



  consultaCardapio() {
    this.servico.consultaCardapio();
  }

  removerCat(categoria: any) {
    const accallback = () => {
      const r = this.servicoapp.getRespostaApi();
      if (r.erro === true) { this.servicoapp.mostrarMensagem(r.mensagem); } else {
        this.servicoapp.mostrarMensagem(r.mensagem);
        this.servico.consultaCardapio();
      }
    };
    this.crud.post_api('cardapio&acmenu=removerCategoria', accallback, categoria, true);
  }

  removerItem(item: any) {
    const accallback = () => {
      const r = this.servicoapp.getRespostaApi();
      if (r.erro === true) { this.servicoapp.mostrarMensagem(r.mensagem); } else {
        this.servicoapp.mostrarMensagem(r.mensagem);
        this.servico.consultaCardapio();
      }
    };
    this.crud.post_api('cardapio&acmenu=removerItem', accallback, item, true);
  }

  onClickConfigurarItem(item, categoria) {
    this.servico.setItem(item);
    this.servico.setTipoAcao(true);
    this.servico.setCategoria(categoria);
    this.route.navigate(['painel/configitem']);
  }


}
