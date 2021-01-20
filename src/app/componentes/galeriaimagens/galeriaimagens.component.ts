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

  constructor(private crud: CrudServicoService, public servico: ServicoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.f5();
  }

  selecionarImagem(element: any) {
    this.item.imagem = element.url;
    this.fcallb.emit(this.item);
  }

  f5() {
    this.crud.get_api('galeria').subscribe(data => {
       this.itens = data;
    });
}



}
