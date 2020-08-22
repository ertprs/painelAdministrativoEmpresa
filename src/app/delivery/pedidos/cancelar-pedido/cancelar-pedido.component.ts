import { PedidosService } from './../pedidos.service';
import { ServicoService } from 'src/app/servico.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/entregas/entregas.component';

@Component({
  selector: 'app-cancelar-pedido',
  templateUrl: './cancelar-pedido.component.html',
  styleUrls: ['./cancelar-pedido.component.css']
})
export class CancelarPedidoComponent implements OnInit {

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private servapp: ServicoService,
              public dialogRef: MatDialogRef<CancelarPedidoComponent>,@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private servpedidos: PedidosService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      idEmpresa: [this.servapp.getDadosEmpresa().id],
      idPedido: [this.servpedidos.getPedido().id],
      motivo: ['', Validators.required],
      status: [7],
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
