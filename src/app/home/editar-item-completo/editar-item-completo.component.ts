import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { HomeService } from './../home.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-editar-item-completo',
  templateUrl: './editar-item-completo.component.html',
  styleUrls: ['./editar-item-completo.component.css']
})
export class EditarItemCompletoComponent implements OnInit {

  tb1: string[] = ['opcoes', 'status', 'nome', 'nomecategoria', 'preco', 'info', 'datamodificado', 'remover'];

  public form: FormGroup;
  valorSubmit: any;
  panelOpenState: boolean;
  imagem: any;
  item = { imagem: '', disponibilidade: [], categoriaadicional: [] };
  diaselecionado: any;
  diasItem: any;
  diasLista: Array<any>;
  catsEAdcs: any;
  categoriasCatalogo: Array<any>;

  arquivo: any;
  itemRequest: any;
  statusLoadConteudo = true;

  constructor(private formBuilder: FormBuilder, public servhome: HomeService, public servapp: ServicoService,
              private crud: CrudServicoService, private http: HttpClient, private route: Router) { }



  ngOnInit(): void {

    this.imagem = this.servapp.getDadosEmpresa().imagem;


    if (this.servhome.getTipoAcao()) {
      // editar item
      console.log(' ~~~~~~~~ EDITAR ITEM ~~~~~~~~');


      this.crud.get_api('consulta_item_cardapio&id_empresa=' +
        this.servapp.getDadosEmpresa().id +
        '&id_item=' + this.servhome.getItem().id).subscribe(
          (data: any) => {
            console.log(data);
            this.itemRequest = data.item;
            this.imagem = data.item.imagem;
            this.diasLista = data.item.disponibilidade;
            this.catsEAdcs = data.item.categoriaadicional;
            this.categoriasCatalogo = data.item.categoria;


            this.form = this.formBuilder.group({
              id: [this.servhome.getItem().id],
              idcategoria: [''],
              nome: [this.itemRequest.nome],
              descricao: [this.itemRequest.descricao],
              esconder: [this.itemRequest.esconder],
              esgotado: [this.itemRequest.esgotado],
              preco: [this.itemRequest.preco],
              id_empresa: [this.servapp.getDadosEmpresa().id],
              id_categoria: [this.servhome.getCategoria().id],
              categoria_nome: [''],
              imagem: [this.imagem],
              disponibilidade: this.buildDiasDisponiveis(),
              categoriaadicional: this.buildCategoriasEAdicionais(),
              status_promocao: [this.itemRequest.status_promocao],
              desconto: [this.itemRequest.desconto],
              categoria: this.buildCategoriasCardapio(),

              estoque_mim: [this.itemRequest.estoque_mim],
              estoque_med: [this.itemRequest.estoque_med],
              quantidade_retira: [this.itemRequest.quantidade_retira],
              un_caixa: [this.itemRequest.un_caixa],

            });

            this.statusLoadConteudo = false;


          },
          error => {
            console.log(error);
          }
        );




    } else {
      // novo item
      console.log(' ~~~~~~~~ NOVO ITEM ~~~~~~~~');

      this.diasLista = this.servhome.getItemModel().disponibilidade;
      this.catsEAdcs = this.servhome.getItemModel().categoriaadicional;
      this.categoriasCatalogo = this.servhome.getItemModel().categoria;


      this.form = this.formBuilder.group({
        id: [''],
        nome: [''],
        descricao: [''],
        esconder: [false],
        esgotado: [false],
        preco: [''],
        id_empresa: [this.servapp.getDadosEmpresa().id],
        id_categoria: [this.servhome.getCategoria().id],
        categoria_nome: [''],
        imagem: [''],
        disponibilidade: this.buildDiasDisponiveis(),
        categoriaadicional: this.buildCategoriasEAdicionais(),
        status_promocao: [''],
        desconto: [''],
        categoria: this.buildCategoriasCardapio(),

        estoque_mim: [''],
        estoque_med: [''],
        quantidade_retira: [''],
        un_caixa: [''],

      });
      //
      setTimeout(() => {
        this.statusLoadConteudo = false;
      }, 600);

    }

  }

