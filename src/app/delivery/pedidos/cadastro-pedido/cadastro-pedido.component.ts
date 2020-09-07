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
  endereco: any;
  statusbt = false;
  cidadeClienteSelecionada: any;
  taxaEntregador: any;
  taxaEntregadorText: any;

  statusLoaderBairros = false;
  statusLoaderTaxa = false;

  constructor(public servico: ServicoService, private crud: CrudServicoService,  private dialog: MatDialog,
              public servcard: CadastroPedidoService, private fb: FormBuilder,
              private bottomSheet: MatBottomSheet, private router: Router) { }

  ngOnInit(): void {
    this.consultaCatalogo();

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
    });

  }

  f1(form) {

    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);

      }
      console.log(r);
    };
    this.crud.post_api('cadatrar_motoboy', accallback, form);
  }

  consultaCatalogo() {

    this.statusLoad = true;
    // console.log('#consultaEntregas');
    this.crud.get_api('cardapio&acmenu=listar').subscribe(data => {
      // console.log(data);
        this.catalogo = data.catalogo;
        this.statusLoad = false;
    });

  }

  onClickItem(item): void {


    const dialogRef = this.dialog.open(ItemCatalogoComponent, {
      width: '550px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {

      }
    });
  }


  onClickFinalizarPedido() {
    console.log(this.form.value);
    console.log(this.servcard.getCarrinho());


    if (this.servcard.getQntItensCar() < 1) { this.servico.mostrarMensagem('O carrinho está vazio!'); return; }
    if (this.servcard.getCarrinho().formapagamento.nome === 'false') {
      this.servico.mostrarMensagem('Selecione a forma de pagamento deste pedido'); return; }
    if (this.servcard.getCarrinho().tipopedido === 'false') {
      this.servico.mostrarMensagem('Selecione a opção do pedido, se é para entrega ou para retirada');
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

    this.servcard.setEmpresaCarrinho(this.servico.getDadosEmpresa());
    this.servcard.setSubtotal(this.servcard.getSubTotalCarrinho());
    this.servcard.getCarrinho().endereco.cidade = this.form.value.cidade;
    this.servcard.getCarrinho().endereco.bairro = this.form.value.bairro;
    this.servcard.setItensEndereco(this.form.value);
    this.servcard.atualizaTotalComTaxa();
    this.statusbt = true;

    console.log('Envia para o backend');
    console.log(this.servcard.getCarrinho());
    this.servcard.limparCarrinho();

    this.servico.mostrarMensagem('Pedido finalizado');
    this.router.navigate(['/painelpedidos/pedidos']);

  }

  selectionChangeCidade(item: any) {
    console.log('#selectionChangeCidade');
    console.log(item);

    this.cidadeClienteSelecionada = item;
    this.statusLoaderBairros = true;

    const accallback = () => {
      console.log('callback');
      this.statusLoaderBairros = false;
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.setListaBairros(r);
      }
      console.log(r);
    };
    this.crud.post_api('bairros', accallback, this.cidadeClienteSelecionada);

  }

  carregaTaxa(itembairro: any) {
    try {
    console.log(itembairro);
    let coordendasBairro = '';
    const cidadeNome = this.cidadeClienteSelecionada.nome;
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
             this.form.controls.taxaentrega.setValue( txe );
             this.servcard.setTaxaEntrega( parseFloat( txe ) );
             this.servico.getDadosEmpresa().taxa_entrega = parseFloat( txe );
             this.taxaEntregadorText = r.taxa_entrega;
             console.log(this.form.value);

             return;
          }
        }
      }
    };
    this.statusLoaderTaxa = true;
    const data = { cidadeNome, coordendasBairro };
    this.crud.post_api('calc_taxa', fcallb, data);
  } catch (e) { this.servico.mostrarMensagem('Não foi possível calcular a taxa de entrega. Tente cadastrar uma nova entrega novamente.'); }
}

onclickEntregaTipo() {
  if (this.servico.getDadosEmpresa().formasfuncionamento.tipo === '2') {
  // Verifica as formas de servico da empresa
    this.servico.mostrarMensagem('Este estabelecimento só aceita pedidos para retirada');
    return;
  }
  this.servcard.setTaxaEntrega(this.taxaEntregadorText );
  this.servcard.setTipoPedido('entrega');
  // this.actionsheet.hide();
  // this.alertapp();
}


openBottomSheet(tipo): void {
  this.servcard.setTipoSheet(tipo, this.bottomSheet);
  this.bottomSheet.open(SelecionarFormaPagComponent);
}

}
