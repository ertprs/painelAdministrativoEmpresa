import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { CadastroPedidoService } from 'src/app/delivery/pedidos/cadastro-pedido/cadastro-pedido.service';
import { ServicoService } from 'src/app/servico.service';
import { EnderecosClienteComponent } from '../enderecos-cliente/enderecos-cliente.component';

@Component({
  selector: 'app-clientes-detalhes',
  templateUrl: './clientes-detalhes.component.html',
  styleUrls: ['./clientes-detalhes.component.css']
})
export class ClientesDetalhesComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c5'];
  itens = [];
  itemSelecionado: any;

  constructor(private crud: CrudServicoService, private servico: ServicoService, private dialog: MatDialog,
              private router: Router,  private sercard: CadastroPedidoService) { }

  ngOnInit(): void {
    setTimeout( () => { this.f5(); }, 600 );
  }

  f5() {
    this.crud.get_api('cons_cliente_lista_emp').subscribe(data => {
       console.log(data);
       this.itens = data;
    });
}

onClickCadastraPedido(item: any) {
  this.sercard.setCadastroClienteLista(item);
  // this.router.navigate(['/painelpedidos/cadastro-pedido']);
  this.router.navigate(['/inicio']);
}
enderecoCliente(element): void {
  const dialogRef = this.dialog.open(EnderecosClienteComponent, {
    width: '750px',
    data: {item: element}
  });

  dialogRef.afterClosed().subscribe(result => {

    console.log(result);

    console.log('The dialog was closed');
    this.itemSelecionado.id = result.id;
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


}
