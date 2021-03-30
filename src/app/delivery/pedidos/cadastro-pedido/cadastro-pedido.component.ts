import { ValorItemPagamentoComponent } from './valor-item-pagamento/valor-item-pagamento.component';
import { SelecionarBancoComponent } from './../../../bancos/selecionar-banco/selecionar-banco.component';
import { Router } from '@angular/router';
import { SelecionarFormaPagComponent } from './selecionar-forma-pag/selecionar-forma-pag.component';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CadastroPedidoService } from './cadastro-pedido.service';
import { ItemCatalogoComponent } from './item-catalogo/item-catalogo.component';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { SelecionarMotoboyComponent } from 'src/app/estoque/itens-estoque-detalhes/selecionar-motoboy/selecionar-motoboy.component';
import { SelecionarCartaoPagamentoComponent } from './selecionar-cartao-pagamento/selecionar-cartao-pagamento.component';

@Component({
  selector: 'app-cadastro-pedido',
  templateUrl: './cadastro-pedido.component.html',
  styleUrls: ['./cadastro-pedido.component.css']
})
export class CadastroPedidoComponent implements OnInit {

  catalogo: any;
  itemCatalogo: any;
  statusLoad = false;
  statusLoadItem = false;
  form: FormGroup;
  formvalorFp: FormGroup;
  endereco: any;
  statusbt = false;
  cidadeClienteSelecionada: any;
  taxaEntregador: any;
  taxaEntregadorText: any;

  statusLoaderBairros = false;
  statusLoaderTaxa = false;
  statusLoaderEnviaPedido = false;

  listaCidades: Array<any>;
  listaBairros: any;
  indexTabGroup = 0;
  cataoSelecionado: any;
  stand = false;
  statusBtenviar = false;


