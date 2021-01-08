import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudServicoService } from '../crud-servico.service';
import { CancelarPedidoComponent } from '../delivery/pedidos/cancelar-pedido/cancelar-pedido.component';
import { PedidosService } from '../delivery/pedidos/pedidos.service';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-add-observacao-pedido',
  templateUrl: './add-observacao-pedido.component.html',
  styleUrls: ['./add-observacao-pedido.component.css']
})
export class AddObservacaoPedidoComponent implements OnInit {

  form: FormGroup;
  statusBT = false;

  constructor(private formBuilder: FormBuilder, private servapp: ServicoService,
              public dialogRef: MatDialogRef<AddObservacaoPedidoComponent>,@Inject(MAT_DIALOG_DATA) public data: any,
              private servpedidos: PedidosService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    console.log(this.data);

    this.form = this.formBuilder.group({
      idEmpresa: [this.servapp.getDadosEmpresa().id],
      idPedido: [this.servpedidos.getPedido().id],
      observacao: ['', Validators.required],
    });

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClickconfirmar() {
    this.statusBT = true;
    const callb = () => {
       const r = this.servapp.getRespostaApi();
       if (r.erro) {
         this.servapp.mostrarMensagem(r.detalhes);
         this.statusBT = false;
       } else {
        this.servapp.mostrarMensagem(r.detalhes);
        this.dialogRef.close();
       }
    };

    this.crud.post_api('addObsPedido', callb, this.form.value , true);
    
  }

}