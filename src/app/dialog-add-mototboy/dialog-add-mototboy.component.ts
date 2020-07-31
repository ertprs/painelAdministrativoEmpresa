import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servico.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CrudServicoService } from '../crud-servico.service';

@Component({
  selector: 'app-dialog-add-mototboy',
  templateUrl: './dialog-add-mototboy.component.html',
  styleUrls: ['./dialog-add-mototboy.component.css']
})
export class DialogAddMototboyComponent implements OnInit {

  formCadastroMotoboy: FormGroup;
  constructor(public servico: ServicoService, private formBuilder: FormBuilder, private crud: CrudServicoService) { }

  ngOnInit(): void {
    this.ini();
  }

  private ini() {
    console.log(this.servico.getDadosEmpresa());
    this.formCadastroMotoboy = this.formBuilder.group({
      nome: [null],
      telefone: [null],
    });
  }

  onclickCadastroMotoboy() {
    const accallback = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      if (r.erro === true) { this.servico.mostrarMensagem(r.detalhes); } else {
        this.servico.mostrarMensagem(r.detalhes);
        this.servico.setMotoboysEmpresa(r.resultado);
        this.servico.getDialogapp().close();
      }
      this.servico.mostrarMensagem(r.detalhes);
    };
    this.crud.post_api('add_ent_lista_emp', accallback, this.formCadastroMotoboy.value);
  }



}
