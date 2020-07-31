import { ServicoService } from './../servico.service';
import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from '../crud-servico.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServicoEntregaService } from '../entregas/servico-entrega.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogVerEntregaComponent } from './dialog-ver-entrega/dialog-ver-entrega.component';

@Component({
  selector: 'app-dialog-pedeai',
  templateUrl: './dialog-pedeai.component.html',
  styleUrls: ['./dialog-pedeai.component.css']
})
export class DialogPedeaiComponent implements OnInit {
  public btAstatus: boolean;
  public formRefPede: FormGroup;
  public dadosEntregaPedeai: any;
  dialogPedeai: any;
  constructor(private crud: CrudServicoService, private servico: ServicoService, private formBuilder: FormBuilder,
              private servivoEntrega: ServicoEntregaService,  public dialog: MatDialog) { }

  ngOnInit(): void {
    this.iniciaFormRef();
  }

  onclickCVerEntregaPedeai() {
    this.dialogPedeai = this.dialog.open(DialogVerEntregaComponent, {
      width: '550px',
    });
    this.servico.setDialogapp(this.dialogPedeai);
  }

  onclickVerEntrega() {
    console.log('#onclickVerEntrega');
    console.log(this.formRefPede.value);
    this.btAstatus = true;
    const loginres = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      this.servivoEntrega.getDialog().close();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.mensagem);
      } else {
        setTimeout(() => {
          this.servico.setEntregaPedeAi(r.details);
          this.onclickCVerEntregaPedeai();
        }, 700);
      }
    };
    this.crud.post_api('pedeai&tipo=ver_pedido', loginres, this.formRefPede.value );
  }

  iniciaFormRef() {
    this.formRefPede = this.formBuilder.group({ ref: [null] });
  }

}
