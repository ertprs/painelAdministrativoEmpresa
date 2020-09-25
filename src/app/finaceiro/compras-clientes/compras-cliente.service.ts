import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComprasClienteService {

  listaPedidos: any;

  constructor() { }

  setListaPedidos(lista) { this.listaPedidos = lista; }
  getListaPedidos() { return this.listaPedidos; }
}
