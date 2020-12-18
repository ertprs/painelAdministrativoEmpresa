import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { UploadimagemService } from 'src/app/upload-imagem/uploadimagem.service';

@Component({
  selector: 'app-form-categoria-destaque',
  templateUrl: './form-categoria-destaque.component.html',
  styleUrls: ['./form-categoria-destaque.component.css']
})
export class FormCategoriaDestaqueComponent implements OnInit {

  
  form: FormGroup;
  statusBt = false;

  constructor(private crud: CrudServicoService, public servico: ServicoService, private fb: FormBuilder,
    public upimgserv: UploadimagemService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormCategoriaDestaqueComponent>) { }

  ngOnInit(): void {
    if (this.data.acao === 'add') {
      this.form = this.fb.group({
        titulo: [''],
        status: [''],
        imagem: [''],
        texto: [''],
      });
    } else {
      console.log(this.data);
      this.form = this.fb.group({
        id: [this.data.item.id],
        titulo: [this.data.item.titulo],
        status: [this.data.item.status],
        imagem: [this.data.item.imagem],
        texto: [this.data.item.texto],
      });
    }
  }

  confirmar() {
    if (this.upimgserv.getImagem()) {
      this.form.controls.imagem.setValue(this.upimgserv.getImagem());
    }
    this.statusBt = true;
    const callb = (data) => {
      const r = this.servico.getRespostaApi();
      if (r.erro) {
        this.statusBt = false;
        this.servico.mostrarMensagem(r.detalhes);
      } else {
        this.dialogRef.close(true);
      }
    };

    if (this.data.acao === 'add') {
      this.crud.post_api('addDestaque', callb, this.form.value);
    } else {
      this.crud.post_api('attCategoriasDestaque', callb, this.form.value);
    }
  }

}

