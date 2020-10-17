import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

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
              ) { }

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

    console.log('#oncllickEntrar');
    console.log(this.formLogin.value);
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
        this.router.navigate(['/painelpedidos/pedidos']);
        this.auth.mostrarMenu.emit(true);
      }
    };
    console.log( this.crud.post_api('login_emrpesa', loginres, this.formLogin.value ) );
  }

}
