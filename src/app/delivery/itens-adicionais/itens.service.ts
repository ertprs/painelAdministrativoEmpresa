import { Injectable } from '@angular/core';
import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';

@Injectable({
  providedIn: 'root'
})
export class ItensService {

  itensAdicional: any;
  itemadicional: any;
  acao = true;

  constructor(private servapp: ServicoService, private crud: CrudServicoService) { }

  consultaAdicionais() {
    console.log('#consultaEntregas');
    this.crud.get_api('consulta_adicionais&id=' + this.servapp.getDadosEmpresa().id).subscribe(data => {
      console.log(data);

      this.itensAdicional = data;
    });
  }



  getItensAdicional() {
    return this.itensAdicional;
  }
  setItensAdicional(itens: []) {
    this.itensAdicional = itens;
  }

  setItemAdicional(item: {}) {
    this.itemadicional = item;
  }
  getItemAdicional() {
    return this.itemadicional;
  }

  setTipoacao(acao: boolean) {
    this.acao = acao;
  }
  getTipoacao() {
    return this.acao;
  }


  removeItemAdicional(item) {
    console.log('#removeItemAdicional');
    // tslint:disable-next-line: max-line-length
    this.crud.get_api('remover_item_adicional&id_empresa=' + this.servapp.getDadosEmpresa().id + '&id_item=' + item.id).subscribe(data => {
      console.log(data);

      this.itensAdicional = data.lista;
    });
  }

  attStatusItem(item) {
    if (item.disponivel) { item.disponivelatt = false; } else { item.disponivelatt = true; }
    const callbfun = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.detalhes);
      } else {

      }
    };
    this.crud.post_api('att_status_item_adicional', callbfun, item );
  }

}
