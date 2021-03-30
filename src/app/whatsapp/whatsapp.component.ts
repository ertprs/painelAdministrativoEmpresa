import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-whatsapp',
  templateUrl: './whatsapp.component.html',
  styleUrls: ['./whatsapp.component.css']
})
export class WhatsappComponent implements OnInit {

  statusBTW = true;
  statusdescBTW = true;
  statusSalvar = false;
  form: FormGroup;
  loaderqR = false;
  telefone = '';
  tempoConServNode = false;
  base64code = '';
  mostrarQR = false;
  statusConectado = 999;
  statusdescBTW2 = false;
  tt: any;

  allloader = false;

  statusCon = '';
  BTcancelar = false;

  constructor(public servico: ServicoService, private crud: CrudServicoService, private fb: FormBuilder, private http: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      telefone: [null, Validators.required],
    });
    this.form.controls.telefone.setValue(this.servico.getDadosEmpresa().num_whats);
    
    this.requestQR();
    
  }

  conectar() {
    this.statusBTW = true;
    const fc = (data) => {
      const r = this.servico.getRespostaApi();
      if (r.erro) {
        this.servico.mostrarMensagem(r.detalhes);
        this.statusBTW = false;
        clearInterval(tttt);
        return;
      }
      this.servico.mostrarMensagem(r.detalhes);
    };

    this.setQRDB('pendente', fc);
    const tttt = setInterval( () => { this.requestQR(); } , 2000 );

  }

 
  cancelarcon() {
    this.setQRDB('desconectar', this.requestQR);
  }
    desconectar() {
      this.statusdescBTW = true;
      this.statusdescBTW2 = true;
      this.setQRDB('desconectar', this.requestQR);
      this.statusBTW = true;
      this.statusSalvar = true;
      this.statusdescBTW = true;
      this.loaderqR = true;
      setTimeout( () => { this.router.navigate(['/painelpedidos/pedidos']); } ,6000 );
  }

  requestQR() {

    this.loaderqR = true;
    
    const callb = () => {
      
      const data = this.servico.getRespostaApi();

      switch (data.resultado) {
        case 'pendente': { this.pendente(); }break;
        case 'gerando': { this.pendente(); }break;
        case 'true': { this.online(); }break;
        case 'desconectar': { this.desconectarStatus(); }break;
        case '': { this.offonline(); }break;
        default: {
          /* mostra qr code */ 
          console.log('scanear');
          this.scanear(data.resultado);
        }
      }

    };

    this.crud.post_api('getQr', callb, this.form.value, false);
   
  }


  salvarnumero() {
    if (!this.form.controls.telefone.value) {
      this.servico.mostrarMensagem('Informe um telefone válido');
      return;
    }
    // this.url += this.form.controls.telefone.value;
    this.statusSalvar = true;

    const callb = () => {
      const data = this.servico.getRespostaApi();
      if (data.erro) {
        this.servico.mostrarMensagem(data.detalhes);
        this.statusSalvar = false;
        return;
      }
      this.servico.mostrarMensagem(data.detalhes);
      this.statusSalvar = false;
      // if true
      this.statusBTW = false;
      this.telefone = this.form.value;

    };
    console.log('salvarnumero');
    this.crud.post_api('salvarNumerow', callb, this.form.value, true);
  }

  setQRDB(valor, fc) {
    this.crud.post_api('salvarQR&base64=' + valor, fc, {}, false);
  }


  online() {
    this.statusBTW = true;
    this.statusSalvar = true;
    this.statusdescBTW = false;
    this.loaderqR = false;
    this.base64code = '';
    this.mostrarQR = false;
    this.statusConectado = 1;
  }
  offonline() {
    this.statusBTW = false;
    this.statusSalvar = false;
    this.statusdescBTW = true;
    this.loaderqR = false;
    this.statusConectado = 0;
  }
  pendente() {
    this.statusBTW = true;
    this.statusSalvar = true;
    this.statusdescBTW = false;
    this.loaderqR = true;
    this.statusConectado = 2;
  }

  desconectarStatus() {
    this.statusBTW = true;
    this.statusSalvar = true;
    this.statusdescBTW = false;
    this.loaderqR = false;
    this.base64code = '';
    this.mostrarQR = false;
    this.statusConectado = 4;
  }

  scanear(base64qr) {
    this.statusBTW = true;
    this.statusSalvar = true;
    this.statusdescBTW = true;
    this.loaderqR = false;
    this.mostrarQR = true;
    this.base64code = base64qr;
    this.statusConectado = 3;

  }
   
}
