import { ServicoService } from './../../../servico.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CadastroPedidoService {

  private tipoPedido = {entrega: 'entrega', retirada: 'retirada'};
  private formadepagamento = {dinheiro: 'dinheiro', cartao: {nome: 'cartao', cartoes: []}};

  private carrinho = {
    id_empresa: false,
    cliente: '',
    itens: [],
    subtotal: '',
    origempedido: '',
    formapagamento: {tipo: '', troco: 0, nome: 'false'},
    desconto: 0,
    cupom: {},
    total: 0,
    total_pedido: 0,
    taxaentrega: 0,
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

  constructor(private servico: ServicoService) { }

  setCadastroClienteLista(cliente: any) { this.cadastroClienteLista = cliente; }
  getCadastroClienteLista() { return this.cadastroClienteLista; }

  setSubtotal(valor: any) { this.carrinho.subtotal = valor; }


  setEmpresaCarrinho(empresa: any) {
    this.carrinho.empresa.id = empresa.id;
    this.carrinho.empresa.imagem = empresa.imagem;
    this.carrinho.empresa.nome = empresa.nome;
    this.carrinho.empresa.telefone = empresa.telefone;
  }

  setOrigemPedido(origem) { this.carrinho.origempedido = origem; this.bottomSheet.dismiss(); }
  getOrigemPedido() { this.bottomSheet.dismiss(); return this.carrinho.origempedido;  }

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

  limparCarrinho() {
    this.carrinho.itens = [];
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

  getFPUsuario() {
    return this.carrinho.formapagamento;
  }
  setFormaPag(fp: any) {
    this.carrinho.formapagamento.tipo = fp.tipo;
    this.carrinho.formapagamento.nome = fp.nome;
    this.carrinho.formapagamento.troco = fp.troco;
    console.log(this.carrinho);
  }

  getCarrinho() {
    return this.carrinho;
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
    this.carrinho.itens.forEach(element => {
      total += element.total;
    });
    return total;
  }

  getTotalCarrinho(): number {
    let total = 0;
    let res = 0;
    this.carrinho.itens.forEach(element => {
      total += element.total;
    });
    // Calcular com desconto
    total = total - this.carrinho.desconto;
    // Calcular com taxa de entrega
    res =  total + this.carrinho.taxaentrega;
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
    this.setTaxaEntrega(this.servico.getDadosEmpresa().taxa_entrega);
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


onclickFPDinheiro() {

  if (this.servico.getDadosEmpresa().formaspagamento[0].disponivel === false) {
    // Verifica as formas de pagamento da empresa
    this.servico.mostrarMensagem('Este estabelecimento não aceita pagamento em dinheiro');
    return;
    }

  this.bottomSheet.dismiss();
  this.setFormaPag({tipo: 'dinheiro', nome: 'dinheiro', troco: ''});
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



}
