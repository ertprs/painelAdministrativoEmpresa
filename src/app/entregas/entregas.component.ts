import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialoDelsucgComponent } from '../dialo-delsucg/dialo-delsucg.component';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';
import { Router } from '@angular/router';
import { DialogHistEntregaComponent } from './dialog-hist-entrega/dialog-hist-entrega.component';
import { ServicoEntregaService } from './servico-entrega.service';


@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.component.html',
  styleUrls: ['./entregas.component.css']
})

export class EntregasComponent implements OnInit {
  listaEntregas: any;
  public entSele = false;
  public cliSele = false;
  public statusEnt: any;
  private dialogCadastroEnt: any;
  private dialogDelsuc: any;
  public btCadastroEntrega: any;

  constructor(public dialog: MatDialog, public servico: ServicoService, private crud: CrudServicoService, private router: Router,
              private antServico: ServicoEntregaService) { }

  ver_entregadorSelecionado() {
    this.entSele = this.servico.getEntregadoeSelecionado();
    if (this.entSele !== false) {
      setTimeout(() => {
        // this.onclickCadastroEnt();
      }, 500);
    }
  }

  ver_clienteSelecionado() {
    this.cliSele = this.servico.getClienteSelecionado();
    if (this.cliSele !== false) {
      setTimeout(() => {
        // this.onclickCadastroEnt();
      }, 500);
    }
  }

  openDialog(): void {
    this.dialogDelsuc = this.dialog.open(DialoDelsucgComponent, {
      width: '250px',
    });

    this.dialogDelsuc.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }
  onclickCadastroEnt(): void {
    if (this.btCadastroEntrega === true) {
      this.servico.mostrarMensagem('É preciso que você entre em contato conosco para podermos configurar seu estabelecimento no Vulto.');
      return;
    }
    this.router.navigate(['cadastro-entrega']);
    /*
    this.dialogCadastroEnt = this.dialog.open(DialogCadastroEntregaComponent, {
      width: '650px',
    });

    this.dialogCadastroEnt.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.antServico.setDialog(this.dialogCadastroEnt);
    */
  }

  onclickFecharDCadEntrega() {
    this.dialogCadastroEnt.close();
  }

  onclickFiltroStatusEnt(status) {
    this.statusEnt = status;
  }

  consultaEntregas() {
    console.log('#consultaEntregas');
    this.crud.get_api('buscar_entrega').subscribe(data => {
      console.log(data);
      this.listaEntregas = data;
    });
  }


  onclickVerHist(entrega: any) {
    console.log('#onclickVerHist');
    this.antServico.setentHist(entrega);
    const dialogRef = this.dialog.open(DialogHistEntregaComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onclickEntrega(item: any) {
    console.log('#onclickEntrega');
    console.log(item);
    this.servico.setEntrega(item);
    this.openDialog();
    this.antServico.setDialog(this.dialogDelsuc);
  }

  ngOnInit(): void {
    this.statusEnt = 0;
    this.consultaEntregas();
    this.ver_entregadorSelecionado();
    if (this.servico.getDadosEmpresa().coordenadas[0] === 'coordenadas') {
      this.btCadastroEntrega = true;
    } else {
      this.btCadastroEntrega = false;
    }

  }

}







