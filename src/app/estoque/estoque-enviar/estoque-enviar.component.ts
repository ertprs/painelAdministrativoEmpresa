import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-estoque-enviar',
  templateUrl: './estoque-enviar.component.html',
  styleUrls: ['./estoque-enviar.component.css']
})
export class EstoqueEnviarComponent implements OnInit {

  form: FormGroup;
  iddes: any;
  motoboys: any;

  constructor(private crud: CrudServicoService, private servico: ServicoService, public dialogRef: MatDialogRef<EstoqueEnviarComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { tipo: string, nomeDialog: string, item: any }, private fb: FormBuilder) { }

         ngOnInit(): void {
           this.consultaMotoboys();
           console.log(this.data);
           this.form = this.fb.group({
                  id: [this.data.item.id, Validators.required],
                  propriedade: [this.motoboys, Validators.required],
                  quantidade: [null, Validators.required],
          });

  }

  consultaMotoboys() {
    this.crud.get_api('consulta_ent_lista_emp').subscribe(data => {
      console.log(data);
      this.motoboys = data.resultado;
   });
  }

}
