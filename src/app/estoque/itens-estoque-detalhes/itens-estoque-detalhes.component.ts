import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { PedidosService } from 'src/app/delivery/pedidos/pedidos.service';
import { ServicoService } from 'src/app/servico.service';
import { SelecionarMotoboyComponent } from './selecionar-motoboy/selecionar-motoboy.component';

@Component({
  selector: 'app-itens-estoque-detalhes',
  templateUrl: './itens-estoque-detalhes.component.html',
  styleUrls: ['./itens-estoque-detalhes.component.css']
})
export class ItensEstoqueDetalhesComponent implements OnInit {
  columnsToDisplay = ['c0', 'c1', 'c3', 'c4', 'c5', 'c6', 'c7'];
  dataSource = [];
  motoboys = [];
  motoboySelecionado: any;
 form: FormGroup;
 filtroSelcionado: string;
  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
   this.form = this.fb.group({
     nome: [''],
     dataInicio: [false],
     dataFim: [false],
   });
   this.consultaMotoboys();
  }


estoque() {
    this.crud.get_api('itens_estoque_det').subscribe(data => {
        this.dataSource = data;
    });
}

consultaMotoboys() {
  this.crud.get_api('consulta_ent_lista_emp').subscribe(data => {
      this.motoboys = data.resultado;
  });
}

onClickFiltroData() {
  console.log(this.form.value);

  if (this.filtroSelcionado === 'loja') {

    this.crud.get_api
    // tslint:disable-next-line: max-line-length
    ('itens_estoque_det&filtro=periodo&datai=' + this.form.value.dataInicio + '&dataf=' +  this.form.value.dataFim ).subscribe(data => {
      this.dataSource = data;
  });

  } else {
    this.crud.get_api
    // tslint:disable-next-line: max-line-length
    ('itens_estoque_det_motoboy&filtro=periodo&datai=' + this.form.value.dataInicio + '&dataf=' +  this.form.value.dataFim `&idmotoboy=${this.motoboySelecionado.id}`).subscribe(data => {
      this.dataSource = data;
  });
  }

}

onClickFiltroNome() {
  console.log(this.form.value);

  if (this.filtroSelcionado === 'loja') {


    this.crud.get_api
    // tslint:disable-next-line: max-line-length
    ('itens_estoque_det&filtro=nome&datai=' + this.form.value.dataInicio + '&dataf=' +  this.form.value.dataFim + '&nome=' +  this.form.value.nome).subscribe(data => {
      this.dataSource = data;
  });

  } else {
    this.crud.get_api
    // tslint:disable-next-line: max-line-length
    ('itens_estoque_det_motoboy&filtro=nome&datai=' + this.form.value.dataInicio + '&dataf=' +  this.form.value.dataFim + '&nome=' +  this.form.value.nome + `&idmotoboy=${this.motoboySelecionado.id}`).subscribe(data => {
      this.dataSource = data;
  });
  }

}

estoqueMotoboy(motoboy) {
  this.crud.get_api('itens_estoque_det_motoboy&filtro=false&idmotoboy=' + motoboy).subscribe(data => {
      this.dataSource = data;
  });
}

selectChange(event) {
  console.log(event);
  this.filtroSelcionado = event;
  if (event === 'loja') { this.estoque(); } else { this.servapp.mostrarMensagem('Selecione o motoboy para mostrar o estoque dele'); }
}


selecionarMotoboy(): void {
  if (!this.motoboys) { this.servapp.mostrarMensagem('Não há motoboys cadastrados no sistema!'); return; }
  const dialogRef = this.dialog.open(SelecionarMotoboyComponent, {
    width: '350px',
    data: {lista: this.motoboys}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {

       console.log(result);
       this.motoboySelecionado = result;
       this.estoqueMotoboy(result.id);

    }
  });
}

}
