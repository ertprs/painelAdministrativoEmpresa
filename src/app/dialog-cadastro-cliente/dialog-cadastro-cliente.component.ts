import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormularioUsuarioComponent } from '../usuarios/formulario-usuario/formulario-usuario.component';

@Component({
  selector: 'app-dialog-cadastro-cliente',
  templateUrl: './dialog-cadastro-cliente.component.html',
  styleUrls: ['./dialog-cadastro-cliente.component.css']
})
export class DialogCadastroClienteComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogCadastroClienteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    if (this.data.acao === 'add') {
      this.form = this.fb.group({
        tipo: [null, Validators.required],
        nome: [null, Validators.required],
        telefone: [null, Validators.required],
        rua: [null, Validators.required],
        numero: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        uf: [null, Validators.required],
        data_aniversario: [null, Validators.required],
        complemento: [null, Validators.required],
      });

    } else {
      this.form = this.fb.group({
        id: [this.data.usuario.id],
        tipo: [this.data.usuario.tipo],
        nome: [this.data.usuario.nome],
        telefone: [this.data.usuario.telefone],
        rua: [this.data.usuario.rua],
        numero: [this.data.usuario.numero],
        bairro: [this.data.usuario.bairro],
        cidade: [this.data.usuario.cidade],
        uf: [this.data.usuario.uf],
        data_aniversario: [this.data.usuario.data_aniversario],
        complemento: [this.data.usuario.complemento],
      });

    }
  }





}
