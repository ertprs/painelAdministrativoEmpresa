import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoEntregaService } from '../entregas/servico-entrega.service';
import { Router } from '@angular/router';
import { DialogPedeaiComponent } from '../dialog-pedeai/dialog-pedeai.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogTutorialComponent } from '../dialog-tutorial/dialog-tutorial.component';

@Component({
  selector: 'app-dialog-cadastro-entrega',
  templateUrl: './dialog-cadastro-entrega.component.html',
  styleUrls: ['./dialog-cadastro-entrega.component.css']
})
export class DialogCadastroEntregaComponent implements OnInit {
  entregador: any;
  public entSele = false;
  public cliSele = false;
  formCadastroEntrega: FormGroup;
  cidadeClienteSelecionada: any;
  bairroClienteSelecionada: any;
  isLinear = false;
  carregandoRequest: any;
  pedidoFinalizado: any;
  dialogPedeai: any;
  cidadeAuto: any;
  public objCidade: any;
  public objbairro: any;
  public taxaEntregador: any;
  public taxaEntregadorText: any;
  constructor(public servico: ServicoService, private formBuilder: FormBuilder, private crud: CrudServicoService,
              private servivoEntrega: ServicoEntregaService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('Dialog cadastro entrega');
    this.carregandoRequest = false;
    this.entregador = this.servico.getEntregadoeSelecionado();
    this.ver_entregadorSelecionado();
    this.ver_clienteSelecionado();
    this.pedidoFinalizado = false;
    this.taxaEntregadorText = '0.00';

  }

  ver_entregadorSelecionado() {
    this.entSele = this.servico.getEntregadoeSelecionado();
    if (this.entSele !== false) {
      console.log('Existe um entregador selecionado!');
    } else {
      console.log('Não tem entregador selecionado!');
    }
  }

  ver_clienteSelecionado() {
    this.cliSele = this.servico.getClienteSelecionado();
    if (this.cliSele !== false) {
      // this.onclickCadastroEnt();
      this.ini2(this.cliSele);
    } else {
      this.ini();
    }
  }

  onclickRemoverEntSele() {
    this.servico.setEntregadoeSelecionado(false);
    this.ver_entregadorSelecionado();
  }
  onclickRemoverCliSele() {
    this.servico.setClienteSelecionado(false);
    this.ver_clienteSelecionado();
  }

  private ini() {
    console.log(this.servico.getDadosEmpresa());
    this.formCadastroEntrega = this.formBuilder.group({
      nome_cliente: [null],
      telefone_cliente: [null],
      bairro_cliente: [this.bairroClienteSelecionada],
      rua_cliente: [null],
      numero_cliente: [null],
      ponto_res_cliente: [null],
      tipo_res_cliente: [null],
      valor_pedido_cliente: [null],
      tipo_entrega: [null],
      taxa_entrega: [null],
      forma_pag_cliente: [null],
      empresa: [null],
      entregador: [null],
      coordenada_cliente: [null],
      id_cidade: [null],
      cidade_cliente: [null],
      cidadeAuto: [null],
      bairroAuto: [null],
    });
  }

  private ini2(dadosCliente: any) {
    console.log(dadosCliente);
    this.formCadastroEntrega = this.formBuilder.group({
      nome_cliente: [dadosCliente.nome],
      telefone_cliente: [dadosCliente.telefone],
      bairro_cliente: [dadosCliente.bairro],
      rua_cliente: [dadosCliente.rua],
      numero_cliente: [dadosCliente.numero],
      ponto_res_cliente: [dadosCliente.complemento],
      tipo_res_cliente: [null],
      valor_pedido_cliente: [null],
      tipo_entrega: [null],
      taxa_entrega: [null],
      forma_pag_cliente: [null],
      empresa: [null],
      entregador: [null],
      coordenada_cliente: [null],
      id_cidade: [null],
      cidade_cliente: [null],
      cidadeAuto: [null],
      bairroAuto: [null],
    });
  }

