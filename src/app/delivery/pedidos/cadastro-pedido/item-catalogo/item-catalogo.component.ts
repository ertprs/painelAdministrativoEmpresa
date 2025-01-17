import { CadastroPedidoService } from './../cadastro-pedido.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogAddMototboyComponent } from 'src/app/dialog-add-mototboy/dialog-add-mototboy.component';

@Component({
  selector: 'app-item-catalogo',
  templateUrl: './item-catalogo.component.html',
  styleUrls: ['./item-catalogo.component.css']
})
export class ItemCatalogoComponent implements OnInit {

  itemCatalogo: {
    prev_preco: boolean, nome: '', imagem: '', descricao: '', categoriaadicional: any, preco: number, total: number, qnt: number
    , adicionais: any, observacao: string, preconormal: number
  };
  statusLoadItem = false;
  imagem = 'no.png';
  statusAdd = false;
  observacaoUsuario: string;
  itemAdicionais = true;
  private statusEstoqueItem = true;

  constructor(public servico: ServicoService, private crud: CrudServicoService, public dialogRef: MatDialogRef<DialogAddMototboyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private servcard: CadastroPedidoService) { }

  ngOnInit(): void {
    this.consultaItem(this.data.id);
  }


  consultaItem(id) {
    // console.log('#consultaEntregas');
    this.crud.get_api('consulta_item_cardapio_cliente&id_item=' + id + '&id_empresa=' +
      this.servico.getDadosEmpresa().id).subscribe(data => {
        // console.log(data);
        /* Verifica se o item tem adicionais */

        this.statusEstoqueItem = data.item_estoque.status_estoque;
        this.itemCatalogo = data.item;
        this.itemCatalogo.qnt = 1;
        this.itemCatalogo.total = this.itemCatalogo.preco;
        this.statusLoadItem = true;

        this.itemCatalogo.observacao = ''; // info do cliente
        this.itemCatalogo.adicionais = []; // info do cliente
        if (!this.itemCatalogo.preco) { this.itemCatalogo.preco = 0; }
        this.itemCatalogo.preconormal = this.itemCatalogo.preco; // preco do item mesmo com as alteracoes de valores do usuario
        this.itemCatalogo.total = this.itemCatalogo.preco;

        try {
          this.itemCatalogo.categoriaadicional.forEach(element => {
            if (element.status === true) {
              this.itemAdicionais = false;
            }
          });
        } catch (e) { console.error(e); }

      });
  }

  onclickAltQntADD() {
    console.log(this.itemCatalogo);
    if (!this.itemAdicionais) {
      this.servico.mostrarMensagem('Opção indisponível para itens com adicionais');
      return;
    }

    this.itemCatalogo.qnt += 1;
    let res = 0;
    res = this.itemCatalogo.preco + this.getTotalAdicionais();
    res = res * this.itemCatalogo.qnt;
    this.itemCatalogo.total = res;
    this.servcard.getCarrinho().formasPagamento = [];
  }
  onclickAltQntSUB() {
    if (this.itemCatalogo.qnt === 1) { return; }
    this.itemCatalogo.qnt -= 1;
    let res = 0;
    res = this.itemCatalogo.preco + this.getTotalAdicionais();
    this.itemCatalogo.total = res * this.itemCatalogo.qnt;
    this.servcard.getCarrinho().formasPagamento = [];
  }
  onclickAddAdc(item: any, categoria: any) {


    const categoriaItem = this.procuraItemArray(this.itemCatalogo.categoriaadicional, categoria, 'id');
    const itemarray = this.procuraItemArray(this.itemCatalogo.adicionais, item, 'id');

    if (categoriaItem.qntadd === categoria.maxsele && categoria.maxsele !== 0) {
      // console.warn('O máximo geral itens dessa categoria já foi adicionado.');
      // ons.notification.toast('Você já adicionou a quantidade máxima de adicionais.', {timeout: 2000});
      this.servico.mostrarMensagem('Você já adicionou a quantidade máxima de adicionais.');
      return;
    }
    if (itemarray === false) {
      // adiciona o item quando ele não existe na array de adicionais
      item.qnt = 1;
      if (!categoria.qntadd) { categoriaItem.qntadd = 1; } else { categoriaItem.qntadd++; }
      //  categoria.qntadd = 1;

      this.itemCatalogo.adicionais.push(item);
    } else {
      // Verifica  a quantidade de itens que pode adicionar para esta cat
      if (itemarray.qnt === categoriaItem.qnt_adc_item) {
        // console.warn('O máximo itens dessa categoria já foi adicionado.');
        // ons.notification.toast(`Você só pode adicionar até ${categoriaItem.qnt_adc_item} desta categoria`, {timeout: 2000});
        this.servico.mostrarMensagem(`Você só pode adicionar até ${categoriaItem.qnt_adc_item} desta categoria`);
        return;
      }
      itemarray.qnt++;
      categoriaItem.qntadd++;

    }

    // Se o adicional for da categoria de PREVALECER por MAIOR PRECO nao soma os preço,
    // mas verifica qual o adicional mais caro esta selecionado
    // console.log(categoriaItem);
    if (categoriaItem.prevalecer_preco) {
      // Cria uma propriedade para informar que esse item usar adicionais para prevalecer maior preco
      this.itemCatalogo.prev_preco = true;
      // Verifica na lista de adicionais e adiciona o que tem o preço maior
      // console.log('Verifica na lista de adicionais e adiciona o que tem o preço maior');
      this.itemCatalogo.adicionais.forEach(element => {
        // console.log('entra no loop');
        if (item.preco > element.preco && item.preco > this.itemCatalogo.total) {
          this.itemCatalogo.total = item.preco;
          // tslint:disable-next-line: radix
        } else {
          if (this.itemCatalogo.total < item.preco) { this.itemCatalogo.total = item.preco; }
        }
      });
    } else {
      this.itemCatalogo.total += item.preco;
    }

  }

