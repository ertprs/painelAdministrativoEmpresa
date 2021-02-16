import { CrudServicoService } from 'src/app/crud-servico.service';
import { UploadimagemService } from './uploadimagem.service';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-upload-imagem',
  templateUrl: './upload-imagem.component.html',
  styleUrls: ['./upload-imagem.component.css']
})
export class UploadImagemComponent implements OnInit {

  private formPerfil: FormGroup;
  private arquivo: any;
  public imagem: any;
  private status: any;
  statusLoadConteudo = false;

  @Input() nomeBotao: string;
  @Input() tabela: string;
  @Input() coluna: string;
  @Input() idItem: string;
  @Input() mensagem: string;
  @Input() preload: boolean;
  @Input() btEnviar: boolean;
  @Output() statusUPload = new EventEmitter();

  constructor(public servico: ServicoService, private http: HttpClient, private upimg: UploadimagemService,
              private crud: CrudServicoService) { }

  ngOnInit(): void {
  }

  onClickImagemSelecionarCapa() {
    document.getElementById('imgInp').click();
  }

  inputFile(event: any) {
    this.arquivo = event.target.files[0];
    console.log(this.arquivo);
    const fileRead = new FileReader();
    fileRead.onloadend = () => {
      this.imagem = fileRead.result;
    };
    fileRead.readAsDataURL(this.arquivo);
    this.status = true;
  }

  enviarImagemServidor() {

    if (this.statusLoadConteudo) { return; }
    this.statusLoadConteudo = true;

    const formData = new FormData();
    formData.append('nome_imagem_text', this.arquivo.name);
    formData.append('imagem', this.arquivo);
    this.http.post(this.servico.getApiAcao('upload_img_galeria'), formData).subscribe(
      (data: any) => {
        // logo que enviar a imagem pega o nome da imagem e salva o produto no banco de dados
        // this.valorSubmit.imagem = data.mensagem;
        this.servico.mostrarMensagem('Imagem enviada');
        console.log(data);
        this.statusLoadConteudo = false;
        this.upimg.setImagem(data.mensagem);
        this.upimg.setstatusUpImagem(data.erro);
        this.anexarImagem();
        this.statusUPload.emit(data);
      },
      error => {
        this.statusLoadConteudo = false;
        this.servico.mostrarMensagem('Não foi possível enviar a imagem do item');
      }
    );
  }

  anexarImagem() {
    if (!this.tabela || !this.idItem) { return console.warn('Nome da tabela ou o id item nao foi informado'); }
    const callb = () => {
      if (this.mensagem) {
      this.servico.mostrarMensagem(this.mensagem);
      }
    };
    this.crud.post_api('anexar_imagem', callb, { 
      id: this.idItem,
      imagem: this.upimg.getImagem(),
      tabela: this.tabela,
      coluna: this.coluna  });
  }

}
