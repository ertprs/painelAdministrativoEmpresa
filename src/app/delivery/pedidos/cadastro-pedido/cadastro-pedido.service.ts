import { ServicoService } from './../../../servico.service';
import { Injectable, EventEmitter } from '@angular/core';

export interface ItemPagamento {
  referencia: number;
  id: number;
  nome: string;
  valor: string;
  itens: string;
  valorIn: [any];
}

@Injectable({
  providedIn: 'root'
})


export class CadastroPedidoService {


  selectedIndex: 0;

  iniciaFormCadastro = new EventEmitter<any>();
  funcaoEmitter = new EventEmitter<any>();
  selecionarCartao = new EventEmitter<any>();

  private tipoPedido = {entrega: 'entrega', retirada: 'retirada'};
  private formadepagamento = {dinheiro: 'dinheiro', cartao: {nome: 'cartao', cartoes: []}};
  private carrinho = {
    id_pedido: 0,
    id_empresa: false,
    statusAcaoPedido: false, // false = ADD PEDIDO , TRUE == Editar pedido
    cliente: '',
    itens: [],
    subtotal: '',
    origempedido: false,
    status_pedido: 1,
    formasPagamento: [],
    formapagamento: {tipo: '', troco: 0, nome: 'false'},
    item_pagamento: {id: '', nome: '', status: false},
    desconto: 0,
    cupom: {},
    total: 0,
    total_pedido: 0,
    taxaentrega: 0,
    taxaextra: 0,
    tipopedido: 'false',
    endereco: {
      rua: '',
      numero: {},
      bairro: {},
      complemento: '',
      cidade: {},
      estado: '',
      pais: 'Brasil',
      latitude: '',
      longetude: '',
      tiporesidencia: ''
    },
    empresa: {
      id: '',
      imagem: '',
      nome: '',
      telefone: '',
    }
  };
  tiposheet: any;
  bottomSheet: any;
  cadastroClienteLista: any;
  contaddFps = 0;
  taxaEntregaAltManual = 0;

  constructor(private servico: ServicoService) { }

  addFp(item: ItemPagamento) {
    try {
    this.contaddFps++;
    item.referencia = this.contaddFps;

    const statusadd = false;
    this.carrinho.formasPagamento.forEach(element => {
      if (element.id === item.id) {
        // statusadd = true;
      }
    });
    const fp = Object.assign({}, item);
    if (!statusadd) { this.carrinho.formasPagamento.push(fp); }
    console.log(this.carrinho.formasPagamento);
  } catch (e) {
    console.log(e);
    console.log('Não foi possível calcular as fps.');
  }
  }

  setTaxaManual(taxa: number) {
    this.taxaEntregaAltManual = taxa;
  }

  removeItemFp(item: any) {
    let indeArray: any;
    for (const x in this.carrinho.formasPagamento) {
      if (this.carrinho.formasPagamento[x] === item) {
        indeArray = x;
      }
    }
    this.carrinho.formasPagamento.splice(indeArray, 1);
  }

  setIdPedido(idPedido: number) {
    this.carrinho.id_pedido = idPedido;
  }

  setStatusAcaoPedido(status: boolean) {
    this.carrinho.statusAcaoPedido = status;
  }
  getStatusAcaoPedido(): boolean {
    return this.carrinho.statusAcaoPedido;
  }


  setSelectedIndex(index) { this.selectedIndex = index;  }
  getSelectedIndex() { return this.selectedIndex;  }

  setCadastroClienteLista(cliente: any) { this.cadastroClienteLista = cliente; }
  getCadastroClienteLista() { return this.cadastroClienteLista; }

  setSubtotal(valor: any) { this.carrinho.subtotal = valor; }


  setEmpresaCarrinho(empresa: any) {
    this.carrinho.empresa.id = empresa.id;
    this.carrinho.empresa.imagem = empresa.imagem;
    this.carrinho.empresa.nome = empresa.nome;
    this.carrinho.empresa.telefone = empresa.telefone;
  }

  setOrigemPedido(origem) { 
    this.carrinho.origempedido = origem;
    try {
      this.bottomSheet.dismiss();
      } catch (e) {  }
  }
  getOrigemPedido() {
    try {
    this.bottomSheet.dismiss();
    } catch (e) {  }
    return this.carrinho.origempedido;
  }

  setIdEmpresaCar(id) {
    this.carrinho.id_empresa = id;
  }
  getIdEmpresaCar() {
    return this.carrinho.id_empresa;
  }

  setTipoPedido(tipo: string) {// entrega ou retirada
    this.carrinho.tipopedido = tipo;
  }

  setCliente(id: any) {
    this.carrinho.cliente = id;
  }

  setCupomCarrinho(cupom: any) {
    this.carrinho.cupom = cupom;
  }

  setDescontoCarrinho(valor: number) {
    this.carrinho.desconto = valor;
  }
  getDescontoCarrinho() {
    return this.carrinho.desconto;
  }

  getFalta(): number {
    let total = 0;
    total = this.getTotalFP() - this.getTotalCarrinho();
    if (total > 0) { total = 0; }
    return total;
  }

