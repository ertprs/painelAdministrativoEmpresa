import { ReporEstoqueComponent } from './../repor-estoque/repor-estoque.component';
import { EstoqueRetirarLojaComponent } from './../estoque-retirar-loja/estoque-retirar-loja.component';
import { EstoqueEnviarComponent } from './../estoque-enviar/estoque-enviar.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { PedidosService } from 'src/app/delivery/pedidos/pedidos.service';
import { DialogDinamComponent } from 'src/app/dialog-dinam/dialog-dinam.component';
import { ServicoService } from 'src/app/servico.service';
import { FormEstoqueComponent } from '../form-estoque/form-estoque.component';

@Component({
  selector: 'app-itens-estoque',
  templateUrl: './itens-estoque.component.html',
  styleUrls: ['./itens-estoque.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ItensEstoqueComponent implements OnInit {

  columnsToDisplay = ['nome', 'descricao', 'quantidade', 'valor', 'info', 'sub', 'remover', 'editar', 'adicionar'];
  dataSource = [];
  expandedElement: any | null;
  dialogDelsuc: any;
  statusLoadEntregas: boolean;
  form: FormGroup;
  sst = false;

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService, private router: Router) { }

  ngOnInit(): void {
   this.estoque();
  }
  estoque() {
    this.crud.get_api('estoque').subscribe(data => {
        this.dataSource = data;
    });
}


add(): void {
  const dialogRef = this.dialog.open(FormEstoqueComponent, {
    width: '450px',
    data: {tipo: 'add', nomeDialog: 'form_estoque'}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
    this.f1(result) ;
    }
  });
}

editar(element): void {
  const dialogRef = this.dialog.open(FormEstoqueComponent, {
    width: '450px',
    data: {tipo: 'editar', nomeDialog: 'form_estoque', item: element}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
   
      const accallback = () => {
        console.log('callback');
        const r = this.servapp.getRespostaApi();
        if (r.erro === true) { this.servapp.mostrarMensagem(r.mensagem); } else {
          this.servapp.mostrarMensagem(r.mensagem);
          this.dataSource = r.itens;
        }
        console.log(r);
      };
      this.crud.post_api('attEstoque', accallback, result);

    }
  });
}

f1(form) {

  const accallback = () => {
    console.log('callback');
    const r = this.servapp.getRespostaApi();
    if (r.erro === true) { this.servapp.mostrarMensagem(r.detalhes); } else {
      this.servapp.mostrarMensagem(r.detalhes);
      this.dataSource = r.resultado;
    }
    console.log(r);
  };
  this.crud.post_api('addEstoque', accallback, form);
}

enviarNovoEstoque(element): void {
  const dialogRef = this.dialog.open(EstoqueEnviarComponent, {
    width: '450px',
    data: {tipo: 'editar', nomeDialog: 'form_estoque_enviar_novo', item: element}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {

      const accallback = () => {
        console.log('callback');
        const r = this.servapp.getRespostaApi();
        if (r.erro === true) { this.servapp.mostrarMensagem(r.detalhes.mensagem); } else {
          this.servapp.mostrarMensagem(r.detalhes.mensagem);
          this.dataSource = r.detalhes.itens;
        }
        console.log(r);
      };
      this.crud.post_api('enviaEstoque', accallback, result);


    }
  });
}

retirarEstoqueLoja(element) {
  const dialogRef = this.dialog.open(EstoqueRetirarLojaComponent, {
    width: '450px',
    data: {item: element}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {

      const accallback = () => {
        console.log('callback');
        const r = this.servapp.getRespostaApi();
        if (r.erro === true) { this.servapp.mostrarMensagem(r.detalhes.mensagem); } else {
          this.servapp.mostrarMensagem(r.detalhes.mensagem);
          this.dataSource = r.detalhes.itens;
        }
        console.log(r);
      };
      this.crud.post_api('retirar_estoque_loja', accallback, result);

    }
  });
}

reporEstoqueLoja(element) {
  const dialogRef = this.dialog.open(ReporEstoqueComponent, {
    width: '450px',
    data: {item: element}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {

      const accallback = () => {
        console.log('callback');
        const r = this.servapp.getRespostaApi();
        if (r.erro === true) { this.servapp.mostrarMensagem(r.detalhes.mensagem); } else {
          this.servapp.mostrarMensagem(r.detalhes.mensagem);
          this.dataSource = r.detalhes.itens;
        }
        console.log(r);
      };
      this.crud.post_api('repor_estoque_loja', accallback, result);

    }
  });
}

desabilitarEstoqueLoja(element) {
  const accallback = () => {
    console.log('callback');
    const r = this.servapp.getRespostaApi();
    if (r.erro === true) { this.servapp.mostrarMensagem(r.detalhes.mensagem); } else {
      this.servapp.mostrarMensagem(r.detalhes.mensagem);
      this.dataSource = r.detalhes.itens;
    }
    console.log(r);
  };
  this.crud.post_api('desabilitar_estoque_loja', accallback, {id: element.id});

}



}