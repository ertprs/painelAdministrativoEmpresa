import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {

  formEditarCliente: FormGroup;


  constructor(public servico: ServicoService, private formBuilder: FormBuilder, private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.ini();
  }

  private ini() {
    console.log(this.servico.getFormEditarCliente());
    this.formEditarCliente = this.formBuilder.group({
      id: [this.servico.getFormEditarCliente().id],
      nome: [this.servico.getFormEditarCliente().nome],
      telefone: [this.servico.getFormEditarCliente().telefone],
      bairro: [this.servico.getFormEditarCliente().bairro],
      rua: [this.servico.getFormEditarCliente().rua],
      numero: [this.servico.getFormEditarCliente().numero],
      complemento: [this.servico.getFormEditarCliente().complemento],
      cidade: [this.servico.getFormEditarCliente().cidade],
      uf: [this.servico.getFormEditarCliente().uf],
    });
  }

  onclickSalvarCliente() {
    console.log('#onclickSalvarCliente');
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.mostrarMensagem(r.mensagem);
      }
      console.log(r);
    };
    this.crud.post_api('att_cliente_lista_emp', accallback, this.formEditarCliente.value);
  }

}
