import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';

@Component({
  selector: 'app-enderecos-cliente',
  templateUrl: './enderecos-cliente.component.html',
  styleUrls: ['./enderecos-cliente.component.css']
})
export class EnderecosClienteComponent implements OnInit {

  itens: any;
  endereco: any;
  displayedColumns: string[] = ['c0', 'c1', 'c2', 'c3', 'c4', 'c5', 'c6'];


  constructor( public dialogRef: MatDialogRef<EnderecosClienteComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any, private crud: CrudServicoService,
               private servico: ServicoService) { }

  ngOnInit(): void {
    console.log(this.data);
    this.f5();
  }

  f5() {
    this.crud.get_api('end_usuario&email_usuario=' + this.data.item.email + '&telefone=' + this.data.item.telefone).subscribe(data => {
       console.log(data);
       this.itens = data.resultado;
    });
}
selecionarEndereco(element) {
  this.endereco = element;
  this.dialogRef.close();
}

onClickAddEndereco() {
  this.dialogRef.close('add_endereco');
}

rem_endereco(element) {
  element.idendereco = element.id;
  this.dialogRef.close({acao: 'rem_endereco', item: element});
}

}
