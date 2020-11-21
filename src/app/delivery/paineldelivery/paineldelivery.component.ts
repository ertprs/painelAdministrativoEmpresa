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
  btUsuariosAdm = true;

  btCidade = true;
  btBairro = true;
  btGaleria = true;
  btEntregador = true;
  btFp = true;
  btBancos = true;
  btUsuApp = true;
  btCupom = true;
  btNot = true;
  btPagOnline = true;


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
    this.btUsuariosAdm = this.us.getPermissoessuario()[10].children[9].status;

    this.btCidade = this.us.getPermissoessuario()[10].children[0].status;
    this.btBairro = this.us.getPermissoessuario()[10].children[1].status;
    this.btGaleria = this.us.getPermissoessuario()[10].children[2].status;
    this.btEntregador = this.us.getPermissoessuario()[10].children[3].status;
    this.btFp = this.us.getPermissoessuario()[10].children[4].status;
    this.btBancos = this.us.getPermissoessuario()[10].children[6].status;
    this.btUsuApp = this.us.getPermissoessuario()[10].children[7].status;
    this.btCupom = this.us.getPermissoessuario()[10].children[9].status;
    this.btNot = this.us.getPermissoessuario()[10].children[10].status;
    this.btPagOnline = this.us.getPermissoessuario()[10].children[11].status;

  }

}
