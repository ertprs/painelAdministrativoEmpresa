"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PerfilComponent = void 0;
var alterar_senha_component_1 = require("./alterar-senha/alterar-senha.component");
var core_1 = require("@angular/core");
var PerfilComponent = /** @class */ (function () {
    function PerfilComponent(formBuilder, servico, crud, http, dialog) {
        this.formBuilder = formBuilder;
        this.servico = servico;
        this.crud = crud;
        this.http = http;
        this.dialog = dialog;
        this.statusLoadConteudo = false;
        this.statusMudarLogo = false;
        this.statusMudarCapa = false;
        this.statusShowQr = false;
    }
    PerfilComponent.prototype.ini = function () {
        this.formPerfil = this.formBuilder.group({
            nome: [this.servico.getDadosEmpresa().nome],
            capa: [this.servico.getDadosEmpresa().capa],
            telefone: [this.servico.getDadosEmpresa().telefone],
            email: [this.servico.getDadosEmpresa().email],
            senha: [this.servico.getDadosEmpresa().senha],
            rua: [this.servico.getDadosEmpresa().rua],
            bairro: [this.servico.getDadosEmpresa().bairro],
            numero: [this.servico.getDadosEmpresa().numero],
            cidade: [this.servico.getDadosEmpresa().cidade],
            cep: [this.servico.getDadosEmpresa().cep],
            cnpj: [this.servico.getDadosEmpresa().cnpj],
            imagem: [this.servico.getDadosEmpresa().imagem],
            politica: [this.servico.getDadosEmpresa().politica],
            descricao: [this.servico.getDadosEmpresa().descricao]
        });
        this.imagemEmpresa = this.servico.getDadosEmpresa().imagem;
        this.imagemEmpresaCapa = this.servico.getDadosEmpresa().capa;
    };
    PerfilComponent.prototype.clickshowqr = function () {
        if (this.statusShowQr) {
            this.statusShowQr = false;
        }
        else {
            this.statusShowQr = true;
        }
    };
    PerfilComponent.prototype.imprimirQR = function () {
        var divContents = document.getElementById('areaqr').innerHTML;
        var a = window.open('', '', 'height=500, width=640');
        a.document.write(divContents);
        a.document.close();
        a.print();
    };
    PerfilComponent.prototype.onclickSalvar = function () {
        var _this = this;
        var accallback = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.mensagem);
            }
            else {
                _this.servico.mostrarMensagem(r.mensagem);
            }
            console.log(r);
        };
        this.crud.post_api('atualizar_perfil_empresa', accallback, this.formPerfil.value, true);
    };
    PerfilComponent.prototype.onClickImagemSelecionarCapa = function () {
        document.getElementById('imgInpCapa').click();
    };
    PerfilComponent.prototype.onClickImagemSelecionar = function () {
        document.getElementById('imgInp').click();
    };
    PerfilComponent.prototype.inputFile = function (event) {
        var _this = this;
        console.log(this);
        this.arquivo = event.target.files[0];
        console.log(this.arquivo);
        var fileRead = new FileReader();
        fileRead.onloadend = function () {
            _this.imagemEmpresa = fileRead.result;
        };
        fileRead.readAsDataURL(this.arquivo);
        this.statusMudarLogo = true;
    };
    PerfilComponent.prototype.inputFileCapa = function (event) {
        var _this = this;
        console.log(this);
        this.arquivoCapa = event.target.files[0];
        console.log(this.arquivoCapa);
        var fileRead = new FileReader();
        fileRead.onloadend = function () {
            _this.imagemEmpresaCapa = fileRead.result;
        };
        fileRead.readAsDataURL(this.arquivoCapa);
        this.statusMudarCapa = true;
    };
    PerfilComponent.prototype.enviaCapaEmpresa = function () {
        var _this = this;
        this.statusLoadConteudo = true;
        var formData = new FormData();
        formData.append('nome_imagem_text', this.arquivoCapa.name);
        formData.append('imagem', this.arquivoCapa);
        this.http.post(this.servico.getApiAcao('upload_img_galeria'), formData).subscribe(function (data) {
            // logo que enviar a imagem pega o nome da imagem e salva o produto no banco de dados
            // this.valorSubmit.imagem = data.mensagem;
            _this.formPerfil.controls.capa.setValue(data.mensagem);
            if (_this.statusMudarLogo) {
                _this.enviaImagem();
            }
            else {
                _this.onclickSalvar();
            }
        }, function (error) {
            _this.statusLoadConteudo = false;
            alert('Não foi possível enviar a imagem do item');
        });
    };
    PerfilComponent.prototype.onClickSav = function () {
        // So tenta envia a imagem se sofrer att
        if (this.statusMudarCapa) {
            this.enviaCapaEmpresa();
            return;
        }
        if (this.statusMudarLogo) {
            this.enviaImagem();
            return;
        }
        this.onclickSalvar();
    };
    PerfilComponent.prototype.enviaImagem = function () {
        var _this = this;
        this.statusLoadConteudo = true;
        var formData = new FormData();
        formData.append('nome_imagem_text', this.arquivo.name);
        formData.append('imagem', this.arquivo);
        this.http.post(this.servico.getApiAcao('upload_img_galeria'), formData).subscribe(function (data) {
            // logo que enviar a imagem pega o nome da imagem e salva o produto no banco de dados
            // this.valorSubmit.imagem = data.mensagem;
            _this.formPerfil.controls.imagem.setValue(data.mensagem);
            _this.onclickSalvar();
        }, function (error) {
            _this.statusLoadConteudo = false;
            alert('Não foi possível enviar a imagem do item');
        });
    };
    PerfilComponent.prototype.alterarSenha = function () {
        var dialogRef = this.dialog.open(alterar_senha_component_1.AlterarSenhaComponent, {
            width: '350px',
            data: {}
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
        });
    };
    PerfilComponent.prototype.ngOnInit = function () {
        this.urlqr = this.servico.urlQrcode + this.servico.getDadosEmpresa().tagnome;
        console.log(this.urlqr);
        this.ini();
    };
    PerfilComponent = __decorate([
        core_1.Component({
            selector: 'app-perfil',
            templateUrl: './perfil.component.html',
            styleUrls: ['./perfil.component.css']
        })
    ], PerfilComponent);
    return PerfilComponent;
}());
exports.PerfilComponent = PerfilComponent;
