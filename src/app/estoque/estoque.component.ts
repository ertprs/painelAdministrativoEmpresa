import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CrudServicoService } from '../crud-servico.service';
import { PedidosService } from '../delivery/pedidos/pedidos.service';
import { DialogDinamComponent } from '../dialog-dinam/dialog-dinam.component';
import { ServicoService } from '../servico.service';
import { EstoqueService } from './estoque.service';
import { UsuariosAdmService } from '../usuarios/usuarios-adm.service';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css'],
  })
export class EstoqueComponent implements OnInit {

  columnsToDisplay = ['c1'];
  dataSource = [''];

  btAuditoria = true;

  estoqueLoja = true;
  estoqueE = true;
  logistica = true;
  batimentoE = true;

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService, private router: Router, public servestm: EstoqueService,
              public us: UsuariosAdmService) { }

  ngOnInit(): void {

   this.estoqueE = this.us.getPermissoessuario()[5].children[7].status;
   this.btAuditoria = this.us.getPermissoessuario()[5].children[6].status;
   this.batimentoE = this.us.getPermissoessuario()[5].children[9].status;
   this.logistica = this.us.getPermissoessuario()[5].children[8].status;

  }




}


