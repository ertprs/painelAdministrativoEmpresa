import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DialogCadastroCategoriaAdcService } from './dialog-cadastro-categoria-adc.service';
import { CategoriaAdicionalService } from '../../categorias-adicionais/categoria-adicional.service';

@Component({
  selector: 'app-dialog-categoria-adicional',
  templateUrl: './dialog-categoria-adicional.component.html',
  styleUrls: ['./dialog-categoria-adicional.component.css']
})
export class DialogCategoriaAdicionalComponent implements OnInit {

  autoTicks = true;
  disabled = false;
  invert = false;
  max = 100;
  min = 0;
  showTicks = true;
  step = 1;
  thumbLabel = true;
  qntAdcItem = 1;
  quantidade = 1;
  qntMinAdcItem = 0;
  vertical = false;
  tickInterval = 0;

  formCadastro: FormGroup;
  btstatus: boolean;
  disponivel: boolean;

  constructor(private formBuilder: FormBuilder, private servapp: ServicoService, private crud: CrudServicoService,
              public servDCadc: DialogCadastroCategoriaAdcService, private servcatadc: CategoriaAdicionalService) { }

  ngOnInit(): void {
    this.iniciaForm();
  }

  onClickAdd(disponivel: any, quantidade: any, qntAdcItem: any, qntMinAdcItem: any) {
    this.formCadastro.value.disponivel = disponivel;
    this.formCadastro.value.maxsele = quantidade;
    this.formCadastro.value.minsele = qntMinAdcItem;
    this.formCadastro.value.qntAdcItem = qntAdcItem;
    console.log(this.formCadastro.value);

    this.btstatus = true;
    const callbfun = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.mensagem);
        this.btstatus = false;
      } else {
        this.btstatus = false;
        this.servcatadc.setCategoriasAdicional(r.lista);
        this.formCadastro.controls.nome.setValue('');
        this.formCadastro.controls.descricao.setValue('');

      }
    };
    console.log( this.crud.post_api('cadastro_categoria_adicional', callbfun, this.formCadastro.value ) );
  }

  onSalvarItem(disponivel: any, quantidade: any, qntAdcItem: any, qntMinAdcItem: any) {
    this.formCadastro.value.disponivel = disponivel;
    this.formCadastro.value.maxsele = quantidade;
    this.formCadastro.value.minsele = qntMinAdcItem;
    this.formCadastro.value.qntAdcItem = qntAdcItem;
    console.log(this.formCadastro.value);

    this.btstatus = true;
    const callbfun = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.detalhes);
        this.btstatus = false;
      } else {
        this.btstatus = false;
        this.servcatadc.setCategoriasAdicional(r.lista);
        this.servapp.mostrarMensagem(r.detalhes);
      }
    };
    this.crud.post_api('editar_cat_adc', callbfun, this.formCadastro.value );
  }

  iniciaForm() {
    // se true == editar
    if (this.servDCadc.getTipoacao()) {
      this.quantidade = this.servDCadc.getCategoriaAdicional().maxsele;
      this.disponivel = this.servDCadc.getCategoriaAdicional().disponivel;
      this.formCadastro = this.formBuilder.group({
        id_empresa: [this.servapp.getDadosEmpresa().id],
        id_categoria: [this.servDCadc.getCategoriaAdicional().id],
        nome: [this.servDCadc.getCategoriaAdicional().nome, Validators.required],
        descricao: [this.servDCadc.getCategoriaAdicional().descricao],
        disponivel: [this.servDCadc.getCategoriaAdicional().disponivel],
        minsele: [this.servDCadc.getCategoriaAdicional().minsele],
        maxsele: [this.servDCadc.getCategoriaAdicional().maxsele],
        qntAdcItem: [this.servDCadc.getCategoriaAdicional().qnt_adc_item],
      });
      return;
    }
    this.disponivel = false;
    this.formCadastro = this.formBuilder.group({
      id_empresa: [this.servapp.getDadosEmpresa().id],
      nome: [null, Validators.required],
      descricao: [''],
      disponivel: [null],
      maxsele: [null],
      minsele: [null],
      qntAdcItem: [1],
    });
  }

  getSliderTickInterval(): number | 'auto' {
    if (this.showTicks) {
      return this.autoTicks ? 'auto' : this.tickInterval;
    }

    return 0;
  }

}
