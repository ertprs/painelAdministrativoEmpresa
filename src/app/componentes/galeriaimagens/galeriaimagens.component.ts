import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-galeriaimagens',
  templateUrl: './galeriaimagens.component.html',
  styleUrls: ['./galeriaimagens.component.css']
})
export class GaleriaimagensComponent implements OnInit {

  itens = [];
  imagemSelecionada = false;
  mostrarJanela = true;
  @Input() item: any;
  @Output() fcallb = new EventEmitter();
  @Output() fechar = new EventEmitter();

  constructor(private crud: CrudServicoService, public servico: ServicoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.f5();
  }

  statusUPIMagem(event) {
    console.log('PICA');
    console.log(event);
    if (!event.erro) {
      console.log('consulta galeira');
      this.f5();
    }
  }

  selecionarImagem(element: any) {
    this.item.imagem = element.url;
    this.fcallb.emit(this.item);
  }

  ff(status: any) {
    this.fechar.emit(status);
  }


  f5() {
    this.crud.get_api('galeria').subscribe(data => {
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
