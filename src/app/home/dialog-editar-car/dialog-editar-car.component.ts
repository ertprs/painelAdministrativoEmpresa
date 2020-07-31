import { HomeService } from './../home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';

@Component({
  selector: 'app-dialog-editar-car',
  templateUrl: './dialog-editar-car.component.html',
  styleUrls: ['./dialog-editar-car.component.css']
})
export class DialogEditarCarComponent implements OnInit {

  formCategoria: any;
  statusbt = false;

  constructor(private formBuilder: FormBuilder, public servicoMenu: HomeService, public servicoapp: ServicoService,
              private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.iniF();
  }

  private iniF() {
    this.formCategoria = this.formBuilder.group({
      nome: [this.servicoMenu.getCategoria().nome],
      id: [this.servicoMenu.getCategoria().id],
      esconder: [this.servicoMenu.getCategoria().esconder],
      esgotado: [this.servicoMenu.getCategoria().esgotado],
    });
  }

  onclickSalvar() {
    this.statusbt = true;
    const accallback = () => {
      const r = this.servicoapp.getRespostaApi();
      this.statusbt = false;
      if (r.erro === true) { this.servicoapp.mostrarMensagem(r.detalhes); } else {
        this.servicoapp.mostrarMensagem(r.mensagem);
        this.servicoMenu.consultaCardapio();
        this.servicoapp.getDialogapp().close();
      }
    };
    this.crud.post_api('cardapio&acmenu=editarCat', accallback, this.formCategoria.value);
  }


}
