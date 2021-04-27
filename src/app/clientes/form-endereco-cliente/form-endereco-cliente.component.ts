import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {Appearance, GermanAddress, Location} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-form-endereco-cliente',
  templateUrl: './form-endereco-cliente.component.html',
  styleUrls: ['./form-endereco-cliente.component.css']
})
export class FormEnderecoClienteComponent implements OnInit {

  cidadeClienteSelecionada: any;
  statusLoaderBairros = false;
  form: FormGroup;
  statusBt = false;

  statusLoaderTaxa = false;

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  public cidades: [];
  public bairros: [];
  public bairroGoogleApi: string;

  constructor(public servico: ServicoService, private crud: CrudServicoService, private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any,  public dialogRef: MatDialogRef<FormEnderecoClienteComponent>) { }

  ngOnInit(): void {

    this.cidades = this.servico.getListaCidades();

    this.form = this.fb.group({
      email: [this.data.item.email],
      rua: [null],
      numero: [null],
      tiporesidencia: [null],
      complemento: [null],
      cidade: [null],
      bairro: [null],
      telefone: [this.data.item.telefone],
      tabela: [this.data.item.tabela],
    });

    this.form.controls.cidade.statusChanges.subscribe( (data) => {
      this.selectionChangeCidade(this.form.controls.cidade.value);
    });
    
  }



  addEndereco() {
    this.statusBt = true;
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); this.statusBt = false; } else {
        this.servico.mostrarMensagem(r.resultado.mensagem);
        this.dialogRef.close(true);
      }
      console.log(r);
    };
    this.crud.post_api('add_end_usuario', accallback, this.form.value);
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
