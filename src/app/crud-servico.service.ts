import { ProgressSistemaService } from './componentes/progress-sistema/progress-sistema.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServicoService } from './servico.service';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class CrudServicoService {

  private setIntervalConsultaSis: any;
  public resp: any;

  constructor(private http: HttpClient, private servico: ServicoService, private progServ: ProgressSistemaService) { }

  public pegaHost(): Observable<any> {
    return this.http.get('./assets/config/configuracoes.json');
  }

  public pegaMenu(): Observable<any> {
    return this.http.get('./assets/config/menu.json');
  }

  public get_api(acao: string): Observable<any> {
    return this.http.get(this.servico.getApiAcao(acao));
  }

  public post_api(acao: string, acaoCallBack, param: any, mostrarProgesso?: boolean): Observable<any> {
    return $.post(this.servico.getApiAcao(acao, mostrarProgesso), { obj: param },
      (data, status) => {
        /*  console.log(data); */
         this.servico.setRespostaApi(JSON.parse(data));
        // this.servico.setRespostaApi(data);
         acaoCallBack();
         if (mostrarProgesso) { this.progServ.showProgress.emit(false); }
      });
  }

  public consultaSistema() {
    this.cc();

    setInterval(() => {
      this.cc();
    }, this.servico.getInterEntregadores());

  }

  cc() {
    
    this.http.get(this.servico.getApiAcao('consulta_entregador_on')).subscribe(
      data => {
        this.resp  = data;
        // console.log(this.resp);
        this.servico.setListaNotificacoes(this.resp.api.notificacoes.lista);
        this.servico.setListaEntregador(this.resp.api.entregador);
        // this.servico.setListaEntregas(this.resp.api.entregas.lista);
        this.servico.setQntEntOn(this.resp.api.quantidade_entregador_online);
      },
      error => { console.error('Erro#consulta_entregador_on!*'); console.log(error); });
  }




}
