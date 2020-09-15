import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private listaMotoboys: any;
  private motoboySelecionado: {nome: '', id: ''};
  private nomeMotoboy = '';
  private idMotoboy = '';
  constructor() { }


  setListaMotoboys(lista) {
    this.listaMotoboys = lista;
  }

  getListaMotoboys() {
    return this.listaMotoboys;
  }

  setMotoboySelecionado(element) {
    this.motoboySelecionado = element;
    this.nomeMotoboy = element.nome;
    this.idMotoboy = element.id;
  }

  getMotoboySelecionado() {
    return this.motoboySelecionado;
  }

  getNomeMS() {
    return this.nomeMotoboy ;
  }

  getIdMotoboy() {
    return this.idMotoboy ;
  }
  


}