  onClickAddItem() {
    this.valorSubmit = Object.assign({}, this.form.value);
    this.valorSubmit = Object.assign(this.valorSubmit, {
      disponibilidade: this.valorSubmit.disponibilidade
        .map((v, i) => v ? this.diasLista[i] : this.diasLista[i])
    });

    this.valorSubmit = Object.assign(this.valorSubmit, {
      categoriaadicional: this.valorSubmit.categoriaadicional
        .map((v, i) => v ? this.catsEAdcs[i] : this.catsEAdcs[i])
    });

    this.valorSubmit = Object.assign(this.valorSubmit, {
      categoria: this.valorSubmit.categoria
        .map((v, i) => v ? this.categoriasCatalogo[i] : this.categoriasCatalogo[i])
    });

    console.log(this.valorSubmit);

    if (!this.form.value.nome) { alert('Informe o nome do item'); return; }
    // if (!this.form.value.preco) { alert('Informe o preço do item'); return; }
    if (!this.form.value.descricao) { alert('Informe a descrição do item'); return; }

    // Se o usuario não selecionar a imagem, envia a imagem da empresa
    if (this.arquivo) {
      this.enviaImagem();
    } else {
      this.valorSubmit.imagem = this.imagem;
      this.salvaItemBanco();
    }

  }

  enviaImagem() {


    this.statusLoadConteudo = true;

    const formData = new FormData();
    formData.append('nome_imagem_text', this.arquivo.name);
    formData.append('imagem', this.arquivo);
    this.http.post(this.servapp.getApiAcao('upload_img_galeria'), formData).subscribe(
      (data: any) => {
        // logo que enviar a imagem pega o nome da imagem e salva o produto no banco de dados
        this.valorSubmit.imagem = data.mensagem;
        this.salvaItemBanco();
      },
      error => {
        this.statusLoadConteudo = false;
        alert('Não foi possível enviar a imagem do item');
      }
    );

  }

  salvaItemBanco() {

    console.log('#salvaItemBanco');
    console.log(this.valorSubmit);

    this.statusLoadConteudo = true;
    const loginres = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.mensagem);
        this.statusLoadConteudo = false;
      } else {
        this.servapp.mostrarMensagem(r.mensagem);
        this.statusLoadConteudo = false;
        this.route.navigate(['/painel/cardapio']);
      }
    };

    if (this.servhome.getTipoAcao()) {
      /*Edita item*/
      this.crud.post_api('att_item_cardapio', loginres, this.valorSubmit);
    } else {
      /*Add novo item*/
      this.crud.post_api('add_item_cardapio', loginres, this.valorSubmit);
    }


  }

  buildDiasDisponiveis(): any {
    try {
      const valores = this.diasLista.map((v) => new FormControl(v.status));
      return this.formBuilder.array(valores);
    } catch (e) {
      this.diasLista = this.servhome.getItemModel().disponibilidade;
      const valores = this.diasLista.map((v) => new FormControl(v.status));
      return this.formBuilder.array(valores);
    }
  }


  buildCategoriasEAdicionais(): any {
    const valores = this.catsEAdcs.map((v) => new FormControl(v.status));
    return this.formBuilder.array(valores);
  }

  buildCategoriasCardapio(): any {
    const valores = this.categoriasCatalogo.map((v) => new FormControl(v.status));
    return this.formBuilder.array(valores);
  }

  inputFile(event: any) {
    console.log(this);
    this.arquivo = event.target.files[0];
    console.log(this.arquivo);
    const fileRead = new FileReader();
    fileRead.onloadend = () => {
      this.imagem = fileRead.result;
    };
    fileRead.readAsDataURL(this.arquivo);
  }

  onClickImagemSelecionar() {
    document.getElementById('imgInp').click();
  }

  onClickObrigatorio(event, item) {
    item.obrigatorio = event.checked;
    console.log(item);
  }

  onClickAdicional(event, item) {
    item.status = event.checked;
    console.log(item);
  }

  onClickDiaDisponivel(event, item) {
    item.status = event.checked;
    console.log(item);
  }

  onClickCategoria(event, item) {
    item.status = event.checked;
    console.log(item);
  }

  onClickCancelar() {
    this.route.navigate(['painel/cardapio']);
  }

}
