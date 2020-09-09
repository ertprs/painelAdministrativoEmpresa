import { Component, OnInit, Inject } from '@angular/core';
import { ServicoService } from '../servico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudServicoService } from '../crud-servico.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-mototboy',
  templateUrl: './dialog-add-mototboy.component.html',
  styleUrls: ['./dialog-add-mototboy.component.css']
})
export class DialogAddMototboyComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogAddMototboyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    if (this.data.acao === 'add') {
      this.form = this.fb.group({
        nome: [null, Validators.required],
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
      this.form = this.fb.group({
        id: [this.data.usuario.id, Validators.required],
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
}

