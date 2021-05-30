import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CrudServicoService } from '../crud-servico.service';
import { DialogEditarItemComponent } from '../home/dialog-editar-item/dialog-editar-item.component';
import { HomeService } from '../home/home.service';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-itens-catalogo-empresa',
  templateUrl: './itens-catalogo-empresa.component.html',
  styleUrls: ['./itens-catalogo-empresa.component.scss']
})


export class ItensCatalogoEmpresaComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c5', 'c4'];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: any;
  dialogDelsuc: any;
  itensCategoria: Array<any>;
  categoria: any;
  form: FormGroup = this.formBuilder.group({
    categoriasSele: ['']
  });

  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, public servico: HomeService,
              private crud: CrudServicoService, public servicoapp: ServicoService, private route: Router, private servHome: HomeService) { }



  ngOnInit() {
    this.form.controls.categoriasSele.patchValue(this.servHome.getCardapioSelecionado());
    setTimeout(() => {
      this.selectC(this.servHome.getCardapioSelecionado());
    }, 700);
  }


  dialogEditarItem(item: any, categoria: any) {


    this.servico.setItem(item);

    this.dialogDelsuc = this.dialog.open(DialogEditarItemComponent, {
      width: '550px',
    });

    this.dialogDelsuc.afterClosed().subscribe(result => {

      this.dataSource.filteredData.forEach(element => {
        if (element.id === result.id) {
          element.esconder = result.esconder;
          element.esgotado = result.esgotado;
        }
      });
    });

    this.servicoapp.setDialogapp(this.dialogDelsuc);
  }

  consultaItens() {
    const accallback = () => {
      const r = this.servicoapp.getRespostaApi();
      if (r.erro === true) { this.servicoapp.mostrarMensagem(r.mensagem); } else {

      }
    };
    this.crud.post_api('cardapio&acmenu=removerCategoria', accallback, 50, true);
  }

  selectC(itemSelecionado: any) {
    this.categoria = itemSelecionado;
    this.dataSource = new MatTableDataSource<any>(itemSelecionado.itens);
    this.dataSource.paginator = this.paginator;

  }

  onClickConfigurarItem(item, categoria) {
    this.servico.setItem(item);
    this.servico.setTipoAcao(true);
    this.servico.setCategoria(categoria);
    this.route.navigate(['painel/configitem']);
  }

}
