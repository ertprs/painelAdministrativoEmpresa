import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tela-um',
  templateUrl: './tela-um.component.html',
  styleUrls: ['./tela-um.component.css']
})
export class TelaUmComponent implements OnInit {

  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<TelaUmComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      valorPedido: [''],
      localSaida: [''],
      localChegada: [''],
      previsaoEntrega: [''],
    });
  }

  prosseguir() {
    this.dialogRef.close(this.form.value);
  }

}
