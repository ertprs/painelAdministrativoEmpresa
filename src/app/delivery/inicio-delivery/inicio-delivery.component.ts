import { map } from 'rxjs/operators';
import { DeliveryService } from './../delivery.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-delivery',
  templateUrl: './inicio-delivery.component.html',
  styleUrls: ['./inicio-delivery.component.css']
})
export class InicioDeliveryComponent implements OnInit {

  listaCidades: any;
  listaCidadesEntrega: any;
  cidadeClienteSelecionada: any;
  formCadastro: FormGroup;
  formcadastroStatus: any;
  btCstatus: boolean;
  public getHrfun: any;
  public metodosPagamento: any;
  public locaisEntrega: any;
  public dadosEmpresa: any;
  private valorSubmit: any;
  public cidadeSelecionada: any;
  public tipoServico: any;

  constructor(private crud: CrudServicoService, private formBuilder: FormBuilder, public servico: ServicoService,
              private router: Router, public servdelivery: DeliveryService) { }

  ngOnInit(): void {


    this.formCadastro = this.formBuilder.group({
      tags: [''],
      pedidomin: [''],
      pedidomax: [''],
      seguimento: [''],
      formasfuncionamento: [''],
      tempoentrega: [''],
      hrfun: [''],
      metodosPagamento: [''],
    });

    console.log('#CadastroEmpresaComponent');
    this.consultaCidades();
    this.formcadastroStatus = false; // => false
    this.btCstatus = false;
    this.getHrfun = this.servdelivery.getHrfun();
    this.metodosPagamento = this.servdelivery.getFormaspagamento();
    this.locaisEntrega = this.servdelivery.getLocaisEntrega();
    this.dadosEmpresa = this.servico.getDadosEmpresa();

    this.getHrfun = this.dadosEmpresa.hrfun;

    this.tipoServico = [
      { nome: 'Somente entrega', tipo: '1' },
      { nome: 'Somente retirada', tipo: '2' },
      { nome: 'Entrega e retirada', tipo: '3' }
    ];

    this.iniciaForm();
  }

  consultaCidades() {
    console.log('#consultaCidades');
    this.crud.get_api('cidades_server').subscribe(data => {
      if (data.lista === null) { } else {
        this.listaCidades = data.lista_cidades;
        this.listaCidadesEntrega = data.lista_cidades_entrega;
      }
    });
  }

  selectionChangeCidade(item: any) {
    console.log('#selectionChangeCidade');
    console.log(item);

    this.cidadeClienteSelecionada = item;


    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.setListaBairros(r);
      }
      console.log(r);
    };
    this.crud.post_api('bairros', accallback, this.cidadeClienteSelecionada);

  }

  iniciaForm() {
    this.formCadastro = this.formBuilder.group({
      id: [this.servico.getDadosEmpresa().id],
      tags: [this.dadosEmpresa.tags, Validators.required],
      pedidomin: [this.dadosEmpresa.pedidomin, Validators.required],
      pedidomax: [this.dadosEmpresa.pedidomax, Validators.required],
      seguimento: [this.dadosEmpresa.seguimento, Validators.required],
      formasfuncionamento: [''],
      tempoentrega: [this.dadosEmpresa.tempoentrega, Validators.required],
      hrfun: this.buildDiasForm(),
      locaisEntrega: this.buildLocaisEntregaForm(),
      metodosPagamento: this.buildFp(),
    });

     // async orders
   /*  console.log(this.dadosEmpresa.formasfuncionamento);
    (this.dadosEmpresa.formasfuncionamento).subscribe(orders => {
      this.tipoServico = orders;
      this.formCadastro.controls.formasfuncionamento.patchValue(this.tipoServico[0]);
    });
*/
    this.tipoServico.forEach(element => {
      if (element.tipo === this.dadosEmpresa.formasfuncionamento.tipo) {
        this.formCadastro.controls.formasfuncionamento.patchValue(element);
       }
    });

  }

  buildDiasForm() {
    const valores = this.dadosEmpresa.hrfun.map((v, i) => this.createItem(v));
    return this.formBuilder.array(valores);
  }

  createItem(data: {nome, abre, fecha, status, id_nome}): FormGroup {
    return this.formBuilder.group({
      nome: data.nome,
      abre: data.abre,
      fecha: data.fecha,
      status: data.status,
      id_nome: data.id_nome,
    });
  }

  buildLocaisEntregaForm() {
    const valores = this.dadosEmpresa.locais_entrega.map((v, i) => this.createCidade(v));
    return this.formBuilder.array(valores);
  }

  createCidade(data: any): FormGroup {
    return this.formBuilder.group({
      id: data.id,
      nome: data.nome,
      disponivel: data.disponivel,
      bairros: this.buildBairro(data.bairros)
    });
  }

  buildBairro(data) {
    const valores = data.map((v, i) => this.createBairro(v));
    return this.formBuilder.array(valores);
  }

  createBairro(data: any): FormGroup {
    return new FormGroup({
      id: new FormControl(data.id),
      cidade_id: new FormControl(data.cidade_id),
      nome: new FormControl(data.nome),
      disponivel: new FormControl(data.disponivel),
      taxa: new FormControl(data.taxa),
    });
  }

  buildFp() {
    console.log('config forma de pagamento');
    console.log(this.dadosEmpresa.formaspagamento);
    const valores = this.dadosEmpresa.formaspagamento.map((v, i) => this.createItemFp(v));
    console.log(valores);
    return this.formBuilder.array(valores);
  }

  createItemFp(data: any): FormGroup {
    return new FormGroup({
      id: new FormControl(data.id),
      nome: new FormControl(data.nome),
      descricao: new FormControl(data.descricao),
      disponivel: new FormControl(data.disponivel),
      itens: this.buildItemFp(data.itens),
    });
  }

  buildItemFp(data) {
    try {
    const valores = data.map((v, i) => this.createFp(v));
    return this.formBuilder.array(valores);
    } catch (e) { console.log('????????'); }
  }

  createFp(data: any): FormGroup {
    return new FormGroup({
      id: new FormControl(data.id),
      id_formapagamento: new FormControl(data.id_formapagamento),
      imagem: new FormControl(data.imagem),
      nome: new FormControl(data.nome),
      disponivel: new FormControl(data.disponivel),
    });
  }


  onclickCadastrar() {
    console.log('#onclickCadastrar');


    console.log(this.formCadastro);
    console.log(this.formCadastro.value);

    this.btCstatus = true;
    const loginres = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.mensagem);
        this.btCstatus = false;
      } else {
        this.servico.mostrarMensagem(r.mensagem);
        this.formcadastroStatus = true;
      }
    };
    console.log( this.crud.post_api('salva_config_delivery_empresa', loginres, this.formCadastro.value ) );
  }

  cadatroFeito() {
    this.formcadastroStatus = true;
  }


  onClickSelecionarCidadeFiltro(item) {
    console.log(item);
    this.cidadeSelecionada = item.id;
  }


}
