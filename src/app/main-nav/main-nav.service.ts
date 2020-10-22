import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainNavService {
  menuSelecionado =  [
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
    {selecionado: false},
  ];
  constructor() { }
}
