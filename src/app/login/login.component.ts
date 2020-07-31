import { ChatservicoService } from './../chat/chatservico.service';
import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicoService } from '../servico.service';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  btloginstatus: any;

  constructor(private crud: CrudServicoService,
              private formBuilder: FormBuilder,
              private servico: ServicoService,
              private router: Router,
              private auth: AuthService,
              private socket: Socket,
              private servicoChat: ChatservicoService
              ) { }

  ngOnInit(): void {
    this.btloginstatus = false;
    this.formLogin = this.formBuilder.group({ email: [null], senha: [null] });
    console.log('Aguarda canal chat');
    this.socket.on('tokensessao', data => {
      console.log('CANALL!!');
      console.log(data);
      this.servicoChat.setCanalChat(data);
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
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.mensagem);
        this.auth.mostrarMenu.emit(false);
        this.btloginstatus = false;
      } else {
        this.servico.setDadosLogin(r);
        this.crud.consultaSistema();
        this.router.navigate(['/inicio']);
        this.auth.mostrarMenu.emit(true);
      }
    };
    console.log( this.crud.post_api('login_emrpesa', loginres, this.formLogin.value ) );
  }

}
