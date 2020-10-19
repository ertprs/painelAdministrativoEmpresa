import { Component, OnInit } from '@angular/core';
import { UsuariosAdmService } from '../usuarios/usuarios-adm.service';

@Component({
  selector: 'app-painel2-relatorio',
  templateUrl: './painel2-relatorio.component.html',
  styleUrls: ['./painel2-relatorio.component.css']
})
export class Painel2RelatorioComponent implements OnInit {

  bt1 = true;
  bt2 = true;
  bt3 = true;

  constructor(public us: UsuariosAdmService) { }

  ngOnInit(): void {
    this.bt1 = this.us.getPermissoessuario()[6].children[0].status;
    this.bt2 = this.us.getPermissoessuario()[6].children[1].status;
    this.bt3 = this.us.getPermissoessuario()[6].children[2].status;
  }

}
