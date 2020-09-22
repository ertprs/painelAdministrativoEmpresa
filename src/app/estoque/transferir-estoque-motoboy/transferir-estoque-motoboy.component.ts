import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { EstoqueEnviarComponent } from '../estoque-enviar/estoque-enviar.component';

@Component({
  selector: 'app-transferir-estoque-motoboy',
  templateUrl: './transferir-estoque-motoboy.component.html',
  styleUrls: ['./transferir-estoque-motoboy.component.css']
})
export class TransferirEstoqueMotoboyComponent implements OnInit {

  form: FormGroup;
  motoboys: any;

  constructor(private crud: CrudServicoService, private fb: FormBuilder, public dialogRef: MatDialogRef<TransferirEstoqueMotoboyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit(): void {

    console.log(this.data);

    this.form = this.fb.group({
      quantidade: [null],
      propriedade: [null], // Id do motoboy que vai receber
      idEstoqueMotoboy: [this.data.item.id], // Id do estoque motoboy tabela:estoque_motoboy
      idItemEstoque: [this.data.item.id_item_catalogo],
      idEstoque: [this.data.item.id_estoque],
});

    this.consultaMotoboys();

  }

  consultaMotoboys() {
    this.crud.get_api('consulta_ent_lista_emp').subscribe(data => {
      console.log(data);
      this.motoboys = data.resultado;
   });
  }

}
