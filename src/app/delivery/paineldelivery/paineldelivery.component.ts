import { ServicoService } from './../../servico.service';
import { Component, OnInit } from '@angular/core';
import { UsuariosAdmService } from 'src/app/usuarios/usuarios-adm.service';

@Component({
  selector: 'app-paineldelivery',
  templateUrl: './paineldelivery.component.html',
  styleUrls: ['./paineldelivery.component.css']
})
export class PaineldeliveryComponent implements OnInit {

  btCardapio = true;
  btItemCardapio = true;
  btCatAdc = true;
  btItemAdc = true;
  btAvaliacoes = true;
  btConfigPainel = true;
  btFunDelivery = true;
  btPerfil = true;
  btrelato = true;
  btDataret = true;
  btOrg = true;

  constructor(public servapp: ServicoService, private us: UsuariosAdmService) { }

  ngOnInit(): void {
    this.btCardapio = this.us.getPermissoessuario()[9].children[0].status;
    this.btItemCardapio = this.us.getPermissoessuario()[9].children[1].status;
    this.btCatAdc = this.us.getPermissoessuario()[9].children[2].status;
    this.btItemAdc = this.us.getPermissoessuario()[9].children[3].status;
    this.btAvaliacoes = this.us.getPermissoessuario()[9].children[4].status;
    // this.btConfigPainel = this.us.getPermissoessuario()[9].children[5].status;
    this.btFunDelivery = this.us.getPermissoessuario()[9].children[5].status;
    this.btPerfil = this.us.getPermissoessuario()[9].children[11].status;
    this.btrelato = this.us.getPermissoessuario()[9].children[6].status;
    this.btDataret = this.us.getPermissoessuario()[9].children[7].status;
    this.btOrg = this.us.getPermissoessuario()[9].children[8].status;
  }

}
