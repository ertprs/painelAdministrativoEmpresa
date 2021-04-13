import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidosService } from '../pedidos.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServicoService } from 'src/app/servico.service';
import { UsuariosAdmService } from 'src/app/usuarios/usuarios-adm.service';
import { MsgRemotaComponent } from 'src/app/msg-remota/msg-remota.component';

@Component({
  selector: 'app-painel-pedidos',
  templateUrl: './painel-pedidos.component.html',
  styleUrls: ['./painel-pedidos.component.css']
})
export class PainelPedidosComponent implements OnInit {

  form: FormGroup;
  btsp = [{ selecionado: true}, { selecionado: false}];
  dialogDelsuc: any;


  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, public us: UsuariosAdmService, private router: Router) { }

  ngOnInit(): void {


    if (!this.servapp.getStatusSistemaDelivery()) {
      this.servapp.mostrarMensagem('Conclua a configuração para funcionamento delivery');
      this.router.navigate(['/painel/delivery']);
      return;
    }

    // verifica se existe alguma rota remota
    if (this.servapp.rotaRemota) {
      this.router.navigate([this.servapp.rotaRemota]).then(data => {
        console.log('OK');
        // depois de ja ter ido a rota deixa como vazia para nao ficar indo toda hora
        this.servapp.rotaRemota = '';
        if (this.servapp.mensagemRemota) {
          this.mostraMsgRemota(this.servapp.mensagemRemota);
        }
      });
    } else if (this.servapp.mensagemRemota) {
      this.mostraMsgRemota(this.servapp.mensagemRemota);
    }

    this.form = this.formBuilder.group({
      statusdelivery: [this.servapp.getDadosEmpresa().status_delivery]
    });
  }

  mostraMsgRemota(html: string) {
    this.dialogDelsuc = this.dialog.open(MsgRemotaComponent, {
      width: '700px',
      data: html,
    });

    this.dialogDelsuc.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
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

  onclickBtPainel(bt) {
    this.btsp.forEach(element => {
      element.selecionado = false;
    });
    this.btsp[bt].selecionado = true;
  }

}
