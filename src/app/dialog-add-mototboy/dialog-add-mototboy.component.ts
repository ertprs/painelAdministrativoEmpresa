import { UploadimagemService } from './../upload-imagem/uploadimagem.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ServicoService } from '../servico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudServicoService } from '../crud-servico.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { truncate } from 'lodash';

@Component({
  selector: 'app-dialog-add-mototboy',
  templateUrl: './dialog-add-mototboy.component.html',
  styleUrls: ['./dialog-add-mototboy.component.css']
})
export class DialogAddMototboyComponent implements OnInit {

  form: FormGroup;
  acao: any;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogAddMototboyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private crud: CrudServicoService, private servico: ServicoService,
              public upimg: UploadimagemService) { }

  ngOnInit(): void {
    console.log(this.data);
    if (this.data.acao === 'add') {
      this.acao = 'cadatrar_motoboy';
      this.form = this.fb.group({
        nome: [null, Validators.required],
        imagem: [this.upimg.getImagem()],
        email: [null, Validators.required],
        telefone: [null, Validators.required],
        senha: [null, Validators.required],
        cpf: [null, Validators.required],
        cnh: [null, Validators.required],
        placa: [null, Validators.required],
        rua: [null, Validators.required],
        numero: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        cep: [null, Validators.required],
        rg: [null, Validators.required],
      });

    } else {
      this.acao = 'editarPerfilEntregador';
      this.form = this.fb.group({
        id: [this.data.usuario.id, Validators.required],
        imagem: [this.data.usuario.imagem],
        nome: [this.data.usuario.nome, Validators.required],
        email: [this.data.usuario.email, Validators.required],
        telefone: [this.data.usuario.telefone, Validators.required],
        senha: [this.data.usuario.senha, Validators.required],
        cpf: [this.data.usuario.cpf, Validators.required],
        cnh: [this.data.usuario.cnh, Validators.required],
        placa: [this.data.usuario.placa, Validators.required],
        rua: [this.data.usuario.rua, Validators.required],
        numero: [this.data.usuario.numero, Validators.required],
        bairro: [this.data.usuario.bairro, Validators.required],
        cidade: [this.data.usuario.cidade, Validators.required],
        cep: [this.data.usuario.cep, Validators.required],
        rg: [this.data.usuario.rg, Validators.required],
      });

    }



  }

  salvar() {
    if (this.upimg.getImagem()) {
        this.form.value.imagem = this.upimg.getImagem();
    }

    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.dialogRef.close(true);
      }
      console.log(r);
    };
    this.crud.post_api(this.acao, accallback, this.form.value);
  }

}

