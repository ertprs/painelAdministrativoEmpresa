import { Component, OnInit } from '@angular/core';
import { UsuariosAdmService } from '../usuarios/usuarios-adm.service';

@Component({
  selector: 'app-finaceiro',
  templateUrl: './finaceiro.component.html',
  styleUrls: ['./finaceiro.component.css']
})
export class FinaceiroComponent implements OnInit {

  btConcbancaria = true;
  btCartao = true;
  btDin = true;
  btFiado = true;
  btEntrega = true;
  btFinan = true;

  constructor(private us: UsuariosAdmService) { }

  ngOnInit(): void {
    this.btConcbancaria = this.us.getPermissoessuario()[7].children[0].status;
    this.btCartao = this.us.getPermissoessuario()[7].children[1].status;
    this.btDin = this.us.getPermissoessuario()[7].children[2].status;
    this.btFiado = this.us.getPermissoessuario()[7].children[3].status;
    this.btEntrega = this.us.getPermissoessuario()[7].children[4].status;
    this.btFinan = this.us.getPermissoessuario()[7].children[5].status;
  }

}
