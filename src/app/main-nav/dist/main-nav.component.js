"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MainNavComponent = void 0;
var core_1 = require("@angular/core");
var layout_1 = require("@angular/cdk/layout");
var operators_1 = require("rxjs/operators");
var MainNavComponent = /** @class */ (function () {
    function MainNavComponent(breakpointObserver, servico, servpedidos, us, ms) {
        this.breakpointObserver = breakpointObserver;
        this.servico = servico;
        this.servpedidos = servpedidos;
        this.us = us;
        this.ms = ms;
        this.isHandset$ = this.breakpointObserver.observe(layout_1.Breakpoints.Handset)
            .pipe(operators_1.map(function (result) { return result.matches; }), operators_1.shareReplay());
    }
    MainNavComponent.prototype.clickMenu = function (item) {
        this.ms.menuSelecionado.forEach(function (element) {
            console.log('loop');
            if (element === item) {
                console.log('OK');
                item.selecionado = true;
            }
            else {
                element.selecionado = false;
            }
        });
    };
    MainNavComponent = __decorate([
        core_1.Component({
            selector: 'app-main-nav',
            templateUrl: './main-nav.component.html',
            styleUrls: ['./main-nav.component.css']
        })
    ], MainNavComponent);
    return MainNavComponent;
}());
exports.MainNavComponent = MainNavComponent;
