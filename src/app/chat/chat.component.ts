import { ServicoService } from 'src/app/servico.service';
import { ChatservicoService } from './chatservico.service';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
declare var $: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  usuariosChat: [{
    nome: '', canal: '', status: boolean, statusVisto: boolean, qntVist: number, mensagens: [
      { nome: 'Nome cliente', tipo: 'cliente', mensagem: '', info: '', statusMsgVisto: boolean }
    ]
  }];

  statusCanal = false;
  dadosCanal = { id: '', nome: '', mensagens: [], idSessao: '', canal: '', status: true };
  msgInput: string;
  public canalChat = { status: true };
  // private audionot = new Audio('../../assets/audio/recenot.mp3');
  // private audioenv = new Audio('../../assets/audio/notwhats.mp3');

  constructor(private socket: Socket, public servicoChat: ChatservicoService, public servicoApp: ServicoService) { }

  ngOnInit(): void {
    this.servicoChat.setIconnotificacao();
    // const dadosEmpresa = { nome: 'XDelssy Delivery', id: '2', usuarios: [] };
    // this.socket.emit('addEmpresa', dadosEmpresa);


/*
    this.socket.on('usuariodesconectedo', data => {
      console.log(data);
      for (const x in this.usuariosChat) {
        if (this.usuariosChat[x].canal === data.canal) {
          console.log('aqquii!');
          console.log(this.dadosCanal);
          this.dadosCanal.status = false;
          this.usuariosChat[x].status = false;
        }
      }
    });
*/
    /*this.socket.on('guinho', data => {
      console.log(data);
      this.usuariosChat = data.usuarios;
    });*/

    this.socket.on('enviaMsg', (data: any) => {
      console.log(data);
      console.log(this.usuariosChat);
      try {
        // this.usuariosChat[0].mensagens.push(data.mensagem);

        // tslint:disable-next-line: forin
        for (const x in this.usuariosChat) {
          if (this.usuariosChat[x].canal === data.canal) {
            data.statusVisto = false;
            this.usuariosChat[x].mensagens.push(data.mensagem);
            alert('add');
            // configura item de notificação de msg nao lida
            if (this.dadosCanal.canal !== data.canal) {
              this.usuariosChat[x].statusVisto = false;
              let qntVv = 0;
              for (const msg in this.usuariosChat[x].mensagens) {
                  if (this.usuariosChat[x].mensagens[msg].statusMsgVisto === false) {
                    qntVv ++;
                    this.usuariosChat[x].qntVist = qntVv;
                    this.usuariosChat[x].mensagens[msg].statusMsgVisto = true;
                  }
              }
              // alert(this.usuariosChat[x].qntVist);
            }

          }
        }
        // this.notificaRece();
      } catch (e) {
        console.log('Não foi encontrado usuarios na lista');
        console.log(e);
      }

    });

    document.addEventListener('keypress', e => {
      // tslint:disable-next-line: deprecation
      if (e.which === 13) {
        console.log('a tecla enter foi pressionada');
        this.enviarMensagem();
      }
    }, false);

  }

  enviarMensagem() {
    if (!this.msgInput) { /*alert('Msg null');*/ return; }

    const m = {
      sessao: {
        idSessao: this.servicoChat.getDadosCanal().canal, // id do user
        tokensessao: 'xxx'
      },
      nome: this.servicoChat.getDadosCanal().nome,
      idEmpresa: this.servicoApp.getDadosEmpresa().id,
      mensagens: [],
      canal: this.servicoChat.getDadosCanal().idSessao,
      mensagem: {
        nome: this.servicoApp.getDadosEmpresa().nome,
        tipo: 'server',
        mensagem: this.msgInput,
        info: this.servicoApp.retornaDataHoraAtual()
      }
    };
    this.servicoChat.getDadosCanal().mensagens.push(m.mensagem);
    this.msgInput = '';
    this.socket.emit('recebeMsg', m);
    $('.caixamsgs').animate({ scrollTop: 9999 }, 'slow');
    // this.notificaEnv();
  }

  abrirCanalChatUsu(usuario: any) {
    console.log(usuario);
    this.statusCanal = true;
    this.servicoChat.setDadosCanal(usuario);
    usuario.statusVisto = true;
  }



}
