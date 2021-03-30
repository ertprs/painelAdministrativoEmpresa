import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  formPerfil: FormGroup;
  imagemEmpresa: any;
  arquivo: any;
  arquivoCapa: any;
  imagem: any;
  statusLoadConteudo = false;
  valorSubmit: any;
  imagemEmpresaCapa: any;

  statusMudarLogo = false;
  statusMudarCapa = false;

  statusShowQr = false;
  urlqr: string;
  btsalvar = false;

  constructor(private formBuilder: FormBuilder, public servico: ServicoService, private crud: CrudServicoService,
              private http: HttpClient, public dialog: MatDialog) { }

  private ini() {
    this.formPerfil = this.formBuilder.group({
      nome: [this.servico.getDadosEmpresa().nome],
      capa: [this.servico.getDadosEmpresa().capa],
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
      descricao: [this.servico.getDadosEmpresa().descricao],
    });
    this.imagemEmpresa = this.servico.getDadosEmpresa().imagem;
    this.imagemEmpresaCapa = this.servico.getDadosEmpresa().capa;
  }
  clickshowqr() {
     
    if (this.statusShowQr) { this.statusShowQr = false; } else { this.statusShowQr = true; }
  }

  imprimirQR() {
    const divContents = document.getElementById('areaqr').innerHTML;
    const a = window.open('', '', 'height=500, width=640');
    a.document.write(divContents);
    a.document.close();
    a.print();
  }

  onclickSalvar() {
    this.btsalvar = true;
    const accallback = () => {
      console.log('callback');
      this.btsalvar = false;
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.mostrarMensagem(r.mensagem);
      }
      console.log(r);
    };
    this.crud.post_api('atualizar_perfil_empresa', accallback, this.formPerfil.value, true);
  }

  onClickImagemSelecionarCapa() {
    document.getElementById('imgInpCapa').click();
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
    this.statusMudarLogo = true;
  }

  inputFileCapa(event: any) {
    console.log(this);
    this.arquivoCapa = event.target.files[0];
    console.log(this.arquivoCapa);
    const fileRead = new FileReader();
    fileRead.onloadend = () => {
      this.imagemEmpresaCapa = fileRead.result;
    };
    fileRead.readAsDataURL(this.arquivoCapa);
    this.statusMudarCapa = true;
  }

  enviaCapaEmpresa() {
    this.statusLoadConteudo = true;

    const formData = new FormData();
    formData.append('nome_imagem_text', this.arquivoCapa.name);
    formData.append('imagem', this.arquivoCapa);
    this.http.post(this.servico.getApiAcao('upload_img_galeria'), formData).subscribe(
      (data: any) => {
        // logo que enviar a imagem pega o nome da imagem e salva o produto no banco de dados
        // this.valorSubmit.imagem = data.mensagem;
        this.formPerfil.controls.capa.setValue(data.mensagem);
        if (this.statusMudarLogo) {
          this.enviaImagem();
        } else {
          this.onclickSalvar();
        }
      },
      error => {
        this.statusLoadConteudo = false;
        alert('Não foi possível enviar a imagem do item');
      }
    );
  }

  onClickSav() {
    // So tenta envia a imagem se sofrer att
    if (this.statusMudarCapa) {
      this. enviaCapaEmpresa();
      return;
    }
    if (this.statusMudarLogo) {
      this.enviaImagem();
      return;
    }
    this.onclickSalvar();
  }

  enviaImagem() {


    this.statusLoadConteudo = true;

    const formData = new FormData();
    formData.append('nome_imagem_text', this.arquivo.name);
    formData.append('imagem', this.arquivo);
    this.http.post(this.servico.getApiAcao('upload_img_galeria'), formData).subscribe(
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

  alterarSenha(): void {
    const dialogRef = this.dialog.open(AlterarSenhaComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  ngOnInit(): void {
    this.urlqr = this.servico.urlQrcode + this.servico.getDadosEmpresa().tagnome ;

    console.log(this.urlqr);

    this.ini();
  }

}
