import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogDinamComponent } from '../dialog-dinam/dialog-dinam.component';
import { FormBairroComponent } from './form-bairro/form-bairro.component';

@Component({
  selector: 'app-bairros-sistema',
  templateUrl: './bairros-sistema.component.html',
  styleUrls: ['./bairros-sistema.component.css']
})
export class BairrosSistemaComponent implements OnInit {

  displayedColumns: string[] = ['c0', 'c1', 'c2', 'c3', 'c4'];
  itens = [];
  bairros: [];
  itemSelecionado: any;

  constructor(private crud: CrudServicoService, private servico: ServicoService, private dialog: MatDialog,
              private route: Router) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('bairros_sistema').subscribe(data => {
       console.log(data);
       this.itens = data;
       console.log(data);
    });
}

select(item) {
  console.log(item);
  this.itemSelecionado = item;
  this.bairros = item.bairros;
}

add(): void {
  const dialogRef = this.dialog.open(FormBairroComponent, {
    width: '450px',
    data: {tipo: 'add', item: this.itemSelecionado}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
    this.f1(result) ;
    }
  });
}

onClickEditar(i): void {
  const dialogRef = this.dialog.open(FormBairroComponent, {
    width: '450px',
    data: {tipo: 'editar', nomeDialog: 'form_bairro', item: i}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    console.log(result);
    if (result) {
    this.editar(result) ;
    }
  });
}

editar(form) {
  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      // this.itens = r.resultado;
      this.route.navigate(['/painel']);
    }
    console.log(r);
  };
  this.crud.post_api('att_bairro_sistema', accallback, form);
}

f1(form) {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      // this.itens = r.resultado;
      // this.itemSelecionado;
      this.route.navigate(['/painel']);
    }
    console.log(r);
  };
  console.log(this.itemSelecionado);
  form.cidade_id = this.itemSelecionado.id;
  this.crud.post_api('add_bairro_sistema', accallback, form);
}

removerItem(item) {

  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      this.f5();
    }
    console.log(r);
  };
  this.crud.post_api('rem_bairro_sistema', accallback, item);

}

getLocation(item) {
  const accallback = () => {
    console.log('callback');
    const r = this.servico.getRespostaApi();
    if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
      this.servico.mostrarMensagem(r.detalhes);
      console.log(this.itemSelecionado);
      let cont = 0;
      this.itemSelecionado.bairros.forEach(element => {
          console.log(element);
          if (element.id === item.id) {
          this.itemSelecionado.bairros[cont].lat = r.resultado.itens.lat;
          this.itemSelecionado.bairros[cont].lng = r.resultado.itens.lng;
      }
          cont++;

      });

    }
  };
  this.crud.post_api('get_coord_bairro', accallback, {cidade: this.itemSelecionado.nome, bairroid: item.id, bairro: item.nome});
}


}
