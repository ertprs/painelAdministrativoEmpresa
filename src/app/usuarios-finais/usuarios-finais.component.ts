import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddMototboyComponent } from '../dialog-add-mototboy/dialog-add-mototboy.component';
import { DialogDinamComponent } from '../dialog-dinam/dialog-dinam.component';
import { FormCupomComponent } from '../cupons/form-cupom/form-cupom.component';

@Component({
  selector: 'app-usuarios-finais',
  templateUrl: './usuarios-finais.component.html',
  styleUrls: ['./usuarios-finais.component.css']
})
export class UsuariosFinaisComponent implements OnInit {

  displayedColumns: string[] = ['op', 'op2', 'tipo', 'c1', 'c2', 'c3', 'add'];
  itens = [];
  dadosCupomAdd: any;
  acao: string;
  qntusuarios: number;


  constructor(private crud: CrudServicoService, private servico: ServicoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('usuarios_app').subscribe(data => {
       console.log(data);
       this.itens = data.resultado.lista;
       this.qntusuarios = data.resultado.quantidade;
    });
}

add(): void {
  const dialogRef = this.dialog.open(DialogAddMototboyComponent, {
    width: '450px',
    data: {acao: 'add'}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
    this.f1(result) ;
    }
  });
}

onClickEditar(item): void {
  const dialogRef = this.dialog.open(DialogAddMototboyComponent, {
    width: '450px',
    data: {acao: 'editar', usuario: item}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
    this.editar(result) ;
    }
  });
}

enviarCupom(usuario) {
  const dialogRef = this.dialog.open(FormCupomComponent, {
    width: '350px',
    data: {tipo: 'add', item: usuario, nomeDialog: 'form_cupom'}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
      this.dadosCupomAdd = result;
      this.acao = 'add';
      this.inSenha();
    }
  });
}

addCupom() {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); this.reabrir();  } else {
      this.servico.mostrarMensagem('Cupom adicionado');
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('enviarCupom', accallback, this.dadosCupomAdd);
}

inSenha() {
  const dialogRef = this.dialog.open(DialogDinamComponent, {
    width: '350px',
    data: {tipo: 'add', nomeDialog: 'form_pass'}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);

    if (result) {
      console.log('Envia backend');
      console.log(result);
      this.dadosCupomAdd.senha = result.senha;
      this.addCupom();
    }

  });
}

reabrir() {

  const dialogRef = this.dialog.open(FormCupomComponent, {
    width: '350px',
    data: {tipo: 'editar', nomeDialog: 'form_cupom', item: this.dadosCupomAdd}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);

    if (result) {
      this.inSenha();
    }

  });

}


editar(form) {
  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('editarPerfilEntregador', accallback, form);
}

f1(form) {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('cadatrar_motoboy', accallback, form);
}

removerItem(item) {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('remover_motoboy', accallback, item);

}

onClickItem(element) {
  // alert('configurar');
}

classificar(usuario, tipo): void {
  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.f5();
      usuario.tipo = tipo;
    }
    console.log(r);
  };
  this.crud.post_api('classificarUsuario', accallback, {user: usuario.id, type: tipo});
}

}