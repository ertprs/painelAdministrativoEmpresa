import { Router } from '@angular/router';
import { FormularioUsuarioComponent } from './formulario-usuario/formulario-usuario.component';
import { MatDialog } from '@angular/material/dialog';
import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from './../crud-servico.service';
import { Component, OnInit } from '@angular/core';
import { UsuariosAdmService } from './usuarios-adm.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  displayedColumns: string[] = ['op', 'email', 'nome', 'senha', 'tipo', 'ultimo_login', 'info', 'add'];
  itens = [];

  constructor(private crud: CrudServicoService, private servico: ServicoService, private dialog: MatDialog, private route: Router,
              private us: UsuariosAdmService) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('usuarios').subscribe(data => {
       console.log(data);
       this.itens = data.resultado;
    });
}

add(): void {
  const dialogRef = this.dialog.open(FormularioUsuarioComponent, {
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

confp(item) {
  this.us.setUsuario(item);
  this.route.navigate(['/painel/usuarios-permissoes']);
}

onClickEditar(item): void {
  const dialogRef = this.dialog.open(FormularioUsuarioComponent, {
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
  this.crud.post_api('editar_usuario', accallback, form);
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
  this.crud.post_api('add_usuario', accallback, form);
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
  this.crud.post_api('remover_usuario', accallback, item);

}

}
