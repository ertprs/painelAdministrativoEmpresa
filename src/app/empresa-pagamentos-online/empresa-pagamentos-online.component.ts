import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { UsuariosAdmService } from '../usuarios/usuarios-adm.service';

@Component({
  selector: 'app-empresa-pagamentos-online',
  templateUrl: './empresa-pagamentos-online.component.html',
  styleUrls: ['./empresa-pagamentos-online.component.css']
})
export class EmpresaPagamentosOnlineComponent implements OnInit {

  form: FormGroup;
  totalComissao = 0;
  total = 0;
  lista: Array<any>;
  filtroRecebimentoDataatual = false;
  statusLoaderT = false;
  constructor(public crud: CrudServicoService, public servico: ServicoService, public us: UsuariosAdmService, private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      datai: [''],
      dataf: [''],
      datar: [''],
      modotransf: [''],
    });


    this.consultaPagsOn();
  }

  tranferir(item: any) {
    if (!this.filtroRecebimentoDataatual) {
      this.servico.mostrarMensagem('Você deve filtrar os pagamentos por data de recebimento antes de transferir');
      return;
    }


    item.statusLoaderT = true;


    const fcallb = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes);
        item.statusLoaderT = false;
      } else {
        item.statusLoaderT = false;
        this.consultaPagsOn();
        this.servico.mostrarMensagem(r.detalhes);
      }
    };
    this.crud.post_api('transferirPagOnlineEmpresaALojista', fcallb, { idEmpresa: item.id, datar: this.form.controls.datar.value }, true);


  }



  consultaPagsOnPeriodo() {
    this.form.controls.datar.setValue('');
    this.filtroRecebimentoDataatual = false;
  }

  clickDataRecebimento() {
    this.form.controls.datai.setValue('');
    this.form.controls.dataf.setValue('');
    this.consultaPagsOn();
    this.filtroRecebimentoDataatual = true;
  }


  consultaPagsOn() {
    const fcallb = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes);
      } else {
        this.lista = r.resultado.itens.lista;
        this.total = r.resultado.itens.total_valor;
        this.totalComissao = r.resultado.itens.total_comissao;
        this.form.controls.datar.setValue(r.resultado.itens.data_atual);
      }
    };
    this.crud.post_api('empresasPagsOn', fcallb, this.form.value);
  }

  clickMPags(item) {
    this.lista.forEach(element => {
      element.mostrarpags = false;
    });
    item.mostrarpags = true;
  }

}
