import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  formPerfil: FormGroup;
  public imagemEmpresa: string;

  constructor(private formBuilder: FormBuilder, private servico: ServicoService, private crud: CrudServicoService) { }

  private ini() {
    console.log( this.servico.getDadosEmpresa() );
    this.formPerfil = this.formBuilder.group({
      nome: [this.servico.getDadosEmpresa().nome],
      telefone: [this.servico.getDadosEmpresa().telefone],
      email: [this.servico.getDadosEmpresa().email],
      senha: [this.servico.getDadosEmpresa().senha],
      rua: [this.servico.getDadosEmpresa().rua],
      bairro: [this.servico.getDadosEmpresa().bairro],
      numero: [this.servico.getDadosEmpresa().numero],
      cidade: [this.servico.getDadosEmpresa().cidade],
      cep: [this.servico.getDadosEmpresa().cep],
      cnpj: [this.servico.getDadosEmpresa().cnpj],
      politica: [this.servico.getDadosEmpresa().politica],
    });
    this.imagemEmpresa = this.servico.getDadosEmpresa().imagem;
  }

  onclickSalvar() {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.mostrarMensagem(r.mensagem);
      }
      console.log(r);
    };
    this.crud.post_api('atualizar_perfil_empresa', accallback, this.formPerfil.value);
  }

  ngOnInit(): void {
    this.ini();
  }

}
