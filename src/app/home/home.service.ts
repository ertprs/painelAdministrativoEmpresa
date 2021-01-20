import { Injectable } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private categoria: any;
  private item: any;
  private cardapio: [];
  private acao: boolean;
  private modelitem;
  public statusloaderpage = false;

  constructor(private crud: CrudServicoService) {

   }

  setCategoria(cat: any) {  this.categoria = cat; }
  getCategoria() { return this.categoria; }

  setItem(itemin: any) {  this.item = itemin; }
  getItem() { return this.item; }

  setCardapio(arrayCard: any) {  this.cardapio = arrayCard; }
  getCardapio() { return this.cardapio; }

  consultaCardapio() {
    this.crud.get_api('cardapio&acmenu=listar').subscribe(data => {
      this.cardapio = data.catalogo ;
      this.consultaModelItem();
    });
  }

  consultaModelItem() {
    this.crud.get_api('get_model_item').subscribe(data => {
      this.modelitem = data;
      this.statusloaderpage = true;
    });
  }

  getItemModel() {
    return this.modelitem;
  }

  getstatusLoaderpage() {
    return this.statusloaderpage;
  }

  setTipoAcao(acao: boolean) { this.acao = acao; }
  getTipoAcao() { return this.acao; }


}
