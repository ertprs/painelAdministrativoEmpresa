import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RelatorioService {

  private totalFaturamento: 0;
  private qntPedidos: 0;
  private valorCupom: 0;
  private  ticketmedio = 0;
  private statusLoader = false;

  constructor() { }

  setTotalFat(valor) { this.totalFaturamento = valor; }
  getTotalFat() { return this.totalFaturamento; }

  setQntPedido(quantidade) { this.qntPedidos = quantidade; }
  getQntPedido(): number { return this.qntPedidos; }

  setCupom(valor) { this.valorCupom = valor; }
  getCupom() { return this.valorCupom; }

  setTicketMedio(valor) { this.ticketmedio = valor; }
  getTicketMedio() { return this.ticketmedio; }

  setStatusLoader(status: boolean) { this.statusLoader = status; }
  getStatusLoader(): boolean { return this.statusLoader; }


}
