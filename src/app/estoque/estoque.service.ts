import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  private listaMotoboys: any;
  private motoboySelecionado: {imagem: '', nome: '', id: ''};
  private nomeMotoboy = '';
  private idMotoboy = '';
  private imagemMt = '';
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
    if (element.imagem) {
      this.imagemMt = element.imagem;
    }
  }

  getMotoboySelecionado() {
    return this.motoboySelecionado;
  }

  getNomeMS() {
    return this.nomeMotoboy ;
  }
  
  getImagemMS() {
    return this.imagemMt;
  }

  getIdMotoboy() {
    return this.idMotoboy ;
  }



}
