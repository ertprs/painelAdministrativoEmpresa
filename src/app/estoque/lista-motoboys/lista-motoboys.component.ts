import { EstoqueService } from './../estoque.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { PedidosService } from 'src/app/delivery/pedidos/pedidos.service';
import { DialogDinamComponent } from 'src/app/dialog-dinam/dialog-dinam.component';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-lista-motoboys',
  templateUrl: './lista-motoboys.component.html',
  styleUrls: ['./lista-motoboys.component.css']
})
export class ListaMotoboysComponent implements OnInit {

 
  columnsToDisplay = ['motoboy'];
  dataSource = [];
  expandedElement: any | null;
  dialogDelsuc: any;
  statusLoadEntregas: boolean;
  form: FormGroup;
  sst = false;

  constructor(private dialog: MatDialog, public servpedidos: PedidosService, private formBuilder: FormBuilder,
              public servapp: ServicoService, private crud: CrudServicoService, private router: Router,
              public servestm: EstoqueService) { }

  ngOnInit(): void {
   this.estoque();
  }
  estoque() {
    this.crud.get_api('consulta_ent_lista_emp').subscribe(data => {
        this.dataSource = data.resultado;
    });
}


add(): void {
  const dialogRef = this.dialog.open(DialogDinamComponent, {
    width: '450px',
    data: {tipo: 'add', nomeDialog: 'form_estoque'}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
    this.f1(result) ;
    }
  });
}

enviar(element): void {
  element.id = element.id_estoque;

  const dialogRef = this.dialog.open(DialogDinamComponent, {
    width: '450px',
    data: {tipo: 'editar', nomeDialog: 'form_estoque_enviar', item: element}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
    this.f1(result) ;
    }
  });
}

retirar(element): void {
  element.id = element.id;
  const dialogRef = this.dialog.open(DialogDinamComponent, {
    width: '450px',
    data: {tipo: 'editar', nomeDialog: 'form_estoque_enviar', item: element}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
   
      const accallback = () => {
        console.log('callback');
        const r = this.servapp.getRespostaApi();
        if (r.erro === true) { this.servapp.mostrarMensagem(r.detalhes.mensagem); } else {
          this.servapp.mostrarMensagem(r.detalhes.mensagem);
          this.dataSource = r.detalhes.itens;
        }
        console.log(r);
      };
       
      this.crud.post_api('subEstoque', accallback, result);


    }
  });
}



f1(form) {

  const accallback = () => {
    console.log('callback');
    const r = this.servapp.getRespostaApi();
    if (r.erro === true) { this.servapp.mostrarMensagem(r.detalhes.mensagem); } else {
      this.servapp.mostrarMensagem(r.detalhes.mensagem);
      this.dataSource = r.detalhes.itens;
    }
    console.log(r);
  };
  this.crud.post_api('enviaEstoque', accallback, form);
}

removerEstoqueMotoboy(element) {
  const accallback = () => {
    console.log('callback');
    const r = this.servapp.getRespostaApi();
    if (r.erro === true) { this.servapp.mostrarMensagem(r.detalhes.mensagem); } else {
      this.servapp.mostrarMensagem(r.detalhes.mensagem);
      this.dataSource = r.detalhes.itens;
    }
    console.log(r);
  };
  this.crud.post_api('remover_estoque_motoboy', accallback, {id: element.id});

}

estoqueMotoboy(element) {
  this.servestm.setMotoboySelecionado(element);
  this.crud.get_api('estoque_motoboy&id=' + element.id).subscribe(data => {
      this.servestm.setListaMotoboys( data );
  });
}


}