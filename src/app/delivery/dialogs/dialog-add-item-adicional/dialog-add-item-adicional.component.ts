import { ItensService } from './../../itens-adicionais/itens.service';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoriaAdicionalService } from '../../categorias-adicionais/categoria-adicional.service';

@Component({
  selector: 'app-dialog-add-item-adicional',
  templateUrl: './dialog-add-item-adicional.component.html',
  styleUrls: ['./dialog-add-item-adicional.component.css']
})
export class DialogAddItemAdicionalComponent implements OnInit {

  form: FormGroup;
  btstatus: boolean;
  categoriasItem: any;
  tipoacao: boolean;

  constructor(public servcadc: CategoriaAdicionalService, private formBuilder: FormBuilder, private servapp: ServicoService,
              private crud: CrudServicoService, public itensServ: ItensService) { }

  ngOnInit(): void {
    this.servcadc.consultaCategoriasAdicionais();
    this.tipoacao = this.itensServ.getTipoacao();

    if (this.itensServ.getTipoacao()) {

    this.form = this.formBuilder.group({
      id_empresa: [this.servapp.getDadosEmpresa().id],
      nome: [''],
      disponivel: [''],
      categoria: [''],
      preco: ['']
    });

  } else {
    console.log(this.itensServ.getItemAdicional().categoria);
    this.categoriasItem = this.itensServ.getItemAdicional().categoria;
    this.form = this.formBuilder.group({
      id_empresa: [this.servapp.getDadosEmpresa().id],
      id: [this.itensServ.getItemAdicional().id],
      nome: [this.itensServ.getItemAdicional().nome],
      disponivel: [this.itensServ.getItemAdicional().disponivel],
      categoria: [this.itensServ.getItemAdicional().categoria],
      preco: [this.itensServ.getItemAdicional().preco]
    });
  }


  }

  onSalvarItem() {

    this.btstatus = true;
    const callbfun = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.detalhes);
        this.btstatus = false;
      } else {
        this.btstatus = false;
        this.itensServ.setItensAdicional(r.lista);
        this.servapp.mostrarMensagem(r.detalhes);
      }
    };
    this.crud.post_api('editar_item_adc', callbfun, this.form.value );
  }

  onClickAdd() {
    console.log(this.form.value);
    this.btstatus = true;
    const callbfun = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.mensagem);
        this.btstatus = false;
      } else {
        this.servapp.mostrarMensagem(r.detalhes);
        this.btstatus = false;
        this.itensServ.setItensAdicional(r.lista);
      }
    };
    this.crud.post_api('add_adicional', callbfun, this.form.value );
  }

}
