import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidosService } from '../pedidos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicoService } from 'src/app/servico.service';
import { UsuariosAdmService } from 'src/app/usuarios/usuarios-adm.service';

@Component({
  selector: 'app-painel-pedidos',
  templateUrl: './painel-pedidos.component.html',
  styleUrls: ['./painel-pedidos.component.css']
})
export class PainelPedidosComponent implements OnInit {

  form: FormGroup;


  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, public us: UsuariosAdmService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      statusdelivery: [this.servapp.getDadosEmpresa().status_delivery]
    });
  }

  onClickStatusDelivery() {
    let status = this.form.value.statusdelivery;
    if (status) { status = false; } else { status = true; }
    if (this.servapp.getStatusfatura()) { 
      return;
     }
    this.servapp.getDadosEmpresa().status_delivery = status;
    this.servpedidos.onClickAttStatusDelivery(status);
  }

}
