import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CrudServicoService } from '../crud-servico.service';
import { ServicoEntregaService } from '../entregas/servico-entrega.service';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-rotas-entregador',
  templateUrl: './rotas-entregador.component.html',
  styleUrls: ['./rotas-entregador.component.css']
})
export class RotasEntregadorComponent implements OnInit {

  displayedColumns: string[] = ['id', 'imagem', 'nome_entregador', 'endereco', 'descricao', 'bts'];


  constructor(public dialog: MatDialog, public servico: ServicoService, private crud: CrudServicoService, private router: Router,
    private antServico: ServicoEntregaService) { }

  ngOnInit(): void {
  }

}