  constructor(public servico: ServicoService, private crud: CrudServicoService, private dialog: MatDialog,
    public servcard: CadastroPedidoService, private fb: FormBuilder,
    private bottomSheet: MatBottomSheet, private router: Router) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      nome: [null, Validators.required],
      telefone: [null, Validators.required],
      rua: [null, Validators.required],
      numero: [null, Validators.required],
      complemento: [null],
      tiporesidencia: [null],
      bairro: [false, Validators.required],
      cidade: [false, Validators.required],
      taxaentrega: [null, Validators.required],
      formapagamento: [false, Validators.required],
      canalpedido: [false, Validators.required],
      tipopedido: [false, Validators.required],
      troco: ['', Validators.required],
      desconto: [''],
      taxaextra: [''],
      valor: ['1'],
    });

    this.formCadastro();
    this.consultaCatalogo();

    this.formvalorFp = this.fb.group({
      valor: [''],
    });





    this.servcard.funcaoEmitter.subscribe(data => {
      this.selecionarBanco();
    });

    this.servcard.selecionarCartao.subscribe(data => {
      this.cataoSelecionado = data;
      this.selecionarCartao(data);
    });



  }

  trocarTaxa() {
    const taxa = this.servcard.getCarrinho().taxaentrega;
    let taxaEntregaFloat = taxa;
    if (!taxaEntregaFloat) { taxaEntregaFloat = 0; }
    taxaEntregaFloat = parseFloat(taxaEntregaFloat.toString());
    this.servcard.setTaxaEntrega(taxaEntregaFloat);
    this.servcard.setTaxaManual(taxaEntregaFloat);
  }

  onClickStandBy(status) {
    if (status.checked) {
      this.stand = false;
    } else {
      this.stand = true;
    }
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }

  carregaDadosUsuario() {
    this.servcard.iniciaFormCadastro.subscribe(
      (data) => {

        this.indexTabGroup = 1;

        this.form = this.fb.group({
          id: [data.id, Validators.required],
          nome: [data.nome, Validators.required],
          telefone: [data.telefone, Validators.required],
          rua: [data.rua, Validators.required],
          numero: [data.numero, Validators.required],
          complemento: [data.complemento],
          tiporesidencia: [data.tiporesidencia],
          bairro: [null],
          cidade: [null],
          taxaentrega: [null, Validators.required],
          formapagamento: [false, Validators.required],
          canalpedido: [false, Validators.required],
          tipopedido: [false, Validators.required],
          troco: ['', Validators.required],
          desconto: [''],
          taxaextra: [''],

        });


      }
    );
  }

  iniciaFormDados() {

    if (this.servcard.getCadastroClienteLista().taxaextra > 0) {
      this.servcard.getCarrinho().taxaextra = this.servcard.getCadastroClienteLista().taxaextra;
    }
    if (this.servcard.getCadastroClienteLista().desconto > 0) {
      this.servcard.getCarrinho().desconto = this.servcard.getCadastroClienteLista().desconto;
    }

    /*this.servcard.getCadastroClienteLista().formaspagamento.forEach(element => {
          this.servcard.addFp(element);
        });*/

    this.form = this.fb.group({
      id: [this.servcard.getCadastroClienteLista().id],
      nome: [this.servcard.getCadastroClienteLista().nome, Validators.required],
      telefone: [this.servcard.getCadastroClienteLista().telefone, Validators.required],
      rua: [this.servcard.getCadastroClienteLista().rua, Validators.required],
      numero: [this.servcard.getCadastroClienteLista().numero, Validators.required],
      complemento: [this.servcard.getCadastroClienteLista().complemento],
      tiporesidencia: [this.servcard.getCadastroClienteLista().tiporesidencia],
      bairro: [null],
      cidade: [null],
      taxaentrega: [null],
      formapagamento: [false],
      canalpedido: [false],
      tipopedido: [false],
      troco: [''],
      desconto: [''],
      taxaextra: [''],
    });

    this.selecionarCidadeAuto(this.servcard.getCadastroClienteLista().cidade.nome, this.servcard.getCadastroClienteLista().bairro.nome);


  }

  selecionaCidadeSelect(item) {
    this.cidadeClienteSelecionada = item;
    this.listaBairros = item.bairros;
  }

  formTaxa(item) {

    this.form.controls.taxaentrega.setValue(item.taxa);
    this.servcard.setTaxaEntrega(parseFloat(item.taxa));
    this.servico.getDadosEmpresa().taxa_entrega = parseFloat(item.taxa);
    this.taxaEntregadorText = item.taxa;
  }

  selecionarCidadeAuto(nomeCidade: string, nomeBairro: string) {
    if (!nomeCidade) { this.servico.mostrarMensagem('Não foi possível selecionar a cidade do cliente'); return; }
    if (!nomeBairro) { this.servico.mostrarMensagem('Não foi possível selecionar a cidade do cliente'); return; }
    nomeCidade = nomeCidade.trim();
    const nomeBairroRep = nomeBairro.trim();

    console.log('#selecionarCidadeAuto');
    console.log(':' + nomeCidade + ':');
    console.log(':' + nomeBairroRep + ':');

    let statusCidade = false;
    const accallback = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.setListaBairros(r);
        this.selecionaBairroAuto(nomeBairroRep);
      }
    };


    this.listaCidades.forEach(element => {
      if (element.nome.trim() === nomeCidade) {
        statusCidade = true;
        this.form.controls.cidade.setValue(element);
        this.listaBairros = element.bairros;
        this.selecionaBairroAuto(nomeBairroRep);
        return;
      }
    });


    if (statusCidade === false) { this.servico.mostrarMensagem('Cidade não selecionada. ' + nomeCidade); }
  }

  selecionaBairroAuto(nomeBairro: string) {
    for (const key in this.listaBairros) {
      if (this.listaBairros[key].nome === nomeBairro) {
        // this.carregaTaxa(this.servico.getListaBairros()[key]);
        this.form.controls.bairro.setValue(this.listaBairros[key]);
        this.form.controls.taxaentrega.setValue(this.listaBairros[key].taxa);
        this.servcard.setTaxaEntrega(parseFloat(this.listaBairros[key].taxa));
        this.servico.getDadosEmpresa().taxa_entrega = parseFloat(this.listaBairros[key].taxa);
        this.taxaEntregadorText = this.listaBairros[key].taxa;

      }
    }
    this.servcard.setCadastroClienteLista(false);
  }

  f1(form) {

    const accallback = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);

      }
    };
    this.crud.post_api('cadatrar_motoboy', accallback, form);
  }

  consultaCatalogo() {

    this.statusLoad = true;
    this.crud.get_api('cardapio&acmenu=listar').subscribe(data => {
      this.catalogo = data.catalogo;
      this.statusLoad = false;
      this.listaCidades = data.empresa.locais_entrega;

      setTimeout(() => {
        this.iniciaFormDados();
      }, 400);

    });

  }

  formCadastro() {
    if (!this.servcard.getCadastroClienteLista()) {

      this.form = this.fb.group({
        nome: [null, Validators.required],
        telefone: [null, Validators.required],
        rua: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null],
        tiporesidencia: [null],
        bairro: [false, Validators.required],
        cidade: [false, Validators.required],
        taxaentrega: [null, Validators.required],
        formapagamento: [false, Validators.required],
        canalpedido: [false, Validators.required],
        tipopedido: [false, Validators.required],
        troco: ['', Validators.required],
        desconto: [''],
        taxaextra: [''],
        valor: ['1'],

      });

    } else {
      // this.iniciaFormDados();
      // tslint:disable-next-line: max-line-length
      // this.selecionarCidadeAuto(this.servcard.getCadastroClienteLista().cidade.nome, this.servcard.getCadastroClienteLista().bairro.nome);
      // this.indexTabGroup = 1;
    }
  }

  onClickItem(item): void {


    if (item.esgotado === true) {
      this.servico.mostrarMensagem('Item esgotado');
      return;
    }

    const dialogRef = this.dialog.open(ItemCatalogoComponent, {
      width: '650px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

      }
    });
  }

  selecionarBanco(): void {


    const dialogRef = this.dialog.open(SelecionarBancoComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.servcard.getCarrinho().item_pagamento.id = result.id;
        this.servcard.getCarrinho().item_pagamento.nome = result.nome;
        this.servcard.getCarrinho().item_pagamento.status = true;

      }
    });
  }

  selecionarCartao(cartao): void {


    const dialogRef = this.dialog.open(SelecionarCartaoPagamentoComponent, {
      width: '400px',
      data: { item: cartao }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.servcard.getCarrinho().item_pagamento.id = result.id;
        this.servcard.getCarrinho().item_pagamento.nome = result.nome;
        this.servcard.getCarrinho().item_pagamento.status = true;
      }
    });
  }


  onClickFinalizarPedido() {

    // Verifica se as formas de pagamento o total esta maior que o valor do pedido em se
    if (this.servcard.verificaFpsTotal() > this.servcard.getTotalCarrinho()) {
      this.servico.mostrarMensagem('Os valores das formas de pagamento estão maior que o valor total do pedido');
      return;
    }



    if (this.servcard.getQntItensCar() < 1) { this.servico.mostrarMensagem('O carrinho está vazio!'); return; }
    if (this.servcard.verificaFp() === false && !this.stand) {
      // this.servico.mostrarMensagem('Selecione a forma de pagamento deste pedido');
      this.openBottomSheet('formapagamento');
      return;
    }

    if (this.servcard.getCarrinho().origempedido === false) {
      // this.servico.mostrarMensagem('Selecione a origem deste pedido');
      this.openBottomSheet('canalpedido');
      return;
    }

    if (this.servcard.verificaFpsTotal() !== this.servcard.getTotalCarrinho() && !this.stand) {
      this.servico.mostrarMensagem
        ('Os total da forma de pagamento está menor que o total do pedido.');
      return;
    }

    // Verifica se foi selecionado a bandeira do carão em Cartao Crédito ou Déb.
    const nomeFp = this.servcard.getCarrinho().formapagamento.nome.toLocaleLowerCase();
    if (nomeFp === 'cartão de crédito' || nomeFp === 'cartão de débido') {
      if (this.servcard.getCarrinho().item_pagamento.status === false) {
        this.selecionarCartao(this.cataoSelecionado);
        return;
      }
    }


    // Verifica se foi selecionado o banco da tranderência bancária.
    if (nomeFp === 'transferência bancária' || nomeFp === 'transferência') {
      if (this.servcard.getCarrinho().item_pagamento.status === false) {
        this.selecionarBanco();
        return;
      }
    }


    if (this.servcard.getCarrinho().tipopedido === 'false') {
      // this.servico.mostrarMensagem('Selecione a opção do pedido, se é para entrega ou para retirada');
      this.openBottomSheet('tipopedido');
      return;
    }
    if (this.form.value.rua === '' || !this.form.value.rua) { this.servico.mostrarMensagem('Informe a rua do pedido'); return; }
    if (this.form.value.cidade === false) { this.servico.mostrarMensagem('Selecione a cidade do pedido'); return; }
    if (this.form.value.bairro === false) { this.servico.mostrarMensagem('Selecione o bairro do pedido'); return; }

    this.servcard.setCliente(this.servico.getDadosEmpresa().id);
    this.servcard.setIdEmpresaCar(this.servico.getDadosEmpresa().id);
    /* if (this.servcard.getTotalCarrinho() < this.servcard.getEmpresa().pedidomin) {
       this.alertaDinam('Ops!', 'O pedido mínimo deste estabelecimento é de R$' + this.empServ.getEmpresa().pedidomin + ',00 reais');
       return;
     }*/

    if (!this.form.value.nome) { this.servico.mostrarMensagem('Informe o nome do cliente'); return; }
    if (!this.form.value.nome) { this.servico.mostrarMensagem('Informe o telefone do cliente'); return; }

    const cli = { imagem: '', id: this.form.value.id, nome: this.form.value.nome, telefone: this.form.value.telefone };
    this.servcard.setCliente(cli);
    this.servcard.setEmpresaCarrinho(this.servico.getDadosEmpresa());
    this.servcard.setSubtotal(this.servcard.getSubTotalCarrinho());
    this.servcard.getCarrinho().endereco.cidade = this.form.value.cidade;
    this.servcard.getCarrinho().endereco.bairro = this.form.value.bairro;
    this.servcard.setItensEndereco(this.form.value);
    this.servcard.atualizaTotalComTaxa();
    // this.servcard.setDescontoCarrinho(this.form.value.desconto);
    this.statusbt = true;





    if (this.servcard.getCarrinho().formapagamento.nome === 'dinheiro' ||
      this.servcard.getCarrinho().formapagamento.nome === 'Dinheiro') {
      this.servcard.setTroco(this.form.value.troco);
    }

    this.statusLoaderEnviaPedido = true;



    this.statusBtenviar = true;
    const accallback = () => {

      this.statusLoaderEnviaPedido = false;
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes);
        this.statusBtenviar = false;
      } else {

        this.servico.mostrarMensagem('Pedido finalizado');
        this.servcard.limparCarrinho();
        this.router.navigate(['/painelpedidos/pedidos']);
      }
    };
    this.crud.post_api('adicionar_pedido', accallback, this.servcard.getCarrinho(), true);



  }

  selectionChangeCidade(item: any) {

    this.cidadeClienteSelecionada = item;
    this.statusLoaderBairros = true;

    const accallback = () => {
      this.statusLoaderBairros = false;
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.setListaBairros(r);
      }
    };
    this.crud.post_api('bairros', accallback, this.cidadeClienteSelecionada);

  }

  carregaTaxa(itembairro: any) {
    try {
      let coordendasBairro = '';
      const cidadeNome = this.cidadeClienteSelecionada;
      coordendasBairro = itembairro.lat + ', ' + itembairro.lng;

      const fcallb = () => {
        this.statusLoaderTaxa = false;
        const r = this.servico.getRespostaApi();
        if (r.erro === true) {
          this.servico.mostrarMensagem(r.mensagem);
        } else {
          for (const x in this.servico.getListaBairros()) {
            if (this.servico.getListaBairros()[x].id === itembairro.id) {
              this.servico.getListaBairros()[x].taxa = r.taxa_entrega;
              this.servico.getListaBairros()[x].distancia = r.rows[0].elements[0].distance.text;
              this.servico.getListaBairros()[x].duracao = r.rows[0].elements[0].duration.text;
              const txe = r.taxa_entrega.toString().replace('.', ',');
              this.form.controls.taxaentrega.setValue(txe);
              this.servcard.setTaxaEntrega(parseFloat(txe));
              this.servico.getDadosEmpresa().taxa_entrega = parseFloat(txe);
              this.taxaEntregadorText = r.taxa_entrega;

              return;
            }
          }
        }
      };
      this.statusLoaderTaxa = true;
      const data = { cidadeNome, coordendasBairro };
      this.crud.post_api('calc_taxa', fcallb, data);
    } catch (e) {
      console.error(e);
      this.servico.mostrarMensagem('Não foi possível calcular a taxa de entrega. Tente cadastrar uma nova entrega novamente.');
    }
  }

  onclickEntregaTipo() {
    if (this.servico.getDadosEmpresa().formasfuncionamento.tipo === '2') {
      // Verifica as formas de servico da empresa
      this.servico.mostrarMensagem('Este estabelecimento só aceita pedidos para retirada');
      return;
    }
    this.servcard.setTaxaEntrega(this.taxaEntregadorText);
    this.servcard.setTipoPedido('entrega');
    // this.actionsheet.hide();
    // this.alertapp();
  }

  onClickEditarvalorFp(element) {
    const dialogRef = this.dialog.open(ValorItemPagamentoComponent, {
      width: '250px',
      data: { element }
    });

    dialogRef.afterClosed().subscribe(result => {

      // tslint:disable-next-line: prefer-for-of
      for (let x = 0; x < this.servcard.getCarrinho().formasPagamento.length; x++) {
        if (this.servcard.getCarrinho().formasPagamento[x].referencia === result.element.referencia) {
          this.servcard.getCarrinho().formasPagamento[x].valor = result.valor;
        }
      }
    }
    );

  }


  openBottomSheet(tipo): void {
    if (tipo === 'formapagamento' && this.stand) {
      this.servico.mostrarMensagem('O tipo de pagamento está stand-by');
      return;
    }

    this.servcard.setTipoSheet(tipo, this.bottomSheet);
    this.bottomSheet.open(SelecionarFormaPagComponent);
  }

}
