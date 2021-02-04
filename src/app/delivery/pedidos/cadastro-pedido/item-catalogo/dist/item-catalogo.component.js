"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ItemCatalogoComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var ItemCatalogoComponent = /** @class */ (function () {
    function ItemCatalogoComponent(servico, crud, dialogRef, data, servcard) {
        this.servico = servico;
        this.crud = crud;
        this.dialogRef = dialogRef;
        this.data = data;
        this.servcard = servcard;
        this.statusLoadItem = false;
        this.imagem = 'no.png';
        this.statusAdd = false;
    }
    ItemCatalogoComponent.prototype.ngOnInit = function () {
        this.consultaItem(this.data.id);
    };
    ItemCatalogoComponent.prototype.consultaItem = function (id) {
        var _this = this;
        // console.log('#consultaEntregas');
        this.crud.get_api('consulta_item_cardapio_cliente&id_item=' + id + '&id_empresa=' +
            this.servico.getDadosEmpresa().id).subscribe(function (data) {
            // console.log(data);
            _this.itemCatalogo = data.item;
            _this.itemCatalogo.qnt = 1;
            _this.itemCatalogo.total = _this.itemCatalogo.preco;
            _this.statusLoadItem = true;
            _this.itemCatalogo.observacao = ''; // info do cliente
            _this.itemCatalogo.adicionais = []; // info do cliente
            if (!_this.itemCatalogo.preco) {
                _this.itemCatalogo.preco = 0;
            }
            _this.itemCatalogo.preconormal = _this.itemCatalogo.preco; // preco do item mesmo com as alteracoes de valores do usuario
            _this.itemCatalogo.total = _this.itemCatalogo.preco;
        });
    };
    ItemCatalogoComponent.prototype.onclickAltQntADD = function () {
        this.itemCatalogo.qnt += 1;
        var res = 0;
        res = this.itemCatalogo.preco + this.getTotalAdicionais();
        res = res * this.itemCatalogo.qnt;
        this.itemCatalogo.total = res;
        this.servcard.getCarrinho().formasPagamento = [];
    };
    ItemCatalogoComponent.prototype.onclickAltQntSUB = function () {
        if (this.itemCatalogo.qnt === 1) {
            return;
        }
        this.itemCatalogo.qnt -= 1;
        var res = 0;
        res = this.itemCatalogo.preco + this.getTotalAdicionais();
        this.itemCatalogo.total = res * this.itemCatalogo.qnt;
        this.servcard.getCarrinho().formasPagamento = [];
    };
    ItemCatalogoComponent.prototype.onclickAddAdc = function (item, categoria) {
        var _this = this;
        var categoriaItem = this.procuraItemArray(this.itemCatalogo.categoriaadicional, categoria, 'id');
        var itemarray = this.procuraItemArray(this.itemCatalogo.adicionais, item, 'id');
        if (categoriaItem.qntadd === categoria.maxsele && categoria.maxsele !== 0) {
            // console.warn('O máximo geral itens dessa categoria já foi adicionado.');
            // ons.notification.toast('Você já adicionou a quantidade máxima de adicionais.', {timeout: 2000});
            this.servico.mostrarMensagem('Você já adicionou a quantidade máxima de adicionais.');
            return;
        }
        if (itemarray === false) {
            // adiciona o item quando ele não existe na array de adicionais
            item.qnt = 1;
            if (!categoria.qntadd) {
                categoriaItem.qntadd = 1;
            }
            else {
                categoriaItem.qntadd++;
            }
            //  categoria.qntadd = 1;
            this.itemCatalogo.adicionais.push(item);
        }
        else {
            // Verifica  a quantidade de itens que pode adicionar para esta cat
            if (itemarray.qnt === categoriaItem.qnt_adc_item) {
                // console.warn('O máximo itens dessa categoria já foi adicionado.');
                // ons.notification.toast(`Você só pode adicionar até ${categoriaItem.qnt_adc_item} desta categoria`, {timeout: 2000});
                this.servico.mostrarMensagem("Voc\u00EA s\u00F3 pode adicionar at\u00E9 " + categoriaItem.qnt_adc_item + " desta categoria");
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
            this.itemCatalogo.adicionais.forEach(function (element) {
                // console.log('entra no loop');
                if (item.preco > element.preco && item.preco > _this.itemCatalogo.total) {
                    _this.itemCatalogo.total = item.preco;
                    // tslint:disable-next-line: radix
                }
                else {
                    if (_this.itemCatalogo.total < item.preco) {
                        _this.itemCatalogo.total = item.preco;
                    }
                }
            });
        }
        else {
            this.itemCatalogo.total += item.preco;
        }
    };
    ItemCatalogoComponent.prototype.onclickRemoveAdc = function (item, categoria) {
        if (item.qnt === 0) {
            return;
        }
        var categoriaItem = this.procuraItemArray(this.itemCatalogo.categoriaadicional, categoria, 'id');
        var itemarray = this.procuraItemArray(this.itemCatalogo.adicionais, item, 'id');
        itemarray.qnt--;
        categoriaItem.qntadd--;
        // this.itemCatalogo.total -= item.preco;
        // remove o item da array
        for (var x in this.itemCatalogo.adicionais) {
            if (this.itemCatalogo.adicionais[x] === itemarray && itemarray.qnt === 0) {
                // console.log('Remove este item!');
                this.itemCatalogo.adicionais.splice(x, 1); // remove do array
            }
        }
        // Verifica os precos dos adicionais
        if (categoriaItem.prevalecer_preco) {
            var adicionaPreco_1 = 0;
            this.itemCatalogo.adicionais.forEach(function (element) {
                if (element.preco > adicionaPreco_1) {
                    adicionaPreco_1 = element.preco;
                }
            });
            this.itemCatalogo.total = adicionaPreco_1;
            if (adicionaPreco_1 < this.itemCatalogo.preco) {
                this.itemCatalogo.total = this.itemCatalogo.preco;
            }
        }
        else {
            this.itemCatalogo.total -= item.preco;
        }
    };
    ItemCatalogoComponent.prototype.vericaCatObrigatorio = function () {
        var status = false;
        var qntt = 0;
        var itensErro = [];
        var msgErro = '';
        try {
            this.itemCatalogo.categoriaadicional.forEach(function (element) {
                if (element.obrigatorio === true) {
                    // esta categoria é obrigatoria
                    // verifica se o usuario ja adicionou alguma
                    if (element.qntadd && element.qntadd > 0) {
                        // console.log('Categoria OK');
                        // console.log(element);
                    }
                    else {
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
        }
        catch (e) {
            qntt = 0;
        }
        if (qntt > 0) {
            status = true;
        }
        else {
            status = false;
        }
        var resultado = {
            status: status,
            itensErro: itensErro,
            qntt: qntt,
            msgErro: msgErro
        };
        return resultado;
    };
    ItemCatalogoComponent.prototype.onclickAddCar = function (obs) {
        var _this = this;
        if (this.statusAdd === true) {
            return;
        }
        var x = this.vericaCatObrigatorio();
        if (x.status === true) {
            this.servico.mostrarMensagem(x.msgErro);
            return;
        }
        this.statusAdd = true;
        this.itemCatalogo.observacao = obs;
        // console.log(this.item);
        var r = this.servcard.addItemCarrinho(this.itemCatalogo);
        if (r) {
            this.servico.mostrarMensagem('Item adicionado ao carrinho!');
            this.dialogRef.close();
        }
        setTimeout(function () { _this.statusAdd = false; }, 800);
    };
    ItemCatalogoComponent.prototype.procuraItemArray = function (array, itemprocurar, nomeindexarray) {
        try {
            var itemretorno_1 = false;
            array.forEach(function (element, key) {
                if (element.id === itemprocurar[nomeindexarray]) {
                    element.indexkey = key;
                    itemretorno_1 = element;
                }
            });
            return itemretorno_1;
        }
        catch (e) {
            console.log('Item não encontrado na array...');
        }
    };
    ItemCatalogoComponent.prototype.getTotalAdicionais = function () {
        var total = 0;
        this.itemCatalogo.adicionais.forEach(function (element) {
            // console.log(element);
            total += element.preco;
        });
        return total;
    };
    ItemCatalogoComponent = __decorate([
        core_1.Component({
            selector: 'app-item-catalogo',
            templateUrl: './item-catalogo.component.html',
            styleUrls: ['./item-catalogo.component.css']
        }),
        __param(3, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], ItemCatalogoComponent);
    return ItemCatalogoComponent;
}());
exports.ItemCatalogoComponent = ItemCatalogoComponent;
