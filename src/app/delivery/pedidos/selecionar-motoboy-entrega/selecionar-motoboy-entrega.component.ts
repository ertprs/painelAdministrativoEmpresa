import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-selecionar-motoboy-entrega',
  templateUrl: './selecionar-motoboy-entrega.component.html',
  styleUrls: ['./selecionar-motoboy-entrega.component.css']
})
export class SelecionarMotoboyEntregaComponent implements OnInit {

  itens: any;
  itemSelecionado: any;
  pedido: any;
  cidadeClienteSelecionada: string;
  statusLoaderBairros = false;
  bairros: Array<any>;
  bairroGoogleApi: string;
  form: FormGroup;
  gerarRota = false;
  statusConsultaEnt = false;
  statusAddRota = false;

  constructor(public dialogRef: MatDialogRef<SelecionarMotoboyEntregaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public servico: ServicoService, private crud: CrudServicoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pedido = this.data;

    if (this.pedido) {
      /* Consulta os entregagores que tem estoque para o pedido selecionado */
      this.consultaEntComEstoque();
    } else {
      /* Lista os entregadores que estão online */
      this.itens = this.servico.getListaEntregador();
      
    }

    this.servico.getListaEntregador().forEach(element => {
       element.selecionado = false;   
       this.itemSelecionado = false;
    });

    this.form = this.fb.group({
      rua: [''],
      numero: [''],
      bairro: [''],
      cidade: [''],
      entregador: [''],
      descricao: [''],
    }); 

  }

  consultaEntComEstoque() {
      this.statusConsultaEnt = true;

    const accallback = () => {
      this.statusConsultaEnt = false;

      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
         this.itens = r.resultado;
      }
    };
    this.crud.post_api('entsEstoque', accallback, {idPedido: this.pedido, listaEntregadores: this.servico.getListaEntregador()});
  }

  onClickItem(item) {
    if (this.pedido && !item.status_estoque) {  this.servico.mostrarMensagem('Entregador sem estoque'); return; }
    this.itens.forEach(element => {
      if (element.id === item.id) { element.selecionado = true; this.itemSelecionado = item; } else { element.selecionado = false;   }
    });
  }

  onClickConfirmar() {
    // Enviar a entrega ao motoboy
    const accallback = () => {
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.dialogRef.close();
      }
    };
    this.crud.post_api('enviaEntregaEntregador', accallback, {idEntregador: this.itemSelecionado, idPedido: this.pedido}, true);
  }

  criarRota() {
    if (!this.itemSelecionado) {  this.servico.mostrarMensagem('Selecione o entregador'); return; }
    this.gerarRota = true;
    this.itens = [];
    this.itens[0] = this.itemSelecionado; 
  }

  enviarRota() {

    this.form.value.entregador = this.itemSelecionado;

    this.statusAddRota = true;
    const accallback = () => {
       
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); this.statusAddRota = false; } else {

        this.servico.mostrarMensagem(r.detalhes);
        this.dialogRef.close();

      }
    };
    this.crud.post_api('addRota', accallback, this.form.value);

  }

  selectionChangeCidade(item: any) {
    console.log('#selectionChangeCidade');
    console.log(item);

    this.cidadeClienteSelecionada = item;
    this.statusLoaderBairros = true;

    const accallback = () => {
      console.log('callback');
      this.statusLoaderBairros = false;
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.mensagem); } else {

        this.bairros = r;

        this.bairros.forEach((element: { nome: string, id: string }) => {
          if (element.nome === this.bairroGoogleApi) {
           this.form.controls.bairro.setValue(element);
          }
       });

      }
      console.log(r);
    };
    this.crud.post_api('bairros', accallback, this.cidadeClienteSelecionada);

  }

}
