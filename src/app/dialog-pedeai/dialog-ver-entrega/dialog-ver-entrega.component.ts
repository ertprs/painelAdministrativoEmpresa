import { Component, OnInit } from '@angular/core';
import { ServicoService } from 'src/app/servico.service';
import { DialogCadastroEntregaComponent } from 'src/app/dialog-cadastro-entrega/dialog-cadastro-entrega.component';

@Component({
  selector: 'app-dialog-ver-entrega',
  templateUrl: './dialog-ver-entrega.component.html',
  styleUrls: ['./dialog-ver-entrega.component.css']
})
export class DialogVerEntregaComponent implements OnInit {

  constructor(public servico: ServicoService) { }

  ngOnInit(): void {
  }

  onclickSelcionarEntregaPedeai() {
    this.servico.setStatusEntregaPedeai(true);
    this.servico.mostrarMensagem('Clique em Selecionar entrega do Pedeai para preecher o fomulário');
    this.servico.getDialogapp().close();
  }
}
