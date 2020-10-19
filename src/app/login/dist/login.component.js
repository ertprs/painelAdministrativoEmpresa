"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(crud, formBuilder, servico, router, auth, us) {
        this.crud = crud;
        this.formBuilder = formBuilder;
        this.servico = servico;
        this.router = router;
        this.auth = auth;
        this.us = us;
        this.logo = 'assets/vultoroxonome.png';
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.btloginstatus = false;
        console.log('Aguarda canal chat');
        this.formLogin = this.formBuilder.group({
            email: [null, forms_1.Validators.required],
            senha: [null, forms_1.Validators.required]
        });
    };
    LoginComponent.prototype.oncllickEntrar = function () {
        // append your data
        var _this = this;
        console.log('#oncllickEntrar');
        console.log(this.formLogin.value);
        this.btloginstatus = true;
        var loginres = function () {
            console.log('callback');
            var r = _this.servico.getRespostaApi();
            console.log(r);
            setTimeout(function () { _this.btloginstatus = false; }, 1500);
            if (r.erro === true) {
                _this.servico.mostrarMensagem(r.mensagem);
                _this.auth.mostrarMenu.emit(false);
                _this.btloginstatus = false;
            }
            else {
                _this.servico.setDadosLogin(r.resultado);
                _this.crud.consultaSistema();
                // this.router.navigate(['/inicio']);
                _this.router.navigate(['/painelpedidos/pedidos']);
                _this.us.initPermissao(r.resultado.dados_conta.operador.permissoes_status_todas, r.resultado.dados_conta.operador.permissoes);
                _this.auth.mostrarMenu.emit(true);
            }
        };
        console.log(this.crud.post_api('login_emrpesa', loginres, this.formLogin.value));
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
