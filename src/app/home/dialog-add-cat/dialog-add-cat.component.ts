import { HomeService } from './../home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';

@Component({
  selector: 'app-dialog-add-cat',
  templateUrl: './dialog-add-cat.component.html',
  styleUrls: ['./dialog-add-cat.component.css']
})
export class DialogAddCatComponent implements OnInit {

  formCategoria: any;
  statusbt = false;

  constructor(private formBuilder: FormBuilder, public servico: ServicoService, private crud: CrudServicoService,
              private servCard: HomeService) { }

  ngOnInit(): void {
    this.iniF();
  }

  private iniF() {
    this.formCategoria = this.formBuilder.group({
      nome: [null],
    });
  }

  onclickAddCat() {
    this.statusbt = true;
    const accallback = () => {
      const r = this.servico.getRespostaApi();
      this.statusbt = false;
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.mensagem);
        this.servico.getDialogapp().close();
        this.servCard.consultaCardapio();
      }
      this.servico.mostrarMensagem(r.mensagem);
    };
    this.crud.post_api('cardapio&acmenu=addcat', accallback, this.formCategoria.value);
  }

  consultaCardapio() {
    console.log('#consultaMotoboys');
    this.crud.get_api('cardapio&acmenu=listar').subscribe(data => {
      console.log(data);
    });
  }

}
