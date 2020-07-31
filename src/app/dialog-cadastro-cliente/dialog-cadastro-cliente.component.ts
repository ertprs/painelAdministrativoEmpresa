import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dialog-cadastro-cliente',
  templateUrl: './dialog-cadastro-cliente.component.html',
  styleUrls: ['./dialog-cadastro-cliente.component.css']
})
export class DialogCadastroClienteComponent implements OnInit {

  formCadastroCliente: FormGroup;


  constructor(private crud: CrudServicoService, public servico: ServicoService, private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ini();
  }

  onclickCadastroCliente() {

    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.getClientesEmpresa().push(this.formCadastroCliente.value);
        this.servico.getDialogapp().close();
        this.servico.mostrarMensagem('Cliente adicionado');
      }
      console.log(r);
    };
    this.crud.post_api('add_cliente_lista_emp', accallback, this.formCadastroCliente.value);
  }

  private ini() {
    this.formCadastroCliente = this.formBuilder.group({
      id: [null],
      nome: [null],
      telefone: [null],
      bairro: [null],
      rua: [null],
      numero: [null],
      complemento: [null],
      cidade: [null],
      uf: [null],
    });
  }

}
