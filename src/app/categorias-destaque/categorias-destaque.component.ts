import { FormCategoriaDestaqueComponent } from './form-categoria-destaque/form-categoria-destaque.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-categorias-destaque',
  templateUrl: './categorias-destaque.component.html',
  styleUrls: ['./categorias-destaque.component.css']
})
export class CategoriasDestaqueComponent implements OnInit {

  displayedColumns: string[] = ['editar', 'imagem', 'nome', 'tag', 'remover'];
  itens: [];

  constructor(private crud: CrudServicoService, public servico: ServicoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('categoriasDestaque').subscribe(data => {
      console.log(data);
      this.itens = data;
    });
  }

  add() {
    const dialogRef = this.dialog.open(FormCategoriaDestaqueComponent, {
      width: '450px',
      data: { acao: 'add', item: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.f5();

      }
    });
  }

  editar(item: any) {
    const dialogRef = this.dialog.open(FormCategoriaDestaqueComponent, {
      width: '450px',
      data: { acao: 'editar', item: item }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.f5();

      }
    });
  }

  remover(item: any) {
    const callb = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro) {
        this.servico.mostrarMensagem(r.detalhes);
      } else {
        this.f5();
      }
    };

    this.crud.post_api('removerDestaque', callb, { id: item.id });
  }


}
