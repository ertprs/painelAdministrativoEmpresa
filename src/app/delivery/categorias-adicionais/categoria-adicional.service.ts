import { Injectable } from '@angular/core';
import { ServicoService } from 'src/app/servico.service';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { DialogCadastroCategoriaAdcService } from '../dialogs/dialog-categoria-adicional/dialog-cadastro-categoria-adc.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaAdicionalService {

  private categorias: any;

  constructor(private servapp: ServicoService, private crud: CrudServicoService, private servcatadc: DialogCadastroCategoriaAdcService) { }

  consultaCategoriasAdicionais() {
    console.log('#consultaEntregas');
    this.crud.get_api('consulta_cat_adc&id=' + this.servapp.getDadosEmpresa().id).subscribe(data => {
      console.log(data);

      this.categorias = data;
    });
  }

  removeCategoriasAdicionais(item) {
    console.log('#removeCategoriasAdicionais');
    // tslint:disable-next-line: max-line-length
    this.crud.get_api('remove_cat_adc&id_empresa=' + this.servapp.getDadosEmpresa().id + '&id_categoria=' + item.id).subscribe(data => {
      console.log(data);

      this.categorias = data.lista;
    });
  }


  attStatusItem(item) {
    if (item.disponivel) { item.statusatt = false; } else { item.statusatt = true; }
    const callbfun = () => {
      console.log('callback');
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.detalhes);
      } else {

      }
    };
    this.crud.post_api('att_status_cat_adicional', callbfun, item );
  }

  getCategoriasAdicional() {
    return this.categorias;
  }
  setCategoriasAdicional(lista: []) {
    console.log('setCategoriasAdicional');
    this.categorias = lista;
  }
}
