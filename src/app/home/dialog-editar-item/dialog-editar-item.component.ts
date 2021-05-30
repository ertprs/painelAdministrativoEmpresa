import { HomeService } from './../home.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';

@Component({
  selector: 'app-dialog-editar-item',
  templateUrl: './dialog-editar-item.component.html',
  styleUrls: ['./dialog-editar-item.component.css']
})
export class DialogEditarItemComponent implements OnInit {

  public formItem: any;
  statusbt = false;

  constructor(private formBuilder: FormBuilder, public servicoCard: HomeService, public servicoApp: ServicoService,
              private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.iniF();
  }

  private iniF() {
    this.formItem = this.formBuilder.group({
      categoria_id: [this.servicoCard.getItem().id_categoria],
      categoria_nome: [this.servicoCard.getItem().categoria_nome],
      id: [this.servicoCard.getItem().id],
      nome: [this.servicoCard.getItem().nome],
      preco: [this.servicoCard.getItem().preco],
      descricao: [this.servicoCard.getItem().descricao],
      esconder: [this.servicoCard.getItem().esconder],
      esgotado: [this.servicoCard.getItem().esgotado],
    });



  }

  onclickEditartem() {
    this.statusbt = true;
    const accallback = () => {
      const r = this.servicoApp.getRespostaApi();
      this.statusbt = false;
      if (r.erro === true) { this.servicoApp.mostrarMensagem(r.detalhes); } else {
        this.servicoApp.mostrarMensagem(r.mensagem);
        this.servicoApp.getDialogapp().close(this.formItem.value);
        this.servicoCard.consultaCardapio();
      }
      this.servicoApp.mostrarMensagem(r.mensagem);
    };
    this.crud.post_api('cardapio&acmenu=editarItem', accallback, this.formItem.value);
  }

}
