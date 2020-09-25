import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conciliacao-bancaria',
  templateUrl: './conciliacao-bancaria.component.html',
  styleUrls: ['./conciliacao-bancaria.component.css']
})
export class ConciliacaoBancariaComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'c2', ];
  dataSource: any;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = [
      { nome: 'Cartão de Crédito', itens: [
        { nome: 'Visa', valor: 400 },
        { nome: 'Mastercard', valor: 400 },
        { nome: 'Elo', valor: 400 },
        { nome: 'Amex', valor: 400 },
        { nome: 'Diners Club', valor: 400 },
        { nome: 'Hipercard', valor: 400 },
      ] },

      { nome: 'Cartão de Débito', itens: [
        { nome: 'Visa', valor: 400 },
        { nome: 'Mastercard', valor: 400 },
        { nome: 'Elo', valor: 400 },
      ] },

      { nome: 'Transferência Bancária', itens: [
        { nome: 'Santander', valor: 400 },
        { nome: 'Bradesco', valor: 400 },
        { nome: 'Itaú', valor: 400 },
        { nome: 'Banco do Brasil', valor: 400 },
        { nome: 'Caixa', valor: 400 },
        { nome: 'Inter', valor: 400 },
        { nome: 'Nubank', valor: 400 },
        { nome: 'C6', valor: 400 },
        { nome: 'Original', valor: 400 },
        { nome: 'Neon', valor: 400 },
      ] },

    ];
  }

}
