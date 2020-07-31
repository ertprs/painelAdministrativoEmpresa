import { HomeService } from './../home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';

@Component({
  selector: 'app-dialog-add-item',
  templateUrl: './dialog-add-item.component.html',
  styleUrls: ['./dialog-add-item.component.css']
})
export class DialogAddItemComponent implements OnInit {

  formItem: any;
  statusbt = false;

  constructor(private formBuilder: FormBuilder, public servicoCardapio: HomeService, public serivoApp: ServicoService,
              private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.iniF();
  }

   private iniF() {
    this.formItem = this.formBuilder.group({
      categoria_id: [this.servicoCardapio.getCategoria().id],
      categoria_nome: [this.servicoCardapio.getCategoria().nome],
      nome: [null],
      preco: [null],
      descricao: [null],
      esconder: [false],
      esgotado: [false],
    });
  }

  onclickAddItem() {
    console.log(this.formItem.value);
    this.statusbt = true;
    const accallback = () => {
      const r = this.serivoApp.getRespostaApi();
      this.statusbt = false;
      if (r.erro === true) { this.serivoApp.mostrarMensagem(r.detalhes); } else {
        this.serivoApp.mostrarMensagem(r.mensagem);
        this.serivoApp.getDialogapp().close();
        this.servicoCardapio.consultaCardapio();
      }
      this.serivoApp.mostrarMensagem(r.mensagem);
    };
    this.crud.post_api('cardapio&acmenu=additem', accallback, this.formItem.value);
  }

}