  limparCarrinho() {
    console.log('Limpa carrinho');
    this.carrinho.itens = [];
    this.carrinho.formasPagamento = [];
    this.carrinho.taxaextra = 0;
    this.carrinho.taxaentrega = 0;
    this.carrinho.origempedido = false;
    this.carrinho.total = 0;
    this.carrinho.total_pedido = 0;
    this.carrinho.subtotal = '';
    this.carrinho.desconto = 0;
    this.carrinho.cliente = '';
    this.carrinho.tipopedido = 'false';
    this.carrinho.statusAcaoPedido = false;
    this.carrinho.id_pedido = 0;
    this.taxaEntregaAltManual = 0;
  }

  getTipoPedido() {
    return this.carrinho.tipopedido;
  }

  setCidadeEnderecoEntrega(nome: string) {
    this.carrinho.endereco.cidade = nome;
    console.log(this.carrinho);
  }

  setBairroEnderecoEntrega(nome: string) {
    this.carrinho.endereco.bairro = nome;
  }

  setEnderecoEntrega(endereco: any) {
    this.carrinho.endereco = endereco;
    console.log(this.carrinho);
  }

  getEnderecoEntrega() {
    return this.carrinho.endereco;
  }

  setItensEndereco(form: {rua, numero, complemento, tiporesidencia}) {
    this.carrinho.endereco.rua = form.rua;
    this.carrinho.endereco.numero = form.numero;
    this.carrinho.endereco.complemento = form.complemento;
    this.carrinho.endereco.tiporesidencia = form.tiporesidencia;
    console.warn('Endereço salvo');
    console.log(this.carrinho.endereco);
  }

  getStatusEndereco(): boolean {
    if (!this.carrinho.endereco.cidade) { return false; }
    if (!this.carrinho.endereco.bairro) { return false; }
    if (!this.carrinho.endereco.rua) { return false; }
    if (!this.carrinho.endereco.numero) { return false; }
    if (!this.carrinho.endereco.complemento) { return false; }
    return true;
  }

  getConfigTipoPedido() {
    return this.tipoPedido;
  }
  getFP() {
    return this.formadepagamento;
  }

  getTotalFP() {
    let total = 0;
    this.carrinho.formasPagamento.forEach(element => {
      total += parseFloat( element.valor );
    });
    return total;
  }

  getFPUsuario() {
    return this.carrinho.formapagamento;
  }
  setFormaPag(fp: any) {
    this.carrinho.formapagamento.tipo = fp.tipo;
    this.carrinho.formapagamento.nome = fp.nome;
    this.carrinho.formapagamento.troco = fp.troco;
    console.log(this.carrinho);
  }

  setTroco(valor: number) {
    this.carrinho.formapagamento.troco = valor;
  }

  getCarrinho() {
    return this.carrinho;
  }

  getTaxaExtra(): number {
    const taxa = this.carrinho.taxaextra.toString();
    let te = parseFloat(taxa);
    if (!te) { te =  0; }
    return te;
  }

  getQntItensCar(): number {
    return this.carrinho.itens.length;
  }

  setTaxaEntrega(valor: number) {
    if (!valor) { valor = 0; }
    this.carrinho.taxaentrega = valor;
  }

  getTaxaEntrega(): number {
   return this.carrinho.taxaentrega;
  }

  addItemCarrinho(item: any) {
    if (!item) { console.error('Erro ao tentar adicionar o item ao carrinho!'); return false; }
    this.alteraValorCarrinhoSOMA(item.preco);
    this.carrinho.itens.push(item);

    let indexitemarray = 0;
    for (let x = 0; x < this.carrinho.itens.length; x++) {
      indexitemarray = x;
    }
    console.log(indexitemarray);
    this.carrinho.itens[indexitemarray].indiceitemarray = indexitemarray;
    // alert('Item adicionado com sucesso');
    console.log(this.carrinho);
    return true;
  }

  getItensCarrinho() {
    return this.carrinho.itens;
  }

  getSubTotalCarrinho(): number {
    let total = 0;
    try {
    this.carrinho.itens.forEach(element => {
      total += element.total;
    });
    } catch (e) { console.log(e); }
    return total;
  }

  getTotalCarrinho(): number {
    let total = 0;
    let res = 0;
    try {
    this.carrinho.itens.forEach(element => {
      total += element.total;
    });
    } catch(e) { console.log(e);  console.log(this.carrinho); }
    // Calcular com desconto
    total = total - this.carrinho.desconto;
    // Calcular com taxa de entrega
    res =  total + this.getTaxaEntrega();
     // Calcula com taxa extra
    res += this.getTaxaExtra();
    if (res < 0) { res = 0; }
    return res;
  }


  private alteraValorCarrinhoSOMA(valor: any) {
    if (!valor) { valor = 0; }
    this.carrinho.total += parseFloat(valor);
  }
  private alteraValorCarrinhoSUB(valor: any) {
    if (!valor) { valor = 0; }
    this.carrinho.total -= parseFloat(valor);
  }

