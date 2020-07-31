import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicoEntregaService {
  private entregaHist: any;
  private dialog: any;
  constructor() { }

  setentHist(entrega: any) { this.entregaHist = entrega; }
  getentHist() { return this.entregaHist; }

  setDialog(d: any) { console.log('setDialog'); this.dialog = d; }
  getDialog() { return this.dialog; }
}