  onclickCadastrarEntrega(bairro: any) {
    console.log('#onclickCadastrarEntrega');
    try {
      this.formCadastroEntrega.value.bairro_cliente = bairro.nome;
    } catch (e) { console.log(e); }
    console.log('this.formCadastroEntrega');
    console.log(this.formCadastroEntrega);
    try {
      this.formCadastroEntrega.value.id_cidade = this.cidadeClienteSelecionada.id;
      this.formCadastroEntrega.value.cidade_cliente = this.cidadeClienteSelecionada;
      this.formCadastroEntrega.value.entregador = this.servico.getEntregadoeSelecionado();
    } catch (e) { /*this.servico.mostrarMensagem(e);*/ }
    this.carregandoRequest = true;
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); this.carregandoRequest = false; } else {
        this.servico.mostrarMensagem(r.mensagem);
        this.servico.setClienteSelecionado(false);
        this.pedidoFinalizado = true;
      }
      console.log(r);
    };
    this.crud.post_api('cadastrar_entrega', accallback, this.formCadastroEntrega.value);
  }

  selectionChangeCidade(item: any) {
    console.log('#selectionChangeCidade');
    console.log(item);

    this.cidadeClienteSelecionada = item;


    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.setListaBairros(r);
      }
      console.log(r);
    };
    this.crud.post_api('bairros', accallback, this.cidadeClienteSelecionada);

  }

  onclickFecharD() {
    // this.servivoEntrega.getDialog().close();
  }

  onclickSelecionarM() {
    this.onclickFecharD();
    this.router.navigate(['/motoboys']);
  }

  onclickSelecionarC() {
    this.onclickFecharD();
    this.router.navigate(['/meusclientes']);
  }

  onclickCPedeai(): void {

    this.onclickRemoverCliSele();

    this.dialogPedeai = this.dialog.open(DialogPedeaiComponent, {
      width: '350px',
    });

    this.dialogPedeai.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.servivoEntrega.setDialog(this.dialogPedeai);
  }

  dialogTutorial() {
    this.dialogPedeai = this.dialog.open(DialogTutorialComponent, {
      width: '650px',
    });

    this.dialogPedeai.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.servivoEntrega.setDialog(this.dialogPedeai);
  }

  onclickSelecionarEntregaPedeai() {
    const enderecoArray = this.servico.getEntregaPedeAi().client_info.address.split(',');
    this.objCidade = this.selecionarCidadeAuto(enderecoArray[3], enderecoArray[2]);
    this.servico.mostrarMensagem('Entrega selecionada com sucesso!');
    this.servico.setStatusEntregaPedeai(false);
  }

  iniciaFormCadastroPedeai(objCid: any, objBairro: any) {
    console.log('@iniciaFormCadastroPedeai');
    console.log(objBairro);
    const enderecoArray = this.servico.getEntregaPedeAi().client_info.address.split(',');
    let valorPedidoCliente = this.servico.getEntregaPedeAi().total.total.replace('R$', '');
    valorPedidoCliente = valorPedidoCliente.replace('.', ',');
    let taxaEntrega = this.servico.getEntregaPedeAi().total.delivery_charges.replace('R$', '');
    this.taxaEntregadorText = taxaEntrega.toString();
    taxaEntrega = taxaEntrega.replace('.', ',');
    this.formCadastroEntrega = this.formBuilder.group({
      nome_cliente: [this.servico.getEntregaPedeAi().client_info.full_name],
      telefone_cliente: [this.servico.getEntregaPedeAi().client_info.contact_phone],
      bairro_cliente: [objBairro.nome],
      rua_cliente: [enderecoArray[0]],
      numero_cliente: [enderecoArray[1]],
      // tslint:disable-next-line: max-line-length
      ponto_res_cliente: [this.servico.getEntregaPedeAi().delivery_instruction + ' - Troco para levar:' + this.servico.getEntregaPedeAi().total.order_change],
      tipo_res_cliente: ['Não informado'],
      valor_pedido_cliente: [valorPedidoCliente],
      tipo_entrega: ['Não informado'],
      taxa_entrega: [taxaEntrega],
      forma_pag_cliente: [this.servico.getEntregaPedeAi().payment_type],
      empresa: [null],
      entregador: [this.entSele],
      coordenada_cliente: [null],
      id_cidade: [objCid],
      cidade_cliente: [objCid],
      cidadeAuto: [objCid],
      bairroAuto: [objBairro],
    });
  }


  selecionarCidadeAuto(nomeCidade: string, nomeBairro: string) {
    if (!nomeCidade) { this.servico.mostrarMensagem('Não foi possível selecionar a cidade do cliente'); return; }
    if (!nomeBairro) { this.servico.mostrarMensagem('Não foi possível selecionar a cidade do cliente'); return; }
    nomeCidade = nomeCidade.trim();
    const nomeBairroRep = nomeBairro.trim();

    console.log('#selecionarCidadeAuto');
    console.log(':' + nomeCidade + ':');
    console.log(':' + nomeBairroRep + ':');

    let statusCidade = false;
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.setListaBairros(r);
        this.selecionaBairroAuto(nomeBairroRep);
      }
      console.log(r);
    };


    // tslint:disable-next-line: prefer-for-of
    for (let x = 0; x < this.servico.getListaCidades().length; x++) {
      console.log('Loop');
      console.log(this.servico.getListaCidades()[x]);

      if (this.servico.getListaCidades()[x].nome === nomeCidade) {
        this.crud.post_api('bairros', accallback, this.servico.getListaCidades()[x]);
        statusCidade = true;
        return this.servico.getListaCidades()[x];
      }

    }
    if (statusCidade === false) { this.servico.mostrarMensagem('Cidade não selecionada. ' + nomeCidade); }
  }

  selecionaBairroAuto(nomeBairro: string) {
    for (const key in this.servico.getListaBairros()) {
      if (this.servico.getListaBairros()[key].nome === nomeBairro) {
        this.iniciaFormCadastroPedeai(this.objCidade, this.servico.getListaBairros()[key]);
      }
    }
  }


  carregaTaxa(itembairro: any) {
    try {
    console.log(itembairro);
    let coordendasBairro = '';
    const cidadeNome = this.cidadeClienteSelecionada.nome;
    coordendasBairro = itembairro.lat + ', ' + itembairro.lng;

    const loginres = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.mensagem);
      } else {
        for (const x in this.servico.getListaBairros()) {
          if (this.servico.getListaBairros()[x].id === itembairro.id) {
             this.servico.getListaBairros()[x].taxa = r.taxa_entrega;
             this.servico.getListaBairros()[x].distancia = r.rows[0].elements[0].distance.text;
             this.servico.getListaBairros()[x].duracao = r.rows[0].elements[0].duration.text;
             const txe = r.taxa_entrega.toString().replace('.', ',');
             this.taxaEntregador = txe;
             this.taxaEntregadorText = r.taxa_entrega;
             console.log(this.formCadastroEntrega.value);
             return;
          }
        }
      }
    };
    const data = { cidadeNome, coordendasBairro };
    this.crud.post_api('calc_taxa', loginres, data);
  } catch (e) { this.servico.mostrarMensagem('Não foi possível calcular a taxa de entrega. Tente cadastrar uma nova entrega novamente.'); }
}

}
