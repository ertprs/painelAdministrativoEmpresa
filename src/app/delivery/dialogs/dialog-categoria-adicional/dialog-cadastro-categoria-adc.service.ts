import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogCadastroCategoriaAdcService {

  tipoacao: boolean;
  item: any;

  constructor() { }

  setTipoacao(acao: boolean) {
    this.tipoacao = acao;
  }
  getTipoacao() {
    return this.tipoacao;
  }

  setCategoriaAdicional(item: any) {
    this.item = item;
  }

  getCategoriaAdicional() {
    return this.item;
  }

}
