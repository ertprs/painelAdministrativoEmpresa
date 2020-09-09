import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  formPerfil: FormGroup;
  imagemEmpresa: any;
  arquivo: any;
  imagem: any;
  statusLoadConteudo = false;
  valorSubmit: any;

  constructor(private formBuilder: FormBuilder, private servico: ServicoService, private crud: CrudServicoService,
              private http: HttpClient, private servapp: ServicoService) { }

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
      imagem: [this.servico.getDadosEmpresa().imagem],
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

  onClickImagemSelecionar() {
    document.getElementById('imgInp').click();
  }

  inputFile(event: any) {
    console.log(this);
    this.arquivo = event.target.files[0];
    console.log(this.arquivo);
    const fileRead = new FileReader();
    fileRead.onloadend = () => {
      this.imagemEmpresa = fileRead.result;
    };
    fileRead.readAsDataURL(this.arquivo);
  }


  enviaImagem() {


    this.statusLoadConteudo = true;

    const formData = new FormData();
    formData.append('nome_imagem_text', this.arquivo.name);
    formData.append('imagem', this.arquivo);
    this.http.post(this.servapp.getApiAcao('upload_img_galeria'), formData).subscribe(
      (data: any) => {
        // logo que enviar a imagem pega o nome da imagem e salva o produto no banco de dados
        // this.valorSubmit.imagem = data.mensagem;
        this.formPerfil.controls.imagem.setValue(data.mensagem);
        this.onclickSalvar();
      },
      error => {
        this.statusLoadConteudo = false;
        alert('Não foi possível enviar a imagem do item');
      }
    );

  }



  ngOnInit(): void {
    this.ini();
  }

}
