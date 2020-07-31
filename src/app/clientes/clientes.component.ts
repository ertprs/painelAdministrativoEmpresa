import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCadastroClienteComponent } from '../dialog-cadastro-cliente/dialog-cadastro-cliente.component';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  listaCliente: any;
  constructor(public dialog: MatDialog, private crud: CrudServicoService, public servico: ServicoService, private router: Router) { }
  onclickCadastroCliente(): void {
    const dialogRef = this.dialog.open(DialogCadastroClienteComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.servico.setDialogapp(dialogRef);
  }

  consultaClientes() {
    console.log('#cons_cliente_lista_emp');
    this.crud.get_api('cons_cliente_lista_emp').subscribe( data => {
      console.log(data);
      this.servico.setClientesEmpresa(data);
    } );
  }

  onclickCadastrarEntrega(item: any) {
    console.log('#onclickCadastrarEntrega');
    this.servico.setClienteSelecionado(item);
    this.router.navigate(['/cadastro-entrega']);
  }

  onclickEditarCliente(dadosCliente: any) {
    this.servico.setFormEditarCliente(dadosCliente);
    this.router.navigate(['/editar-cliente']);
  }

  onclickRemoverCliente(dadosCliente: any) {
    console.log('#onclickRemoverCliente');
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.mostrarMensagem('Cliente removido!');
        this.consultaClientes();
      }
      console.log(r);
    };
    this.crud.post_api('remove_cliente_lista_emp', accallback, dadosCliente);
  }


  ngOnInit(): void {
    this.consultaClientes();
  }

}
