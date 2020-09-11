import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private totalFaturamento: 0;
  private qntPedidos: 0;
  private valorCupom: 0;

  constructor() { }

  setTotalFat(valor) { this.totalFaturamento = valor; }
  getTotalFat() { return this.totalFaturamento; }

  setQntPedido(quantidade) { this.qntPedidos = quantidade; }
  getQntPedido() { return this.qntPedidos; }

  setCupom(valor) { this.valorCupom = valor; }
  getCupom() { return this.valorCupom; }
}
