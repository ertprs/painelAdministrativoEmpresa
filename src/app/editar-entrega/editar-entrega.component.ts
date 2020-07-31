import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servico.service';
import { CrudServicoService } from '../crud-servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicoEntregaService } from '../entregas/servico-entrega.service';

type NewType = ServicoEntregaService;

@Component({
  selector: 'app-editar-entrega',
  templateUrl: './editar-entrega.component.html',
  styleUrls: ['./editar-entrega.component.css']
})
export class EditarEntregaComponent implements OnInit {

  cidadeClienteSelecionada: any;
  bairroClienteSelecionada: any;
  formCadastroEntrega: FormGroup;
  constructor(public servico: ServicoService, private crud: CrudServicoService, private formBuilder: FormBuilder,
              private entregaS: ServicoEntregaService) { }

  ngOnInit(): void {
    this.ini();
    this.entregaS.getDialog().close();
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
    this.crud.post_api('bairros', accallback, this.cidadeClienteSelecionada );

  }

  private ini() {
    console.log( this.servico.getDadosEmpresa() );
    this.formCadastroEntrega = this.formBuilder.group({
      id: [this.servico.getEntrega().id],
      nome_cliente: [this.servico.getEntrega().nome_cliente],
      telefone_cliente: [this.servico.getEntrega().telefone_cliente],
      bairro_cliente: [this.bairroClienteSelecionada],
      rua_cliente: [this.servico.getEntrega().rua_cliente],
      numero_cliente: [this.servico.getEntrega().numero_cliente],
      ponto_res_cliente: [this.servico.getEntrega().ponto_res_cliente],
      tipo_res_cliente: [this.servico.getEntrega().tipo_res_cliente],
      valor_pedido_cliente: [this.servico.getEntrega().valor_pedido_cliente],
      tipo_entrega: [this.servico.getEntrega().tipo_entrega],
      taxa_entrega: [this.servico.getEntrega().taxa_entrega],
      forma_pag_cliente: [this.servico.getEntrega().forma_pag_cliente],
      empresa: [this.servico.getEntrega().empresa],
      entregador: [this.servico.getEntrega().entregador],
      coordenada_cliente: [this.servico.getEntrega().coordenada_cliente],
      id_cidade: [this.servico.getEntrega().id_cidade],
      cidade_cliente: [this.servico.getEntrega().cidade_cliente],
    });
  }

  onclickSalvarEntrega(bairro: any) {
    console.log('#onclickSalvarEntrega');
    if (!bairro) { this.servico.mostrarMensagem('Selecione o bairro da entrega'); }
    this.formCadastroEntrega.value.bairro_cliente = bairro;
    try {
    this.formCadastroEntrega.value.id_cidade = this.cidadeClienteSelecionada.id;
    this.formCadastroEntrega.value.cidade_cliente = this.cidadeClienteSelecionada;
    } catch (e) { this.servico.mostrarMensagem('Selecione a cidade da entrega'); }

    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {
        this.servico.mostrarMensagem(r.mensagem);
      }
      console.log(r);
    };
    this.crud.post_api('atualizar_entrega', accallback, this.formCadastroEntrega.value );
  }

}
