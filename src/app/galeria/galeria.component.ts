import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoService } from '../servico.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.component.html',
  styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4'];
  itens = [];


  constructor(private crud: CrudServicoService, private servico: ServicoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.f5();
  }

  f5() {
    this.crud.get_api('galeria').subscribe(data => {
       console.log(data);
       this.itens = data;
    });
}

rmImagem(item: any) {

  const cback = () => {
    const r = this.servico.getRespostaApi();
    if (r.erro === true) {
      this.servico.mostrarMensagem(r.mensagem);
    } else {
      this.f5();
      this.servico.mostrarMensagem(r.mensagem);
    }
  };
  this.crud.post_api('remover_img_galeria', cback, item);
}

}