  onclickRemoveAdc(item: any, categoria: any) {
    if (item.qnt === 0) { return; }
    const categoriaItem = this.procuraItemArray(this.itemCatalogo.categoriaadicional, categoria, 'id');
    const itemarray = this.procuraItemArray(this.itemCatalogo.adicionais, item, 'id');
    itemarray.qnt--;
    categoriaItem.qntadd--;
    // this.itemCatalogo.total -= item.preco;

    // remove o item da array
    for (const x in this.itemCatalogo.adicionais) {
      if (this.itemCatalogo.adicionais[x] === itemarray && itemarray.qnt === 0) {
        // console.log('Remove este item!');
        this.itemCatalogo.adicionais.splice(x, 1); // remove do array
      }
    }

    // Verifica os precos dos adicionais
    if (categoriaItem.prevalecer_preco) {
      let adicionaPreco = 0;
      this.itemCatalogo.adicionais.forEach(element => {
        if (element.preco > adicionaPreco) { adicionaPreco = element.preco; }
      });
      this.itemCatalogo.total = adicionaPreco;
      if (adicionaPreco < this.itemCatalogo.preco) { this.itemCatalogo.total = this.itemCatalogo.preco; }
    } else {
      this.itemCatalogo.total -= item.preco;
    }

  }






  vericaCatObrigatorio() {
    let status = false;
    let qntt = 0;
    const itensErro = [];
    let msgErro = '';

    try {

      this.itemCatalogo.categoriaadicional.forEach((element) => {
        if (element.obrigatorio === true) {
          // esta categoria é obrigatoria
          // verifica se o usuario ja adicionou alguma
          if (element.qntadd && element.qntadd > 0) {
            // console.log('Categoria OK');
            // console.log(element);
          } else {
            // console.error('Categoria ERRO =>');
            itensErro.push(element);
            qntt++;
            msgErro = 'Verifique os itens obrigatótios nos adicionais';
          }

          if (element.minsele > 0 && element.qntadd < element.minsele) {
            //console.error('Não foi selecionado a quantidade mínima');
            msgErro = 'Você deve selecionar pelo menos ' + element.minsele + ' itens da categoria ' + element.nome;
            itensErro.push(element);
            qntt++;
          }

        }
      });
    } catch (e) { qntt = 0; }

    if (qntt > 0) { status = true; } else { status = false; }

    const resultado = {
      status,
      itensErro,
      qntt,
      msgErro
    };

    return resultado;

  }



  onclickAddCar(obs) {
    if (this.statusAdd === true) { return; }
    if (this.statusEstoqueItem === false) {
      this.servico.mostrarMensagem('Item sem estoque');
      return;
    }

    const x = this.vericaCatObrigatorio();
    if (x.status === true) {
      this.servico.mostrarMensagem(x.msgErro);
      return;
    }
    this.statusAdd = true;
    this.itemCatalogo.observacao = obs;
    // console.log(this.item);
    const r = this.servcard.addItemCarrinho(this.itemCatalogo);
    if (r) {
      this.servico.mostrarMensagem('Item adicionado ao carrinho!');
      this.dialogRef.close();
    }
    setTimeout(() => { this.statusAdd = false; }, 800);
  }

  procuraItemArray(array: any, itemprocurar: any, nomeindexarray: string): any {
    try {
      let itemretorno = false;
      array.forEach((element, key) => {
        if (element.id === itemprocurar[nomeindexarray]) { element.indexkey = key; itemretorno = element; }
      });
      return itemretorno;
    } catch (e) { console.log('Item não encontrado na array...'); }
  }

  getTotalAdicionais(): number {
    let total = 0;
    this.itemCatalogo.adicionais.forEach(element => {
      // console.log(element);
      total += element.preco;
    });
    return total;
  }

}
