import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-cadastro-empresa',
  templateUrl: './cadastro-empresa.component.html',
  styleUrls: ['./cadastro-empresa.component.css']
})
export class CadastroEmpresaComponent implements OnInit {
  listaCidades: any;
  listaCidadesEntrega: any;
  cidadeClienteSelecionada: any;
  formCadastro: FormGroup;
  formcadastroStatus: any;
  btCstatus: boolean;

  // tslint:disable-next-line: max-line-length
  constructor(private crud: CrudServicoService, private formBuilder: FormBuilder, public servico: ServicoService, private router: Router) { }

  consultaCidades() {
    console.log('#consultaCidades');
    this.crud.get_api('cidades_server').subscribe(data => {
      console.log(data);
      if (data.lista === null) { } else {
        this.listaCidades = data.lista_cidades;
        this.listaCidadesEntrega = data.lista_cidades_entrega;
      }
    });
  }

  selectionChangeCidade(item: any) {
    console.log('#selectionChangeCidade');
    console.log(item);

    this.cidadeClienteSelecionada = item;


    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.setListaBairros(r);
      }
      console.log(r);
    };
    this.crud.post_api('bairros', accallback, this.cidadeClienteSelecionada);

  }

  iniciaForm() {
    this.formCadastro = this.formBuilder.group({
      email: [null, Validators.required],
      telefone: [null, Validators.required],
      cep: [null, Validators.required],
      senha: [null, Validators.required],
      nome: [null, Validators.required],
      cnpj: [null, Validators.required],
      rua: [null, Validators.required],
      numero: [null, Validators.required],
      emailconfirmar: [null, Validators.required],
      senhaconfirmar: [null, Validators.required],
      bairro: [null, Validators.required],
      cidade: [null, Validators.required],
      cidade_id: [null, Validators.required],
    });
  }

  onclickCadastrar() {
    console.log(this.formCadastro.value);
/*
    try {
      this.formCadastro.value.cidade = this.cidadeClienteSelecionada.nome;
      this.formCadastro.value.cidade_id = this.cidadeClienteSelecionada.id;
    } catch (e) { this.servico.mostrarMensagem('Selecione a cidade de sua empresa'); return; }
    try {
      this.formCadastro.value.bairro = bairro.nome;
    } catch (e) { this.servico.mostrarMensagem('Selecione o bairro de sua empresa'); return; }
    */
    if (this.formCadastro.value.email !== this.formCadastro.value.emailconfirmar) {
      this.servico.mostrarMensagem('O email de confirmação não confere com o email inserido em DADOS PARA ACESSO');
      return;
    }
    if (this.formCadastro.value.senha !== this.formCadastro.value.senhaconfirmar) {
      this.servico.mostrarMensagem('A senha de confirmação não confere com o senha inserida em DADOS PARA ACESSO');
      return;
    }

    console.log(this.formCadastro.value);
    this.btCstatus = true;
    const loginres = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.mensagem);
        this.btCstatus = false;
        this.router.navigate(['/admin/lojas']);
      } else {
        this.servico.mostrarMensagem(r.mensagem);
        this.formcadastroStatus = true;
      }
    };
    this.crud.post_api('cadastro_empresa', loginres, this.formCadastro.value );
  }

  cadatroFeito() {
    this.formcadastroStatus = true;
  }

  ngOnInit(): void {
    console.log('#CadastroEmpresaComponent');
    this.consultaCidades();
    this.iniciaForm();
    this.formcadastroStatus = false; // => false
    this.btCstatus = false;
  }

}
