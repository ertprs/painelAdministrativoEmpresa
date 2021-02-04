import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-promocao',
  templateUrl: './promocao.component.html',
  styleUrls: ['./promocao.component.css']
})
export class PromocaoComponent implements OnInit {


  form: FormGroup;
  statusBt = false;
  statuIN = true;
  constructor(private fb: FormBuilder, private crud: CrudServicoService,
              public servico: ServicoService) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      desconto: [0],
      statusPromocao: [false],
      di: ['1993-06-10'],
      df: ['2021-06-10'],
    });
    this.form.controls.statusPromocao.valueChanges.subscribe(
      data => {
        this.statuIN = data;
      }
    );
    this.carregaPromocao();
  }

  onClickSalvar() {
    this.statusBt = true;
      // append your data
    const a = () => {
        const r = this.servico.getRespostaApi();
        if (r.erro) {
          this.servico.mostrarMensagem(r.detalhes);
          this.statusBt = false;
        } else {
          this.servico.mostrarMensagem(r.detalhes);
        }

      };
    this.crud.post_api('attPromocao', a, this.form.value, false);

  }

  carregaPromocao() {
    this.statusBt = true;
    const a = () => {
        const r = this.servico.getRespostaApi();
        if (r.erro) {
                    this.statusBt = false;
        } else {
          this.statusBt = false;
          this.form = this.fb.group({
            desconto: [r.resultado.desconto],
            statusPromocao: [r.resultado.statusPromocao],
            di: [r.resultado.di],
            df: [r.resultado.df],
          });
        }

      };
    this.crud.post_api('promocao', a, '', true );

  }
}
