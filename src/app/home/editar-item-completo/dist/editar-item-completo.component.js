"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditarItemCompletoComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditarItemCompletoComponent = /** @class */ (function () {
    function EditarItemCompletoComponent(formBuilder, servhome, servapp, crud, http, route) {
        this.formBuilder = formBuilder;
        this.servhome = servhome;
        this.servapp = servapp;
        this.crud = crud;
        this.http = http;
        this.route = route;
        this.tb1 = ['opcoes', 'status', 'nome', 'nomecategoria', 'preco', 'info', 'datamodificado', 'remover'];
        this.item = { imagem: '', disponibilidade: [], categoriaadicional: [] };
        this.statusLoadConteudo = true;
        this.mostrarJanelaG = false;
        this.statusjanela = false;
        this.urlqr = '';
    }
    EditarItemCompletoComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.imagem = this.servapp.getDadosEmpresa().imagem;
        if (this.servhome.getTipoAcao()) {
            // editar item
            // console.log(' ~~~~~~~~ EDITAR ITEM ~~~~~~~~');
            this.crud.get_api('consulta_item_cardapio&id_empresa=' +
                this.servapp.getDadosEmpresa().id +
                '&id_item=' + this.servhome.getItem().id).subscribe(function (data) {
                // console.log(data);
                _this.itemRequest = data.item;
                _this.imagem = data.item.imagem;
                _this.diasLista = data.item.disponibilidade;
                _this.catsEAdcs = data.item.categoriaadicional;
                _this.categoriasCatalogo = data.item.categoria;
                if (data.item.categoria_nome) {
                    _this.imagensProduto = data.item.categoria_nome;
                }
                _this.form = _this.formBuilder.group({
                    id: [_this.servhome.getItem().id],
                    idcategoria: [''],
                    nome: [_this.itemRequest.nome],
                    descricao: [_this.itemRequest.descricao],
                    esconder: [_this.itemRequest.esconder],
                    esgotado: [_this.itemRequest.esgotado],
                    itemEstoqueRelacionado: [_this.itemRequest.itemEstoqueRelacionado],
                    statusEstoqueRelacionado: [_this.itemRequest.statusEstoqueRelacionado],
                    preco: [_this.itemRequest.preco],
                    id_empresa: [_this.servapp.getDadosEmpresa().id],
                    id_categoria: [_this.servhome.getCategoria().id],
                    categoria_nome: [''],
                    imagem: [_this.imagem],
                    disponibilidade: _this.buildDiasDisponiveis(),
                    categoriaadicional: _this.buildCategoriasEAdicionais(),
                    status_promocao: [_this.itemRequest.status_promocao],
                    desconto: [_this.itemRequest.desconto],
                    categoria: _this.buildCategoriasCardapio(),
                    estoque_mim: [_this.itemRequest.estoque_mim],
                    estoque_med: [_this.itemRequest.estoque_med],
                    quantidade_retira: [_this.itemRequest.quantidade_retira],
                    un_caixa: [_this.itemRequest.un_caixa],
                    un_caixa_pacote: [_this.itemRequest.un_caixa_pacote]
                });
                _this.statusLoadConteudo = false;
            }, function (error) {
                console.log(error);
            });
        }
        else {
            // novo item
            this.diasLista = this.servhome.getItemModel().disponibilidade;
            this.catsEAdcs = this.servhome.getItemModel().categoriaadicional;
            this.categoriasCatalogo = this.servhome.getItemModel().categoria;
            console.log(this.diasLista);
            this.form = this.formBuilder.group({
                id: [''],
                nome: [''],
                descricao: [''],
                esconder: [false],
                esgotado: [false],
                itemEstoqueRelacionado: [false],
                statusEstoqueRelacionado: [false],
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
                un_caixa_pacote: ['']
            });
            //
            setTimeout(function () {
                _this.statusLoadConteudo = false;
            }, 600);
        }
    };
    EditarItemCompletoComponent.prototype.buttonShowQR = function () {
        try {
            if (!this.itemRequest.id) {
                this.servapp.mostrarMensagem('O Código ainda não foi gerado');
                return;
            }
        }
        catch (e) {
            this.servapp.mostrarMensagem('O Código ainda não foi gerado');
            return;
        }
        this.urlqr = this.servapp.urlQrcode + '?item=' + this.itemRequest.id;
        if (!this.statusjanela) {
            this.statusjanela = true;
        }
        else {
            this.statusjanela = false;
        }
    };
    EditarItemCompletoComponent.prototype.removerItem = function (item) {
        var _this = this;
        var accallback = function () {
            var r = _this.servapp.getRespostaApi();
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.mensagem);
            }
            else {
                _this.servapp.mostrarMensagem(r.mensagem);
                _this.route.navigate(['/painel/cardapio']);
            }
        };
        this.crud.post_api('cardapio&acmenu=removerItem', accallback, item, true);
    };
    EditarItemCompletoComponent.prototype.onfcalldelsuc = function (evento) {
        console.log(evento);
        this.mostrarJanelaG = false;
        this.imagensProduto.forEach(function (element) {
            if (element.id === evento.id) {
                element.imagem = evento.imagem;
            }
        });
    };
    EditarItemCompletoComponent.prototype.fecharGaleria = function (event) {
        this.mostrarJanelaG = false;
    };
    EditarItemCompletoComponent.prototype.selecionarSUBIMG = function (item) {
        this.mostrarJanelaG = true;
        this.itemGaleriaSub = item;
    };
    EditarItemCompletoComponent.prototype.addCaixaSubImg = function () {
        var idItem = 1;
        try {
            idItem = this.imagensProduto.length + 1;
        }
        catch (e) {
            idItem = 1;
        }
        var c = { id: idItem, imagem: this.servapp.getDefaultImage(), status: true };
        try {
            this.imagensProduto.push(c);
        }
        catch (e) {
            this.imagensProduto = [c];
        }
    };
    EditarItemCompletoComponent.prototype.rmCaixaimg = function (item) {
        var indeArray;
        for (var x in this.imagensProduto) {
            if (this.imagensProduto[x] === item) {
                indeArray = x;
            }
        }
        this.imagensProduto.splice(indeArray, 1);
    };
    EditarItemCompletoComponent.prototype.selecionarOpt = function (item) {
        this.form.controls.itemEstoqueRelacionado.setValue(item.id);
    };
    EditarItemCompletoComponent.prototype.onClickAddItem = function () {
        var _this = this;
        this.valorSubmit = Object.assign({}, this.form.value);
        this.valorSubmit = Object.assign(this.valorSubmit, {
            disponibilidade: this.valorSubmit.disponibilidade
                .map(function (v, i) { return v ? _this.diasLista[i] : _this.diasLista[i]; })
        });
        this.valorSubmit = Object.assign(this.valorSubmit, {
            categoriaadicional: this.valorSubmit.categoriaadicional
                .map(function (v, i) { return v ? _this.catsEAdcs[i] : _this.catsEAdcs[i]; })
        });
        this.valorSubmit = Object.assign(this.valorSubmit, {
            categoria: this.valorSubmit.categoria
                .map(function (v, i) { return v ? _this.categoriasCatalogo[i] : _this.categoriasCatalogo[i]; })
        });
        console.log(this.valorSubmit);
        if (!this.form.value.nome) {
            alert('Informe o nome do item');
            return;
        }
        // if (!this.form.value.preco) { alert('Informe o preço do item'); return; }
        if (!this.form.value.descricao) {
            alert('Informe a descrição do item');
            return;
        }
        // Se o usuario não selecionar a imagem, envia a imagem da empresa
        if (this.arquivo) {
            this.enviaImagem();
        }
        else {
            this.valorSubmit.imagem = this.imagem;
            this.salvaItemBanco();
        }
    };
    EditarItemCompletoComponent.prototype.enviaImagem = function () {
        var _this = this;
        this.statusLoadConteudo = true;
        var formData = new FormData();
        formData.append('nome_imagem_text', this.arquivo.name);
        formData.append('imagem', this.arquivo);
        this.http.post(this.servapp.getApiAcao('upload_img_galeria'), formData).subscribe(function (data) {
            // logo que enviar a imagem pega o nome da imagem e salva o produto no banco de dados
            _this.valorSubmit.imagem = data.mensagem;
            _this.salvaItemBanco();
        }, function (error) {
            _this.statusLoadConteudo = false;
            alert('Não foi possível enviar a imagem do item');
        });
    };
    EditarItemCompletoComponent.prototype.salvaItemBanco = function () {
        var _this = this;
        console.log('#salvaItemBanco');
        this.valorSubmit.categoria_nome = this.imagensProduto;
        console.log(this.valorSubmit);
        console.log('#------------#');
        this.statusLoadConteudo = true;
        var loginres = function () {
            console.log('callback');
            var r = _this.servapp.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servapp.mostrarMensagem(r.mensagem);
                _this.statusLoadConteudo = false;
            }
            else {
                _this.servapp.mostrarMensagem(r.mensagem);
                _this.statusLoadConteudo = false;
                _this.route.navigate(['/painel/cardapio']);
            }
        };
        if (this.servhome.getTipoAcao()) {
            /*Edita item*/
            this.crud.post_api('att_item_cardapio', loginres, this.valorSubmit);
        }
        else {
            /*Add novo item*/
            this.crud.post_api('add_item_cardapio', loginres, this.valorSubmit);
        }
    };
    EditarItemCompletoComponent.prototype.buildDiasDisponiveis = function () {
        try {
            var valores = this.diasLista.map(function (v) { return new forms_1.FormControl(v.status); });
            return this.formBuilder.array(valores);
        }
        catch (e) {
            this.diasLista = this.servhome.getItemModel().disponibilidade;
            var valores = this.diasLista.map(function (v) { return new forms_1.FormControl(v.status); });
            return this.formBuilder.array(valores);
        }
    };
    EditarItemCompletoComponent.prototype.buildCategoriasEAdicionais = function () {
        var valores = this.catsEAdcs.map(function (v) { return new forms_1.FormControl(v.status); });
        return this.formBuilder.array(valores);
    };
    EditarItemCompletoComponent.prototype.buildCategoriasCardapio = function () {
        var valores = this.categoriasCatalogo.map(function (v) { return new forms_1.FormControl(v.status); });
        return this.formBuilder.array(valores);
    };
    EditarItemCompletoComponent.prototype.inputFile = function (event) {
        var _this = this;
        console.log(this);
        this.arquivo = event.target.files[0];
        console.log(this.arquivo);
        var fileRead = new FileReader();
        fileRead.onloadend = function () {
            _this.imagem = fileRead.result;
        };
        fileRead.readAsDataURL(this.arquivo);
    };
    EditarItemCompletoComponent.prototype.onClickImagemSelecionar = function () {
        document.getElementById('imgInpPROD').click();
    };
    EditarItemCompletoComponent.prototype.onClickObrigatorio = function (event, item) {
        item.obrigatorio = event.checked;
        console.log(item);
    };
    EditarItemCompletoComponent.prototype.onClickPrevPreco = function (event, item) {
        item.prevalecer_preco = event.checked;
        console.log(item);
    };
    EditarItemCompletoComponent.prototype.onClickAdicional = function (event, item) {
        item.status = event.checked;
        console.log(item);
    };
    EditarItemCompletoComponent.prototype.onClickDiaDisponivel = function (event, item) {
        item.status = event.checked;
        console.log(item);
    };
    EditarItemCompletoComponent.prototype.onClickCategoria = function (event, item) {
        item.status = event.checked;
        console.log(item);
    };
    EditarItemCompletoComponent.prototype.onClickItemRelacionado = function (event, item) {
        console.log(event.checked);
        this.form.controls.statusEstoqueRelacionado.setValue(event.checked);
        if (!event.checked) {
            this.form.controls.itemEstoqueRelacionado.setValue(0);
        }
        console.log(item);
    };
    EditarItemCompletoComponent.prototype.onClickCancelar = function () {
        this.route.navigate(['painel/cardapio']);
    };
    EditarItemCompletoComponent = __decorate([
        core_1.Component({
            selector: 'app-editar-item-completo',
            templateUrl: './editar-item-completo.component.html',
            styleUrls: ['./editar-item-completo.component.css']
        })
    ], EditarItemCompletoComponent);
    return EditarItemCompletoComponent;
}());
exports.EditarItemCompletoComponent = EditarItemCompletoComponent;
