import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { UploadimagemService } from 'src/app/upload-imagem/uploadimagem.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-categorias-empresa',
  templateUrl: './form-categorias-empresa.component.html',
  styleUrls: ['./form-categorias-empresa.component.css']
})
export class FormCategoriasEmpresaComponent implements OnInit {

  form: FormGroup;
  statusBt = false;

  constructor(private crud: CrudServicoService, public servico: ServicoService, private fb: FormBuilder,
    public upimgserv: UploadimagemService, @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormCategoriasEmpresaComponent>) { }

  ngOnInit(): void {
    if (this.data.acao === 'add') {
      this.form = this.fb.group({
        nome: [''],
        status: [''],
        imagem: [''],
        tag: [''],
        ordem: [''],
      });
    } else {
      console.log(this.data);
      this.form = this.fb.group({
        id: [this.data.item.id],
        nome: [this.data.item.nome],
        status: [this.data.item.status],
        imagem: [this.data.item.imagem],
        tag: [this.data.item.tag],
        ordem: [this.data.item.ordem],
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
      this.crud.post_api('addCemp', callb, this.form.value);
    } else {
      this.crud.post_api('editarCemp', callb, this.form.value);
    }
  }

}