  removeItemCar(item: any) {
    let indeArray: any;
    for (const x in this.carrinho.itens) {
      if (this.carrinho.itens[x] === item) {
        indeArray = x;
      }
    }
    this.carrinho.itens.splice(indeArray, 1);
  }

  atualizaItem(item, indiceitemarray) {
    console.log('#atualizaItem');
    console.log(indiceitemarray);
    console.log('===========');

    for (const x in this.carrinho.itens) {
      if (this.carrinho.itens[x].indiceitemarray === indiceitemarray) {
        this.carrinho.itens[x] = item;
        console.log('Att item');
        console.log(item);
      }
    }
  }

  atualizaTotalComTaxa() {
    // funcao é chamada somente quando for para enviar o pedido para o servidor
    this.carrinho.total_pedido = this.getTotalCarrinho();
  }


  setTipoSheet(tipo, bottomSheet) {
    this.tiposheet = tipo;
    this.bottomSheet = bottomSheet;
  }

  getTipoSheet() {
    return this.tiposheet;
  }

  onclickEntregaTipo() {
    if (this.servico.getDadosEmpresa().formasfuncionamento.tipo === '2') {
    // Verifica as formas de servico da empresa
      this.servico.mostrarMensagem('O estabelecimento só aceita pedidos para retirada');
      return;
    }

    // Se a taxa de entrega foi alterada manualmente nao altera pela taxa do bairro
    if (!this.taxaEntregaAltManual) {
      this.setTaxaEntrega(this.servico.getDadosEmpresa().taxa_entrega);
    } else {
      this.setTaxaEntrega(this.taxaEntregaAltManual);
    }
    this.setTipoPedido(this.getConfigTipoPedido().entrega);

    this.bottomSheet.dismiss();
    setTimeout( () => { this.servico.mostrarMensagem('Pedido para entrega'); }, 700 );
  }

  onclickRetiradaTipo() {
  if (this.servico.getDadosEmpresa().formasfuncionamento.tipo === '1') {
    // Verifica as formas de servico da empresa
      this.servico.mostrarMensagem('O estabelecimento só aceita pedidos para entrega');
      return;
    }
  this.setTaxaEntrega(0);
  this.setTipoPedido('retirada');
  this.bottomSheet.dismiss();
  setTimeout( () => { this.servico.mostrarMensagem('Pedido para retirada'); }, 700 );
}

onClickFp(item) {
  // if (item.nome === 'Dinheiro' || item.nome === 'dinheiro') { this.onclickFPDinheiro(item); }
  // if (item.nome === 'cartao' || item.nome === 'Cartão') { this.onclickFPCartao(); }
  /*if (item.nome === 'Fiado' || item.nome === 'Fiado') {
    this.carrinho.item_pagamento.status = false;
   }
  */
  this.addFp(item);
  this.bottomSheet.dismiss();
  /*
  this.setFormaPag({tipo: item.nome, nome: item.nome, troco: ''});
  setTimeout( () => {
     this.servico.mostrarMensagem('Pagamento selecionado: ' + item.nome);
     if (item.nome === 'Tranferência bancária') {
       console.log('Selecionar o banco');
       this.funcaoEmitter.emit();
      }

     if (item.nome.toLowerCase() === 'cartão'
     || item.nome.toLowerCase() === 'cartão de crédito'
     || item.nome.toLowerCase() === 'cartão de débito'
     || item.nome.toLowerCase() === 'cartão poupança') {
        console.log('Selecionar o banco');
        this.selecionarCartao.emit(item);
       }


    }, 700 );
*/
}

onclickFPDinheiro(item) {
  console.log('onclickFPDinheiro');
  console.log(item);
  if (this.servico.getDadosEmpresa().formaspagamento[0].disponivel === false) {
    // Verifica as formas de pagamento da empresa
    this.servico.mostrarMensagem('Este estabelecimento não aceita pagamento em dinheiro');
    return;
    }

  this.bottomSheet.dismiss();
  this.setFormaPag({tipo: 'dinheiro', nome: 'dinheiro', troco: ''});
  this.carrinho.item_pagamento.status = false;
  setTimeout( () => { this.servico.mostrarMensagem('Pagamento em dinheiro selecionado'); }, 700 );


}


onclickFPCartao() {
  this.bottomSheet.dismiss();

  if (this.servico.getDadosEmpresa().formaspagamento[1].disponivel === false) {
    // Verifica as formas de pagamento da empresa
      this.servico.mostrarMensagem('Este estabelecimento não aceita pagamento em cartão');
      return;
    }

  this.setFormaPag({tipo: 'cartão', nome: 'cartão', troco: ''});
  setTimeout( () => { this.servico.mostrarMensagem('Pagamento com cartão selecionado'); }, 700 );
}

verificaFpsTotal() {
  let total = 0;
  this.carrinho.formasPagamento.forEach(element => {
    total += parseFloat( element.valor );
  });
  return total;
}

verificaFp() {
  // Se existir forma de pagamento selecionada retornar  true
  let statusErro = false;
  this.carrinho.formasPagamento.forEach(element => {
    statusErro = true;
  });
  return statusErro;
}



}



