import { FormEnderecoClienteComponent } from './form-endereco-cliente/form-endereco-cliente.component';
import { EnderecosClienteComponent } from './enderecos-cliente/enderecos-cliente.component';
import { CadastroPedidoService } from './../delivery/pedidos/cadastro-pedido/cadastro-pedido.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCadastroClienteComponent } from '../dialog-cadastro-cliente/dialog-cadastro-cliente.component';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { Router } from '@angular/router';
import { UsuariosAdmService } from '../usuarios/usuarios-adm.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = ['op', 'nome', 'telefone', 'aniversario', 'tipo', 'info', 'add'];
  itens = [];
  itemSelecionado: any;
  btblista = false;
  addCli = false;
  btMenu = false;
  btRemo = false;
  constructor(private crud: CrudServicoService, public servico: ServicoService, private dialog: MatDialog,
              private router: Router,  private sercard: CadastroPedidoService, public us: UsuariosAdmService) { }

  ngOnInit(): void {
    setTimeout( () => { this.f5(); }, 600 );
    console.log('Meus cliente...');
    this.btblista = this.us.getPermissoessuario()[1].children[0].status;
    this.addCli = this.us.getPermissoessuario()[1].children[3].status;
    this.btMenu = this.us.getPermissoessuario()[1].children[2].status;
    this.btRemo = this.us.getPermissoessuario()[1].children[1].status;
  }

  f5() {
    this.crud.get_api('cons_cliente_lista_emp').subscribe(data => {
       console.log(data);
       this.itens = data;
    });
}

add(): void {
  const dialogRef = this.dialog.open(DialogCadastroClienteComponent, {
    width: '650px',
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
  const dialogRef = this.dialog.open(DialogCadastroClienteComponent, {
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
  this.crud.post_api('att_cliente_lista_emp', accallback, form);
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
  this.crud.post_api('add_cliente_lista_emp', accallback, form);
}

removerItem(item) {

  item.idendereco = item.id;

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('remove_cliente_lista_emp', accallback, item);

}


onClickBtMenu(element) {
  this.itemSelecionado = element;
}

onClickCadastraPedido(item: any) {
  this.sercard.setCadastroClienteLista(item);
  this.router.navigate(['/painelpedidos/cadastro-pedido']);
  // this.router.navigate(['/inicio']);
}


enderecoCliente(element): void {
  const dialogRef = this.dialog.open(EnderecosClienteComponent, {
    width: '750px',
    data: {item: element}
  });

  dialogRef.afterClosed().subscribe(result => {

    console.log(result);


    if (!result) { return; }
    if (result === 'add_endereco') { 
      this.formaddEnd();
      return;
    }

    if (result.acao === 'rem_endereco') { 
      this.removerEndereco(result.item);
      return;
    }

    console.log('The dialog was closed');
    // this.itemSelecionado.id = result.id;
    this.itemSelecionado.rua = result.rua;
    this.itemSelecionado.numero = result.numero;
    this.itemSelecionado.bairro = result.bairro;
    this.itemSelecionado.cidade = result.cidade;
    this.itemSelecionado.complemento = result.complemento;
    this.itemSelecionado.tiporesidencia = result.tiporesidencia;

    this.sercard.iniciaFormCadastro.emit(this.itemSelecionado);

    this.onClickCadastraPedido(this.itemSelecionado);
    console.log(this.itemSelecionado);
  });
}

formaddEnd() {
  const dialogRef = this.dialog.open(FormEnderecoClienteComponent, {
    width: '450px',
    data: {acao: 'editar', item: this.itemSelecionado}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
        
      const accallback = () => {
        console.log('callback');
        const r = this.servico.getRespostaApi();
        if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
          this.servico.mostrarMensagem(r.detalhes);
          this.f5();
        }
        console.log(r);
      };
      this.crud.post_api('add_end_usuario', accallback, result);
      
    }
  });
}

removerEndereco(item) {
  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
    }
    console.log(r);
  };
  this.crud.post_api('removerEndereco', accallback, item);
}

}
