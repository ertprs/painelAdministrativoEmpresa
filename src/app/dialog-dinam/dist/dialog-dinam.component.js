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
exports.DialogDinamComponent = void 0;
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var DialogDinamComponent = /** @class */ (function () {
    function DialogDinamComponent(dialogRef, data, fb) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.fb = fb;
    }
    DialogDinamComponent.prototype.ngOnInit = function () {
        console.log(this.data);
        if (this.data.tipo === 'add') {
            this.form = this.fb.group({
                cidade: [null, forms_1.Validators.required],
                id_cidade: [null, forms_1.Validators.required],
                status: [null, forms_1.Validators.required],
                bairro: [null, forms_1.Validators.required],
                longetude: [null, forms_1.Validators.required],
                latitude: [null, forms_1.Validators.required],
                cidade_id: [null, forms_1.Validators.required],
                nome: [null, forms_1.Validators.required],
                descricao: [null, forms_1.Validators.required],
                // itens pag.
                id_formapagamento: [null, forms_1.Validators.required],
                imagem: [null, forms_1.Validators.required],
                senha: [null, forms_1.Validators.required],
                quantidade: [null, forms_1.Validators.required]
            });
        }
        else {
            console.log('Form editar');
            console.log(this.data.item);
            this.form = this.fb.group({
                id: [this.data.item.id, forms_1.Validators.required],
                cidade: [this.data.item.nome, forms_1.Validators.required],
                id_cidade: [this.data.item.id_cidade, forms_1.Validators.required],
                status: [this.data.item.status, forms_1.Validators.required],
                bairro: [this.data.item.nome, forms_1.Validators.required],
                longetude: [this.data.item.lng, forms_1.Validators.required],
                latitude: [this.data.item.lat, forms_1.Validators.required],
                cidade_id: [this.data.item.cidade_id, forms_1.Validators.required],
                nome: [this.data.item.nome, forms_1.Validators.required],
                descricao: [this.data.item.descricao, forms_1.Validators.required],
                id_formapagamento: [this.data.item.id_formapagamento, forms_1.Validators.required],
                imagem: [this.data.item.imagem, forms_1.Validators.required]
            });
        }
    };
    DialogDinamComponent = __decorate([
        core_1.Component({
            selector: 'app-dialog-dinam',
            templateUrl: './dialog-dinam.component.html',
            styleUrls: ['./dialog-dinam.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], DialogDinamComponent);
    return DialogDinamComponent;
}());
exports.DialogDinamComponent = DialogDinamComponent;
