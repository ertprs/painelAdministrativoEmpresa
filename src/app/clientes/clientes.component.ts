import { FormGroup, FormBuilder } from '@angular/forms';
import { FormEnderecoClienteComponent } from './form-endereco-cliente/form-endereco-cliente.component';
import { EnderecosClienteComponent } from './enderecos-cliente/enderecos-cliente.component';
import { CadastroPedidoService } from './../delivery/pedidos/cadastro-pedido/cadastro-pedido.service';
import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCadastroClienteComponent } from '../dialog-cadastro-cliente/dialog-cadastro-cliente.component';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { Router } from '@angular/router';
import { UsuariosAdmService } from '../usuarios/usuarios-adm.service';
import { debounceTime } from 'rxjs/operators';

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
  form: FormGroup;
  statusCons = false;
  constructor(private crud: CrudServicoService, public servico: ServicoService, private dialog: MatDialog,
              private router: Router,  private sercard: CadastroPedidoService, public us: UsuariosAdmService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.btblista = this.us.getPermissoessuario()[1].children[0].status;
    this.addCli = this.us.getPermissoessuario()[1].children[3].status;
    this.btMenu = this.us.getPermissoessuario()[1].children[2].status;
    this.btRemo = this.us.getPermissoessuario()[1].children[1].status;

    this.form = this.fb.group({
      clienteNome: ['']
    });
    this.f5();
  }



  consultaClienteFiltro() {
    this.statusCons = true;
    const accallback = () => {
    const r = this.servico.getRespostaApi();
    this.statusCons = false;
    if (r.erro === true) { } else {
      this.itens = r.resultado;
    }
  };
    this.crud.post_api('consulta_cliente_filtro', accallback, {nome: this.form.value.clienteNome});
  }

  f5() {
    this.statusCons = true;
    this.crud.get_api('cons_cliente_lista_emp&limit=30').subscribe(data => {
       this.statusCons = false;
       this.itens = data;
    });
}

add(): void {
  const dialogRef = this.dialog.open(DialogCadastroClienteComponent, {
    width: '650px',
    data: {acao: 'add'}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    this.f5();
    }
  });
}

onClickEditar(item): void {
  const dialogRef = this.dialog.open(DialogCadastroClienteComponent, {
    width: '650px',
    data: {acao: 'editar', usuario: item}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
    this.consultaClienteFiltro() ;
    }
  });
}

editar(form) {
  const accallback = () => {
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.f5();
    }
  };
  this.crud.post_api('att_cliente_lista_emp', accallback, form);
}


removerItem(item) {

  item.idendereco = item.id;

  const accallback = () => {
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.f5();
    }
  };
  this.crud.post_api('remove_cliente_lista_emp', accallback, item);

}


onClickBtMenu(element) {
  this.itemSelecionado = element;
}

onClickCadastraPedido(item: any) {
  this.sercard.limparCarrinho();
  this.sercard.setCadastroClienteLista(item);
  this.router.navigate(['/painelpedidos/cadastro-pedido']);
  // this.router.navigate(['/inicio']);
}


enderecoCliente(element): void {
  const dialogRef = this.dialog.open(EnderecosClienteComponent, {
    width: '950px',
    data: {item: element}
  });

  dialogRef.afterClosed().subscribe(result => {


    if (!result) { return; }
    if (result === 'add_endereco') {
      this.formaddEnd();
      return;
    }

    if (result.acao === 'rem_endereco') {
      this.removerEndereco(result.item);
      return;
    }

    // this.itemSelecionado.id = result.id;
    this.itemSelecionado.rua = result.rua;
    this.itemSelecionado.numero = result.numero;
    this.itemSelecionado.bairro = result.bairro;
    this.itemSelecionado.cidade = result.cidade;
    this.itemSelecionado.complemento = result.complemento;
    this.itemSelecionado.tiporesidencia = result.tiporesidencia;

    this.sercard.iniciaFormCadastro.emit(this.itemSelecionado);

    this.onClickCadastraPedido(this.itemSelecionado);
  });
}

formaddEnd() {
  const dialogRef = this.dialog.open(FormEnderecoClienteComponent, {
    width: '450px',
    data: {acao: 'editar', item: this.itemSelecionado}
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {

      this.f5();

    }
  });
}

removerEndereco(item) {
  item.idendereco = item.id;
  const accallback = () => {
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
    }
  };
  this.crud.post_api('removerEndereco', accallback, item);
}

}
