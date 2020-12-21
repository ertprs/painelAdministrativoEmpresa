import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { UsuariosAdmService } from '../usuarios/usuarios-adm.service';

@Component({
  selector: 'app-pagamento-online',
  templateUrl: './pagamento-online.component.html',
  styleUrls: ['./pagamento-online.component.css']
})
export class PagamentoOnlineComponent implements OnInit {

  dataSource: any;
  displayedColumns: string[] = [
    'data_criado', 'id_pix', 'pix_key', 'creationDateTime'
  , 'ownershipDateTime', 'claimRequestDateTime', 'href', 'tipo_chave'
];

displayedColumns2: string[] = [
  'che', 
  'id_pedido', 
  'id_empresa', 
  'id_cliente', 
  'id_formapagamento',
  'dt_alterado',
  'info', 
  'data_compensa', 
  'cod_pag_online',
  'comissao_servico',
  'valor',
  'taxa_servico',
  'total_lojista',
]; 
 
 chaves: Array<any>;
 pagson: Array<any>;
 form: FormGroup;
 total = 0;
 totalComissao = 0;
  
  constructor(public crud: CrudServicoService, public servico: ServicoService, public us: UsuariosAdmService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.consultaChavesPIX();

    this.form = this.fb.group({
      datai: [''],
      dataf: [''],
      modotransf: [''],
    });

    this.consultaPagsOn();

  }

  transf(id: number) {
    const fcallb = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes);
      } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.consultaPagsOn();
      }
    };
    this.crud.post_api('transferirPagamentoLojista', fcallb, id);
  }

  addnc(chave: any) {
    const fcallb = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes);
      } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.consultaChavesPIX();
      }
    };
    this.crud.post_api('criarChaveAleatoriaPIX', fcallb, chave);
  }

  consultaChavesPIX() {
    const fcallb = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes);
      } else {
          this.chaves = r.resultado;
      }
    };
    this.crud.post_api('consultaChavesPIX', fcallb, '');
  }

  consultaPagsOn() {
    const fcallb = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes);
      } else {
          this.pagson = r.resultado.itens.lista; 
          this.total = r.resultado.itens.total_valor;
          this.totalComissao = r.resultado.itens.total_comissao;
      }
    };
    this.crud.post_api('consultaPagsOn', fcallb, this.form.value);
  }
  
 
   
}
