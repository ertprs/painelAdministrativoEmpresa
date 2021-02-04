import { FormGroup, FormBuilder } from '@angular/forms';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appearance, GermanAddress, Location } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-selecionar-motoboy-entrega',
  templateUrl: './selecionar-motoboy-entrega.component.html',
  styleUrls: ['./selecionar-motoboy-entrega.component.css']
})
export class SelecionarMotoboyEntregaComponent implements OnInit {

  itens: any;
  itemSelecionado: any;
  pedido: any;
  cidadeClienteSelecionada: any;
  statusLoaderBairros = false;
  bairros: Array<any>;
  bairroGoogleApi: string;
  form: FormGroup;
  gerarRota = false;
  statusConsultaEnt = false;
  statusAddRota = false;
  statusLoaderTaxa = false;

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  public cidades: [];

  constructor(public dialogRef: MatDialogRef<SelecionarMotoboyEntregaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public servico: ServicoService, private crud: CrudServicoService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pedido = this.data;
    this.cidades = this.servico.getListaCidades();
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
      uf: [''],
    });

    this.form.controls.cidade.statusChanges.subscribe( (data) => {
      this.selectionChangeCidade(this.form.controls.cidade.value);
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
    this.crud.post_api('entsEstoque', accallback, { idPedido: this.pedido, listaEntregadores: this.servico.getListaEntregador() });
  }

  onClickItem(item) {
    if (this.pedido && !item.status_estoque) { this.servico.mostrarMensagem('Entregador sem estoque'); return; }
    this.itens.forEach(element => {
      if (element.id === item.id) { element.selecionado = true; this.itemSelecionado = item; } else { element.selecionado = false; }
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
    this.crud.post_api('enviaEntregaEntregador', accallback, { idEntregador: this.itemSelecionado, idPedido: this.pedido }, true);
  }

  criarRota() {
    if (!this.itemSelecionado) { this.servico.mostrarMensagem('Selecione o entregador'); return; }
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




  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }


  onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.form.controls.rua.setValue(result.address_components[0].long_name);
    this.cidades.forEach((element: { nome: string, id: string }) => {
      console.log('Nome cidade google' + result.address_components[2].long_name);
      if (element.nome === result.address_components[2].long_name) {
        this.form.controls.cidade.setValue(element);
        this.bairroGoogleApi = result.address_components[1].long_name;
        this.form.controls.uf.setValue(result.address_components[3].short_name);

      }
    });
    // this.form.controls.rua.setValue(result[0].long_name);
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


  carregaTaxa(itembairro: any) {
    try {
      console.log(itembairro);
      let coordendasBairro = '';
      const cidadeNome = this.cidadeClienteSelecionada.nome;
      coordendasBairro = itembairro.lat + ', ' + itembairro.lng;

      const fcallb = () => {
        this.statusLoaderTaxa = false;
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
              console.log(this.form.value);

              return;
            }
          }
        }
      };
      this.statusLoaderTaxa = true;
      const data = { cidadeNome, coordendasBairro };
      this.crud.post_api('calc_taxa', fcallb, data);
    } catch (e) { this.servico.mostrarMensagem('Não foi possível calcular a taxa de entrega. Tente cadastrar uma nova entrega novamente.'); }
  }

}
