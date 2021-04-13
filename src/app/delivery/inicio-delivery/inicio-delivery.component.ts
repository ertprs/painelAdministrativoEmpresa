import { map } from 'rxjs/operators';
import { DeliveryService } from './../delivery.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { Router } from '@angular/router';
declare var document: any;

@Component({
  selector: 'app-inicio-delivery',
  templateUrl: './inicio-delivery.component.html',
  styleUrls: ['./inicio-delivery.component.css']
})
export class InicioDeliveryComponent implements OnInit {

  listaCidades: any;
  listaCidadesEntrega: any;
  cidadeClienteSelecionada: any;
  formCadastro: FormGroup;
  formcadastroStatus: any;
  btCstatus: boolean;
  public getHrfun: any;
  public metodosPagamento: any;
  public locaisEntrega: any;
  public dadosEmpresa: any;
  private valorSubmit: any;
  public cidadeSelecionada: any;
  public tipoServico: any;
  bbssal = false;
  statusBTloaderTaxas = false;

  constructor(private crud: CrudServicoService, private formBuilder: FormBuilder, public servico: ServicoService,
              private router: Router, public servdelivery: DeliveryService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {


    this.formCadastro = this.formBuilder.group({
      tags: [''],
      pedidomin: [''],
      pedidomax: [''],
      entrega_gratis: [''],
      seguimento: [''],
      formasfuncionamento: [],
      tempoentrega: [''],
      locaisEntrega: [],
      hrfun: [],
      metodosPagamento: [''],
      temporetirada: [''],
    });

    console.log('#CadastroEmpresaComponent');
    this.consultaCidades();
    this.formcadastroStatus = false; // => false
    this.btCstatus = false;
    this.getHrfun = this.servdelivery.getHrfun();
    this.metodosPagamento = this.servdelivery.getFormaspagamento();
    this.locaisEntrega = this.servdelivery.getLocaisEntrega();
    this.dadosEmpresa = this.servico.getDadosEmpresa();
    this.getHrfun = this.dadosEmpresa.hrfun;
    this.tipoServico = this.servico.formasFun;

    this.iniciaForm();
  }

  consultaCidades() {
    console.log('#consultaCidades');
    this.crud.get_api('cidades_server').subscribe(data => {
      if (data.lista === null) { } else {
        this.listaCidades = data.lista_cidades;
        this.listaCidadesEntrega = data.lista_cidades_entrega;
      }
    });
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

  iniciaForm() {
    this.formCadastro = this.formBuilder.group({
      id: [this.servico.getDadosEmpresa().id],
      tags: [this.dadosEmpresa.tags, Validators.required],
      pedidomin: [this.dadosEmpresa.pedidomin, Validators.required],
      pedidomax: [this.dadosEmpresa.pedidomax, Validators.required],
      entrega_gratis: [this.dadosEmpresa.entrega_gratis],
      seguimento: [this.dadosEmpresa.seguimento, Validators.required],
      formasfuncionamento: [''],
      tempoentrega: [this.dadosEmpresa.tempoentrega, Validators.required],
      temporetirada: [this.dadosEmpresa.temporetirada],
      hrfun: this.buildDiasForm(),
      locaisEntrega: this.buildLocaisEntregaForm(),
      metodosPagamento: this.buildFp(),
    });

    

     // async orders
   /*  console.log(this.dadosEmpresa.formasfuncionamento);
    (this.dadosEmpresa.formasfuncionamento).subscribe(orders => {
      this.tipoServico = orders;
      this.formCadastro.controls.formasfuncionamento.patchValue(this.tipoServico[0]);
    });
*/
    if (this.dadosEmpresa.formasfuncionamento) {
    this.tipoServico.forEach(element => {
      if (element.tipo === this.dadosEmpresa.formasfuncionamento.tipo) {
        this.formCadastro.controls.formasfuncionamento.patchValue(element);
       }
    });
  }


  }

  iniciarBuildlocaisEntrega(locais) {
    const valores = locais.map((v, i) => this.createCidade(v));
    this.formCadastro.controls.locaisEntrega = this.formBuilder.array(valores);
  }

  buildDiasForm() {
    const valores = this.dadosEmpresa.hrfun.map((v, i) => this.createItem(v));
    return this.formBuilder.array(valores);
  }

  createItem(data: {nome, abre, fecha, status, id_nome}): FormGroup {
    return this.formBuilder.group({
      nome: data.nome,
      abre: data.abre,
      fecha: data.fecha,
      status: data.status,
      id_nome: data.id_nome,
    });
  }

  buildLocaisEntregaForm() {
    const valores = this.dadosEmpresa.locais_entrega.map((v, i) => this.createCidade(v));
    return this.formBuilder.array(valores);
  }

  createCidade(data: any): FormGroup {
    return this.formBuilder.group({
      id: data.id,
      nome: data.nome,
      disponivel: data.disponivel,
      bairros: this.buildBairro(data.bairros)
    });
  }

  buildBairro(data) {
    const valores = data.map((v, i) => this.createBairro(v));
    return this.formBuilder.array(valores);
  }

  createBairro(data: any): FormGroup {
    return new FormGroup({
      id: new FormControl(data.id),
      cidade_id: new FormControl(data.cidade_id),
      nome: new FormControl(data.nome),
      disponivel: new FormControl(data.disponivel),
      taxa: new FormControl(data.taxa),
      lat: new FormControl(data.lat),
      lng: new FormControl(data.lng),
      distancia: new FormControl(data.distancia),
      duracao: new FormControl(data.duracao),
      taxaPorDist: new FormControl(data.taxaPorDist),
    });
  }

  buildFp() {
   // console.log('config forma de pagamento');
   // console.log(this.dadosEmpresa.formaspagamento);
    const valores = this.dadosEmpresa.formaspagamento.map((v, i) => this.createItemFp(v));
   // console.log(valores);
    return this.formBuilder.array(valores);
  }

  createItemFp(data: any): FormGroup {
   // console.log('data');
    if (!data.itens) { data.itens = []; }
   // console.log(data);

    return new FormGroup({
      id: new FormControl(data.id),
      nome: new FormControl(data.nome),
      descricao: new FormControl(data.descricao),
      disponivel: new FormControl(data.disponivel),
      itens: this.buildItemFp(data.itens),
    });
  }

  buildItemFp(data) {
    try {
    const valores = data.map((v, i) => this.createFp(v));
    return this.formBuilder.array(valores);
    } catch (e) { console.log('????????'); }
  }

  createFp(data: any): FormGroup {
    return new FormGroup({
      id: new FormControl(data.id),
      id_formapagamento: new FormControl(data.id_formapagamento),
      imagem: new FormControl(data.imagem),
      nome: new FormControl(data.nome),
      disponivel: new FormControl(data.disponivel),
    });
  }


  onclickCadastrar() {
   // console.log('#onclickCadastrar');
    this.bbssal = true;
    let arrayLE: any;
    const arrayLocaisEntrega = [];
    arrayLE = this.formCadastro.controls.locaisEntrega.value;
    // tslint:disable-next-line: forin
    for (const a in arrayLE) {
      if (arrayLE[a].disponivel === true) {
        arrayLocaisEntrega.push(arrayLE[a]);
      }

    }
    this.formCadastro.value.locais_entrega = arrayLocaisEntrega;
   // console.log(this.formCadastro.value);
    this.btCstatus = true;
    const loginres = () => {
     // console.log('callback');
      const r = this.servico.getRespostaApi();
     // console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.mensagem);
        this.btCstatus = false;
        this.bbssal = false;
      } else {
       /* this.servico.mostrarMensagem(r.mensagem); */
        this.formcadastroStatus = true;
        this.router.navigate(['/login']);
        setTimeout(() => { location.reload(); }, 700);
      }
    };
    this.crud.post_api('salva_config_delivery_empresa', loginres, this.formCadastro.value );
  }

  cadatroFeito() {
    this.formcadastroStatus = true;
  }


  onClickSelecionarCidadeFiltro(item) {
    // console.log(item);
    this.cidadeSelecionada = item.id;
  }

  selecionartdsb() {
   // seleciona todos os bairros da cidade selecionada
   if (!this.cidadeSelecionada) { this.servico.mostrarMensagem('Selecione a cidade'); return; }
   this.formCadastro.value.locaisEntrega.forEach(cidade => {
    if (this.cidadeSelecionada === cidade.id) {

        console.log(cidade);

        cidade.bairros.forEach(bairro => {
            if (!bairro.disponivel) {
                  document.getElementById('bairro' + bairro.id + '-input').click();
            }
             });
         }
    });
  }

  deselecionartdsb() {
    // seleciona todos os bairros da cidade selecionada
    if (!this.cidadeSelecionada) { this.servico.mostrarMensagem('Selecione a cidade'); return; }
    this.formCadastro.value.locaisEntrega.forEach(cidade => {
     if (this.cidadeSelecionada === cidade.id) {

         console.log(cidade);

         cidade.bairros.forEach(bairro => {
             if (bairro.disponivel) {
                   document.getElementById('bairro' + bairro.id + '-input').click();
             }
              });
          }
     });
   }

  carregaTaxas() {
    if (!this.cidadeSelecionada) { this.servico.mostrarMensagem('Selecione a cidade'); return; }
    this.servico.mostrarMensagem('Aguarde o sistema concluir as configurações...');

    let qtdbairros = 0;
    this.statusBTloaderTaxas = true;
    this.formCadastro.controls.locaisEntrega.value.forEach(cidade => {
      if (this.cidadeSelecionada === cidade.id) {
        cidade.bairros.forEach(bairro => {
            if (bairro.disponivel === true) {
              qtdbairros ++;
            }
        });

        }
     });
     

    let cclloop = 0;
    const guinho = setInterval(() => {
      this.gettaxab(cclloop);
      cclloop++;
      // console.log(cclloop  + ' : ' + qtdbairros);
      if (cclloop > qtdbairros) {
        // salvar novas config locais
        // console.log('Salvar...');
        setTimeout( () =>  {
          this.iniciarBuildlocaisEntrega(this.formCadastro.controls.locaisEntrega.value);
          this.statusBTloaderTaxas = false;
          this.servico.mostrarMensagem('Configurações de bairros concluídas');
        }, 1500);
        clearInterval(guinho);

      }
    }, 1500);

 
}


  gettaxab(index) {
    this.formCadastro.controls.locaisEntrega.value.forEach(cidade => {
      if (this.cidadeSelecionada === cidade.id) {
                try {
                  if (cidade.bairros[index].disponivel) {
                   let coordendasBairro = '';
                   coordendasBairro = cidade.bairros[index].lat + ', ' + cidade.bairros[index].lng;
                   cidade.bairros[index].statusload = true;

                   const loginres = () => {
                    const r = this.servico.getRespostaApi();
                    if (r.erro === true) {
                      this.servico.mostrarMensagem(r.mensagem);
                    } else {
                      try {

                        document.getElementById('taxaEntrega' + cidade.bairros[index].id).value = r.taxa_entrega;
                        cidade.bairros[index].taxa = r.taxa_entrega;
                        cidade.bairros[index].distancia = r.rows[0].elements[0].distance.text;
                        cidade.bairros[index].duracao = r.rows[0].elements[0].duration.text;
                        cidade.bairros[index].taxaPorDist = true;
                        // tslint:disable-next-line: max-line-length
                        this.servico.mostrarMensagem('' + cidade.bairros[index].nome + ' R$' + r.taxa_entrega + ' Distância: ' + r.rows[0].elements[0].distance.text);



                      } catch (e) {
                        cidade.bairros[index].taxaPorDist = false;
                        this.servico.mostrarMensagem('Não foi possível configurar o bairro ' + cidade.bairros[index].nome);
                        console.log('erro', e);
                      }
                    }
                    cidade.bairros[index].statusload = false;

                  };
                   const data = { cidadeNome: cidade.nome , coordendasBairro };
                   this.crud.post_api('calc_taxa', loginres, data);


                  }
                } catch (e) { console.log('Erro Delsuc', e); }

          }

     });

  }

  cancelarpordist(b) {
    console.log(b);

    this.formCadastro.controls.locaisEntrega.value.forEach(cidade => {
      if (this.cidadeSelecionada === cidade.id) {
               cidade.bairros.forEach(bairro => {
                 if (bairro.id === b.id) {
                  bairro.taxaPorDist = false;
                 }
               });
           }
      });

  };



}
