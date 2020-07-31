import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ConfigServicoService } from './config-servico.service';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {
  public btvstatus: any;
  public formVin: FormGroup;
  statusRota: boolean;
  statusRotaEntregador: boolean;
  formRefPede: FormGroup;
  btAstatus: boolean;
  statusAutenticadoPedeai: boolean;
  restauranteNomePedeai: string;
  cidadeSele: any;
  constructor(public servico: ServicoService, private crud: CrudServicoService, private formBuilder: FormBuilder,
              public config: ConfigServicoService) { }

  ngOnInit(): void {
    this.btvstatus = false;
    this.btAstatus = false;
    this.iniciarFormVinc();
    this.statusRota = this.config.getStatusRotas();
    this.statusRotaEntregador = this.config.getStatusRotasEntregador();
    this.iniciarFormAutPedeai();
    console.log(this.config.getStatusRotas());
    console.log(this.config.getStatusRotasEntregador());

    if (this.servico.getDadosEmpresa().config) {
      this.formRefPede = this.formBuilder.group({
        username: [this.servico.getDadosEmpresa().config.details.info.username],
        password: [this.servico.getDadosEmpresa().config.details.info.password]
      });
      this.restauranteNomePedeai = this.servico.getDadosEmpresa().config.details.info.restaurant_name;
    }
    this.statusAutenticadoPedeai = this.config.getStatusAutPede();

  }


  oncllickVincular() {
    console.log('#oncllickVincular');
    console.log(this.formVin.value);
    this.btvstatus = true;
    const loginres = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.mensagem);
        this.btvstatus = false;
      } else {
        this.servico.mostrarMensagem(r.mensagem.texto);
        this.servico.getDadosEmpresa().entregador_vinc = r.mensagem.entregador;
        this.btvstatus = false;
      }
    };
    console.log(this.crud.post_api('vic_motoboy', loginres, this.formVin.value));
  }

  onclickdesvinc() {
    console.log('#onclickdesvinc');
    this.btvstatus = true;
    this.crud.get_api('desc_motoboy').subscribe(data => {
      if (data.erro === false) {
        this.servico.mostrarMensagem(data.mensagem);
        this.servico.getDadosEmpresa().entregador_vinc = false;
        this.btvstatus = false;
      } else {
        this.servico.mostrarMensagem(data.mensagem);
        this.btvstatus = false;
      }
    }, error => {
      this.servico.mostrarMensagem(error);
    });
  }

  iniciarFormVinc() {
    this.formVin = this.formBuilder.group({ email: [null] });
  }
  iniciarFormAutPedeai() {
    this.formRefPede = this.formBuilder.group({ username: [null], password: [null] });
  }

  onclickAutenticarPedeai() {
    console.log('#onclickVerEntrega');
    console.log(this.formRefPede.value);
    this.btAstatus = true;
    const loginres = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      this.btAstatus = false;
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.mensagem);
      } else {
        if (r.code === 1) {
          this.statusAutenticadoPedeai = true;
          this.config.setStatusAutPede(true);
          this.restauranteNomePedeai = r.details.info.restaurant_name;
          this.formRefPede = this.formBuilder.group({
            username: [this.formRefPede.value.username],
            password: [this.formRefPede.value.password]
          });
        }
      }
    };
    this.crud.post_api('pedeai&tipo=login', loginres, this.formRefPede.value);
  }

  desAutPedeai() {
    this.btAstatus = true;
    const loginres = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      this.btAstatus = false;
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.mensagem);
      } else {
        this.statusAutenticadoPedeai = false;
        this.config.setStatusAutPede(false);
        this.restauranteNomePedeai = 'r.details.info.restaurant_name';
      }
    };
    this.crud.post_api('pedeai&tipo=logout', loginres, this.formRefPede.value);
  }


  getBairros(item: any) {
    console.log('#selectionChangeCidade');
    console.log(item);

    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.setListaBairros(r);
        setTimeout(() => { this.carregaTaxas(); }, 700);
      }
      console.log(r);
    };
    this.cidadeSele = item.nome;
    this.crud.post_api('bairros', accallback, item);

  }

  carregaTaxas() {
    let coordendasBairro = '';
    const cidadeNome = this.cidadeSele;
    // tslint:disable-next-line: forin
    for (const bairro in this.servico.getListaBairros()) {
      coordendasBairro = this.servico.getListaBairros()[bairro].lat + ', ' + this.servico.getListaBairros()[bairro].lng;
      this.servico.getListaBairros()[bairro].statusload = true;

      const loginres = () => {
        const r = this.servico.getRespostaApi();
        if (r.erro === true) {
          this.servico.mostrarMensagem(r.mensagem);
        } else {
          // tslint:disable-next-line: no-unused-expression
          this.servico.getListaBairros()[bairro].taxa = r.taxa_entrega;
          this.servico.getListaBairros()[bairro].distancia = r.rows[0].elements[0].distance.text;
          this.servico.getListaBairros()[bairro].duracao = r.rows[0].elements[0].duration.text;
        }
        this.servico.getListaBairros()[bairro].statusload = false;
      };
      const data = { cidadeNome, coordendasBairro };
      this.crud.post_api('calc_taxa', loginres, data);
    }
  }

  onclickPrint() {
    // tslint:disable-next-line: one-variable-per-declaration
    const conteudo = document.getElementById('area_print').innerHTML;
    // tslint:disable-next-line: variable-name
    const tela_impressao = window.open(this.cidadeSele);

    tela_impressao.document.write(conteudo);
    tela_impressao.window.print();
    tela_impressao.window.close();
  }


}
