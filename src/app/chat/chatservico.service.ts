import { Router } from '@angular/router';
import { ServicoService } from './../servico.service';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class ChatservicoService {

  private iconnotificacao = true;
  private audionot = new Audio('https://vulto.site/vulto_/assets/audio/recenot.mp3');
  private audioenv = new Audio('https://vulto.site/vulto_/assets/audio/notwhats.mp3');
  private canalChat: string;
  private dadosCanal: { status: boolean, canal: any, nome: string, idSessao: string, mensagens: any };
  private usuariosChat: [
    {
      nome: '', telefone: string, canal: '', status: boolean, statusVisto: boolean, qntVist: number, mensagens: [
        { nome: 'Nome cliente', tipo: 'cliente', mensagem: '', info: '', statusMsgVisto: boolean }
      ]
    }
  ];

  constructor(private socket: Socket, private router: Router) { }

  adicionaEmpresaChat(nomeEmpresa: string, idEmpresa: string) {
    const dadosEmpresa = { nome: nomeEmpresa, id: idEmpresa, usuarios: [] };

    this.socket.emit('acao', {acao: 'addEmpresa', obj: dadosEmpresa});


    this.socket.on('guinho', data => {
      console.log(data);
      this.usuariosChat = data.usuarios;
    });

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

    this.socket.on('enviaMsg', (data: any) => {
      $('.caixamsgs').animate({ scrollTop: 9999 }, 'slow');
      console.log(this.router.url);
      if (this.router.url !== '/chat') {
        this.iconnotificacao = false;
      }
      this.notificaRece();
      try {
        // this.usuariosChat[0].mensagens.push(data.mensagem);

        // tslint:disable-next-line: forin
        for (const x in this.usuariosChat) {
          console.log(this.usuariosChat);
          if (this.usuariosChat[x].canal === data.canal) {
            data.statusVisto = false;
            this.usuariosChat[x].mensagens.push(data.mensagem);
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


      } catch (e) {
        console.log(e);
      }

    });

  }

  notificaRece() {
    this.audionot.play();
  }

  notificaEnv() {
    this.audioenv.play();
  }

  getIconnotificacao() { return this.iconnotificacao; }
  setIconnotificacao() { this.iconnotificacao = true; }

  setCanalChat(canal: string) { this.canalChat = canal; }
  getCanalChat() { return this.canalChat; }
  getUsuariosChat() { return this.usuariosChat; }
  getDadosCanal() { return this.dadosCanal; }
  setDadosCanal(dadosCanal: any) { this.dadosCanal = dadosCanal; }

}// ChatservicoService







