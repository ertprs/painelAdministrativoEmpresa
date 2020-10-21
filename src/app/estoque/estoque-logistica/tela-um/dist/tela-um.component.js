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
exports.TelaUmComponent = void 0;
var core_1 = require("@angular/core");
var dialog_1 = require("@angular/material/dialog");
var TelaUmComponent = /** @class */ (function () {
    // form: FormGroup;
    function TelaUmComponent(dialogRef, data, fb) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.fb = fb;
    }
    TelaUmComponent.prototype.ngOnInit = function () {
        console.log(this.data);
    };
    TelaUmComponent.prototype.prosseguir = function () {
        this.dialogRef.close(this.data.parametros);
    };
    TelaUmComponent = __decorate([
        core_1.Component({
            selector: 'app-tela-um',
            templateUrl: './tela-um.component.html',
            styleUrls: ['./tela-um.component.css']
        }),
        __param(1, core_1.Inject(dialog_1.MAT_DIALOG_DATA))
    ], TelaUmComponent);
    return TelaUmComponent;
}());
exports.TelaUmComponent = TelaUmComponent;
