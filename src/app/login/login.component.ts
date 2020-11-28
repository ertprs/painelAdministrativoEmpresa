import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UsuariosAdmService } from '../usuarios/usuarios-adm.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  btloginstatus: any;
  logo = 'assets/vultoroxonome.png';

  constructor(private crud: CrudServicoService,
              private formBuilder: FormBuilder,
              public servico: ServicoService,
              private router: Router,
              private auth: AuthService,
              private us: UsuariosAdmService
              ) {
                this.crud.pegaHost().subscribe( data => {
                  console.log(data[0].host);
                  this.servico.setHost(data[0].host, data[0].api);
                 }, error => { alert('Erro ao carregar o host'); } );

                this.crud.pegaMenu().subscribe( data => {
                  console.log(data);
                  this.us.setPermissoes(data);
                 }, error => { alert('Erro ao carregar o host'); } );
               }

  ngOnInit(): void {
    this.btloginstatus = false;
    console.log('Aguarda canal chat');


    this.formLogin = this.formBuilder.group({
      email: [null, Validators.required],
      senha: [null, Validators.required],
    });

  }

  oncllickEntrar() {
    // append your data
    this.btloginstatus = true;
    const loginres = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      setTimeout( () => {  this.btloginstatus = false; } , 1500 );
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.mensagem);
        this.auth.mostrarMenu.emit(false);
        this.btloginstatus = false;
      } else {
        this.servico.setDadosLogin(r.resultado);
        this.crud.consultaSistema();
        // this.router.navigate(['/inicio']);
        if (r.resultado.dados_conta.operador.tipo === 'super') { this.router.navigate(['/admin']); } else {
           this.router.navigate(['/painelpedidos/pedidos']);
        }
        this.us.initPermissao(
          r.resultado.dados_conta.operador.permissoes_status_todas,
          r.resultado.dados_conta.operador.permissoes
          );
        this.auth.mostrarMenu.emit(true);
      }
    };
    this.crud.post_api('login_emrpesa', loginres, this.formLogin.value, true );
  }

}
