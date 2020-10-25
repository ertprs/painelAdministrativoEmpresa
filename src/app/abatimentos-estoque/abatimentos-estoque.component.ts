import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CrudServicoService } from './../crud-servico.service';
import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servico.service';
import { AbatimentoItensComponent } from './abatimento-itens/abatimento-itens.component';

@Component({
  selector: 'app-abatimentos-estoque',
  templateUrl: './abatimentos-estoque.component.html',
  styleUrls: ['./abatimentos-estoque.component.scss']
})
export class AbatimentosEstoqueComponent implements OnInit {
  displayedColumns: string[] = ['entregador', 'data', 'produtos'];
  dataSource: any;
  form: FormGroup;
  constructor(private servapp: ServicoService, private crud: CrudServicoService, private dialog: MatDialog,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      datai: [''],
      dataf: [''],
    });

    this.f1();

  }


  f1() {
    const accallback = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) { this.servapp.mostrarMensagem(r.detalhes.mensagem); } else {

        this.dataSource = r.resultado;
      }
      console.log(r);
    };

    this.crud.post_api('batim_estoque', accallback, this.form.value);
  }

  limparFiltros() {
    this.form.reset();
  }

  verProdutos(item: any) {
    console.log(item);
    const dialogRef = this.dialog.open(AbatimentoItensComponent, {
      width: '850px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.f1();
      }
    });
  }

}
