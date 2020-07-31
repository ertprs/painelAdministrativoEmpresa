import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  private hrfun: any; // config. de horário de dias de funcionamento

  constructor() {
  }

  getHrfun() {
    return [
      { nome: 'Domingo', abre: '18:30', fecha: '23:30', status: true },
      {
        nome: 'Segunda-Feira',
        abre: '18:30',
        fecha: '23:30',
        status: false
      },
      {
        nome: 'Terça-Feira',
        abre: '18:30',
        fecha: '23:30',
        status: false
      },
      {
        nome: 'Quarta-Feira',
        abre: '18:30',
        fecha: '23:30',
        status: false
      },
      {
        nome: 'Quinta-Feira',
        abre: '18:30',
        fecha: '23:30',
        status: false
      },
      {
        nome: 'Sexta-Feira',
        abre: '18:30',
        fecha: '23:30',
        status: false
      },
      { nome: 'Sábado', abre: '18:30', fecha: '23:30', status: false }
    ];
  }

  getFormaspagamento() {
    return [{
      nome: 'dinheiro',
      status: true,
      descricao: 'Dinheiro na hora da entrega',
      imagem: ''
  },
  {
      nome: 'cartão',
      status: true,
      descricao: 'Na hora da entrega',
      imagem: '',
      itens: [{
              nome: 'Master Card',
              status: true,
              imagem: 'imagemcartao.jpg'
          },
          { nome: 'Visa Card', status: true, imagem: 'imagemcartao.jpg' },
          { nome: 'Ouro Card', status: false, imagem: 'imagemcartao.jpg' }
      ]
  }
];
  }

getLocaisEntrega() {
  return [{
    id: '1',
    nome: 'Juazeiro',
    status: true,
    bairros: [{
            id: '19',
            idcidade: '1',
            nome: 'Centro',
            status: true,
            taxa: 7
        },
        {
            id: '2',
            idcidade: '1',
            nome: 'Centro',
            status: true,
            taxa: 7
        },
        {
            id: '3',
            idcidade: '4',
            nome: 'Centenario',
            status: true,
            taxa: 7
        },
        {
            id: '5',
            idcidade: '1',
            nome: 'Piranga',
            status: true,
            taxa: 7
        },
        {
            id: '6',
            idcidade: '1',
            nome: 'Joao Paulo ||',
            status: false,
            taxa: 7
        }
    ]
},
{
    id: '2',
    nome: 'Petrolina',
    status: true,
    bairros: [{
        id: '1',
        idcidade: '1',
        nome: 'Areia Branca',
        status: true,
        taxa: 17
    }]
}
];
}

}
