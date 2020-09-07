"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InicioDeliveryComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var InicioDeliveryComponent = /** @class */ (function () {
    function InicioDeliveryComponent(crud, formBuilder, servico, router, servdelivery) {
        this.crud = crud;
        this.formBuilder = formBuilder;
        this.servico = servico;
        this.router = router;
        this.servdelivery = servdelivery;
    }
    InicioDeliveryComponent.prototype.ngOnInit = function () {
        this.formCadastro = this.formBuilder.group({
            tags: [''],
            pedidomin: [''],
            pedidomax: [''],
            seguimento: [''],
            formasfuncionamento: [''],
            tempoentrega: [''],
            hrfun: [''],
            metodosPagamento: ['']
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
    };
    InicioDeliveryComponent.prototype.consultaCidades = function () {
        var _this = this;
        console.log('#consultaCidades');
        this.crud.get_api('cidades_server').subscribe(function (data) {
            if (data.lista === null) { }
            else {
                _this.listaCidades = data.lista_cidades;
                _this.listaCidadesEntrega = data.lista_cidades_entrega;
            }
        });
    };
    InicioDeliveryComponent.prototype.selectionChangeCidade = function (item) {
        var _this = this;
        console.log('#selectionChangeCidade');
        console.log(item);
        this.cidadeClienteSelecionada = item;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.mensagem);
            }
            else {
                _this.servico.setListaBairros(r);
            }
            console.log(r);
        };
        this.crud.post_api('bairros', accallback, this.cidadeClienteSelecionada);
    };
    InicioDeliveryComponent.prototype.iniciaForm = function () {
        var _this = this;
        this.formCadastro = this.formBuilder.group({
            id: [this.servico.getDadosEmpresa().id],
            tags: [this.dadosEmpresa.tags, forms_1.Validators.required],
            pedidomin: [this.dadosEmpresa.pedidomin, forms_1.Validators.required],
            pedidomax: [this.dadosEmpresa.pedidomax, forms_1.Validators.required],
            seguimento: [this.dadosEmpresa.seguimento, forms_1.Validators.required],
            formasfuncionamento: [''],
            tempoentrega: [this.dadosEmpresa.tempoentrega, forms_1.Validators.required],
            hrfun: this.buildDiasForm(),
            locaisEntrega: this.buildLocaisEntregaForm(),
            metodosPagamento: this.buildFp()
        });
        // async orders
        /*  console.log(this.dadosEmpresa.formasfuncionamento);
         (this.dadosEmpresa.formasfuncionamento).subscribe(orders => {
           this.tipoServico = orders;
           this.formCadastro.controls.formasfuncionamento.patchValue(this.tipoServico[0]);
         });
     */
        if (this.dadosEmpresa.formasfuncionamento) {
            this.tipoServico.forEach(function (element) {
                if (element.tipo === _this.dadosEmpresa.formasfuncionamento.tipo) {
                    _this.formCadastro.controls.formasfuncionamento.patchValue(element);
                }
            });
        }
    };
    InicioDeliveryComponent.prototype.buildDiasForm = function () {
        var _this = this;
        var valores = this.dadosEmpresa.hrfun.map(function (v, i) { return _this.createItem(v); });
        return this.formBuilder.array(valores);
    };
    InicioDeliveryComponent.prototype.createItem = function (data) {
        return this.formBuilder.group({
            nome: data.nome,
            abre: data.abre,
            fecha: data.fecha,
            status: data.status,
            id_nome: data.id_nome
        });
    };
    InicioDeliveryComponent.prototype.buildLocaisEntregaForm = function () {
        var _this = this;
        var valores = this.dadosEmpresa.locais_entrega.map(function (v, i) { return _this.createCidade(v); });
        return this.formBuilder.array(valores);
    };
    InicioDeliveryComponent.prototype.createCidade = function (data) {
        return this.formBuilder.group({
            id: data.id,
            nome: data.nome,
            disponivel: data.disponivel,
            bairros: this.buildBairro(data.bairros)
        });
    };
    InicioDeliveryComponent.prototype.buildBairro = function (data) {
        var _this = this;
        var valores = data.map(function (v, i) { return _this.createBairro(v); });
        return this.formBuilder.array(valores);
    };
    InicioDeliveryComponent.prototype.createBairro = function (data) {
        return new forms_1.FormGroup({
            id: new forms_1.FormControl(data.id),
            cidade_id: new forms_1.FormControl(data.cidade_id),
            nome: new forms_1.FormControl(data.nome),
            disponivel: new forms_1.FormControl(data.disponivel),
            taxa: new forms_1.FormControl(data.taxa)
        });
    };
    InicioDeliveryComponent.prototype.buildFp = function () {
        var _this = this;
        console.log('config forma de pagamento');
        console.log(this.dadosEmpresa.formaspagamento);
        var valores = this.dadosEmpresa.formaspagamento.map(function (v, i) { return _this.createItemFp(v); });
        console.log(valores);
        return this.formBuilder.array(valores);
    };
    InicioDeliveryComponent.prototype.createItemFp = function (data) {
        return new forms_1.FormGroup({
            id: new forms_1.FormControl(data.id),
            nome: new forms_1.FormControl(data.nome),
            descricao: new forms_1.FormControl(data.descricao),
            disponivel: new forms_1.FormControl(data.disponivel),
            itens: this.buildItemFp(data.itens)
        });
    };
    InicioDeliveryComponent.prototype.buildItemFp = function (data) {
        var _this = this;
        try {
            var valores = data.map(function (v, i) { return _this.createFp(v); });
            return this.formBuilder.array(valores);
        }
        catch (e) {
            console.log('????????');
        }
    };
    InicioDeliveryComponent.prototype.createFp = function (data) {
        return new forms_1.FormGroup({
            id: new forms_1.FormControl(data.id),
            id_formapagamento: new forms_1.FormControl(data.id_formapagamento),
            imagem: new forms_1.FormControl(data.imagem),
            nome: new forms_1.FormControl(data.nome),
            disponivel: new forms_1.FormControl(data.disponivel)
        });
    };
    InicioDeliveryComponent.prototype.onclickCadastrar = function () {
        var _this = this;
        console.log('#onclickCadastrar');
        console.log(this.formCadastro);
        console.log(this.formCadastro.value);
        this.btCstatus = true;
        var loginres = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            console.log(r);
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.detalhes);
                _this.btCstatus = false;
            }
            else {
                _this.servico.mostrarMensagem(r.detalhes);
                _this.formcadastroStatus = true;
                _this.router.navigate(['/login']);
            }
        };
        console.log(this.crud.post_api('salva_config_delivery_empresa', loginres, this.formCadastro.value));
    };
    InicioDeliveryComponent.prototype.cadatroFeito = function () {
        this.formcadastroStatus = true;
    };
    InicioDeliveryComponent.prototype.onClickSelecionarCidadeFiltro = function (item) {
        console.log(item);
        this.cidadeSelecionada = item.id;
    };
    InicioDeliveryComponent = __decorate([
        core_1.Component({
            selector: 'app-inicio-delivery',
            templateUrl: './inicio-delivery.component.html',
            styleUrls: ['./inicio-delivery.component.css']
        })
    ], InicioDeliveryComponent);
    return InicioDeliveryComponent;
}());
exports.InicioDeliveryComponent = InicioDeliveryComponent;
