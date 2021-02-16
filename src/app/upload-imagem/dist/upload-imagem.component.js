"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UploadImagemComponent = void 0;
var core_1 = require("@angular/core");
var UploadImagemComponent = /** @class */ (function () {
    function UploadImagemComponent(servico, http, upimg, crud) {
        this.servico = servico;
        this.http = http;
        this.upimg = upimg;
        this.crud = crud;
        this.statusLoadConteudo = false;
        this.statusUPload = new core_1.EventEmitter();
    }
    UploadImagemComponent.prototype.ngOnInit = function () {
    };
    UploadImagemComponent.prototype.onClickImagemSelecionarCapa = function () {
        document.getElementById('imgInp').click();
    };
    UploadImagemComponent.prototype.inputFile = function (event) {
        var _this = this;
        this.arquivo = event.target.files[0];
        console.log(this.arquivo);
        var fileRead = new FileReader();
        fileRead.onloadend = function () {
            _this.imagem = fileRead.result;
        };
        fileRead.readAsDataURL(this.arquivo);
        this.status = true;
    };
    UploadImagemComponent.prototype.enviarImagemServidor = function () {
        var _this = this;
        if (this.statusLoadConteudo) {
            return;
        }
        this.statusLoadConteudo = true;
        var formData = new FormData();
        formData.append('nome_imagem_text', this.arquivo.name);
        formData.append('imagem', this.arquivo);
        this.http.post(this.servico.getApiAcao('upload_img_galeria'), formData).subscribe(function (data) {
            // logo que enviar a imagem pega o nome da imagem e salva o produto no banco de dados
            // this.valorSubmit.imagem = data.mensagem;
            _this.servico.mostrarMensagem('Imagem enviada');
            console.log(data);
            _this.statusLoadConteudo = false;
            _this.upimg.setImagem(data.mensagem);
            _this.upimg.setstatusUpImagem(data.erro);
            _this.anexarImagem();
            _this.statusUPload.emit(data);
        }, function (error) {
            _this.statusLoadConteudo = false;
            _this.servico.mostrarMensagem('Não foi possível enviar a imagem do item');
        });
    };
    UploadImagemComponent.prototype.anexarImagem = function () {
        var _this = this;
        if (!this.tabela || !this.idItem) {
            return console.warn('Nome da tabela ou o id item nao foi informado');
        }
        var callb = function () {
            if (_this.mensagem) {
                _this.servico.mostrarMensagem(_this.mensagem);
            }
        };
        this.crud.post_api('anexar_imagem', callb, {
            id: this.idItem,
            imagem: this.upimg.getImagem(),
            tabela: this.tabela,
            coluna: this.coluna
        });
    };
    __decorate([
        core_1.Input()
    ], UploadImagemComponent.prototype, "nomeBotao");
    __decorate([
        core_1.Input()
    ], UploadImagemComponent.prototype, "tabela");
    __decorate([
        core_1.Input()
    ], UploadImagemComponent.prototype, "coluna");
    __decorate([
        core_1.Input()
    ], UploadImagemComponent.prototype, "idItem");
    __decorate([
        core_1.Input()
    ], UploadImagemComponent.prototype, "mensagem");
    __decorate([
        core_1.Input()
    ], UploadImagemComponent.prototype, "preload");
    __decorate([
        core_1.Input()
    ], UploadImagemComponent.prototype, "btEnviar");
    __decorate([
        core_1.Output()
    ], UploadImagemComponent.prototype, "statusUPload");
    UploadImagemComponent = __decorate([
        core_1.Component({
            selector: 'app-upload-imagem',
            templateUrl: './upload-imagem.component.html',
            styleUrls: ['./upload-imagem.component.css']
        })
    ], UploadImagemComponent);
    return UploadImagemComponent;
}());
exports.UploadImagemComponent = UploadImagemComponent;
