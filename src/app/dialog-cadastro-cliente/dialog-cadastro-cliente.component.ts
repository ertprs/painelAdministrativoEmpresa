import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormularioUsuarioComponent } from '../usuarios/formulario-usuario/formulario-usuario.component';
import { Appearance, GermanAddress, Location } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-dialog-cadastro-cliente',
  templateUrl: './dialog-cadastro-cliente.component.html',
  styleUrls: ['./dialog-cadastro-cliente.component.css']
})
export class DialogCadastroClienteComponent implements OnInit {

  form: FormGroup;
  cidadeClienteSelecionada: any;
  statusLoaderBairros = false;
  statusLoaderTaxa = false;
  btss = false;

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;
  public cidades: [];
  public bairros: [];
  public bairroGoogleApi: string;
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogCadastroClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public servico: ServicoService, private crud: CrudServicoService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.cidades = this.servico.getListaCidades();

    if (this.data.acao === 'add') {
      this.form = this.fb.group({
        tipo: [null, Validators.required],
        email: [null],
        nome: [null, Validators.required],
        telefone: [null, Validators.required],
        rua: [null, Validators.required],
        numero: [null, Validators.required],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        uf: [null, Validators.required],
        data_aniversario: [null, Validators.required],
        complemento: [null],
      });

    } else {
      this.form = this.fb.group({
        id: [this.data.usuario.id],
        tabela: [this.data.usuario.tabela],
        email: [this.data.usuario.email],
        tipo: [this.data.usuario.tipo],
        nome: [this.data.usuario.nome],
        telefone: [this.data.usuario.telefone],
        rua: [this.data.usuario.rua],
        numero: [this.data.usuario.numero],
        bairro: [this.data.usuario.bairro],
        cidade: [this.data.usuario.cidade],
        uf: [this.data.usuario.uf],
        data_aniversario: [this.data.usuario.data_aniversario],
        complemento: [this.data.usuario.complemento],
      });

    }

    this.form.controls.cidade.statusChanges.subscribe((data) => {
      this.selectionChangeCidade(this.form.controls.cidade.value);
    });

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

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }


  onGermanAddressMapped($event: GermanAddress) {
    console.log('onGermanAddressMapped', $event);
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


  salvar() {
    this.btss = true;
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.detalhes);
        this.btss = false;

      } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.dialogRef.close(true);
      }
      console.log(r);
    };
    this.crud.post_api('add_cliente_lista_emp', accallback, this.form.value);
  }

  editar() {
    this.btss = true;
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.dialogRef.close(true);
      }
      console.log(r);
    };
    this.crud.post_api('att_cliente_lista_emp', accallback, this.form.value);
  }


}
