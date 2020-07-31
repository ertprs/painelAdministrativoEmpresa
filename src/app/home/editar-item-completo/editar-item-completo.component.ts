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
  @ViewChild('diasitem') diasitem: any;
  diaselecionado: any;
  diasItem: any;
  diasLista: [];
  catsEAdcs: [];
  arquivo: any;
  statusLoadConteudo = false;
  constructor(private formBuilder: FormBuilder, public servhome: HomeService, private servapp: ServicoService,
              private crud: CrudServicoService, private http: HttpClient) {

    this.diasLista = this.servhome.getItemModel().disponibilidade;
    this.catsEAdcs = this.servhome.getItemModel().categoriaadicional;


  }



  ngOnInit(): void {

    this.imagem = this.servapp.getDadosEmpresa().imagem;
    console.log(this.servhome.getItem());

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
    });
    /*
        if (this.servhome.getTipoAcao()) {
          // editar item
          this.form = this.formBuilder.group({
            id: [this.servhome.getItem().id],
            idcategoria: [''],
            nome: [this.servhome.getItem().nome],
            descricao: [this.servhome.getItem().descricao],
            preco: [this.servhome.getItem().preco],
            status_promocao: [this.servhome.getItem().status_promocao],
            desconto: [this.servhome.getItem().desconto],
            disponibilidade: [''],
          });

        } else {
          // novo item

          //
         }
         */
  }

  onClickAddItem() {
    this.valorSubmit = Object.assign({}, this.form.value);
    this.valorSubmit = Object.assign(this.valorSubmit, {
      disponibilidade: this.valorSubmit.disponibilidade
        .map((v, i) => v ? this.diasLista[i] : null)
    });

    this.valorSubmit = Object.assign(this.valorSubmit, {
      categoriaadicional: this.valorSubmit.categoriaadicional
        .map((v, i) => v ? this.catsEAdcs[i] : this.catsEAdcs[i])
    });

    console.log(this.valorSubmit);

    if (!this.form.value.nome) { alert('Infome o nome do item'); return; }
    if (!this.form.value.preco) { alert('Infome o preço do item'); return; }
    if (!this.form.value.descricao) { alert('Infome a descrição do item'); return; }

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
      }
    };

    this.crud.post_api('add_item_cardapio', loginres, this.valorSubmit);

  }

  buildDiasDisponiveis() {
    const valores = this.diasLista.map((v) => new FormControl(false));
    return this.formBuilder.array(valores);
  }


  buildCategoriasEAdicionais() {
    const valores = this.catsEAdcs.map((v) => new FormControl(false));
    return this.formBuilder.array(valores);
  }

  inputFile(event: any) {
    console.log(this);
    this.arquivo = event.target.files[0];
    console.log(this.arquivo);
    const fileRead = new FileReader();
    fileRead.onloadend = () => {
      this.imagem = fileRead.result;
    }
    fileRead.readAsDataURL(this.arquivo);
  }

  onClickImagemSelecionar() {
    document.getElementById('imgInp').click();
  }

}
