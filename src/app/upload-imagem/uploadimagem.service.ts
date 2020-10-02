import { HttpClient } from '@angular/common/http';
import { CrudServicoService } from './../crud-servico.service';
import { ServicoService } from './../servico.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UploadimagemService {

 private imagem: string;
 private status: boolean;

  constructor() { }

 setImagem(url: string) { this.imagem = url; }
 getImagem() { return this.imagem; }
 limpaDadosServivoImagem() {
  this.imagem = '';
  this.status = false;
 }

 setstatusUpImagem(erro: boolean) { this.status = erro; }
 getstatusUpImagem() { return this.status; }

}
