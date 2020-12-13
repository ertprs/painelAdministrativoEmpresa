import { UploadimagemService } from './../../../upload-imagem/uploadimagem.service';
import { PedidosService } from './../../pedidos/pedidos.service';
import { Component, OnInit } from '@angular/core';
import { CrudServicoService } from 'src/app/crud-servico.service';
import { ServicoService } from 'src/app/servico.service';
import { CancelarPedidoComponent } from '../../pedidos/cancelar-pedido/cancelar-pedido.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CadastroPedidoService } from '../../pedidos/cadastro-pedido/cadastro-pedido.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-dialog-pedido',
  templateUrl: './dialog-pedido.component.html',
  styleUrls: ['./dialog-pedido.component.css']
})
export class DialogPedidoComponent implements OnInit {

  displayedColumns: string[] = ['status', 'info'];
  detalhespedido: string[] = ['quantidade', 'item', 'observacao', 'adicionais', 'preco', 'total'];/* removi: desconto */
  historico: any;
  produtosPedido: any;
  btCstatus = false;
  loaderPedido = false;

  constructor(public servpedidos: PedidosService, private servapp: ServicoService, private crud: CrudServicoService,
              private dialog: MatDialog, public upimgServ: UploadimagemService, private sercard: CadastroPedidoService,
              private router: Router, public dialogRef: MatDialogRef<DialogPedidoComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
   
  }

  

  onClickAttStatusPedido(statusPedido) {
    this.btCstatus = true;
    const loginres = () => {
      const r = this.servapp.getRespostaApi();
      if (r.erro === true) {
        this.servapp.mostrarMensagem(r.detalhes);
        this.btCstatus = false;
      } else {
        // this.servapp.mostrarMensagem(r.detalhes);
        this.servpedidos.consultaPedidos();
        this.dialog.closeAll();
      }
    };
    const data = { id_pedido: this.servpedidos.getPedido().id, id_empresa: this.servapp.getDadosEmpresa().id, status: statusPedido};
    console.log( this.crud.post_api('att_status_pedido', loginres, data ) );
  }

  onClickEditarPedido(item: any) {
    console.log(item);
    const enderecoCliente = { rua: '', numero: '', bairro: '', cidade: '', complemento: '', tiporesidencia: '' };
    enderecoCliente.rua = item.endereco.rua;
    enderecoCliente.numero = item.endereco.numero;
    enderecoCliente.bairro = item.endereco.bairro;
    enderecoCliente.cidade = item.endereco.cidade;
    enderecoCliente.complemento = item.endereco.complemento;
    enderecoCliente.tiporesidencia = item.endereco.tiporesidencia;

    // this.sercard.iniciaFormCadastro.emit(enderecoCliente);
    this.sercard.limparCarrinho();

    const pedido = {
      id: item.dadoscliente.id,
      nome: item.dadoscliente.nome,
      telefone: item.dadoscliente.telefone,
      rua: item.endereco.rua,
      numero: item.endereco.numero,
      complemento: item.endereco.complemento,
      tiporesidencia: item.endereco.tiporesidencia,
      bairro: item.endereco.bairro,
      cidade: item.endereco.cidade,
      formapagamento: item.endereco.formapagamento,
      canalpedido: '',
      tipopedido: item.endereco.tipopedido,
      troco: item.endereco.troco,
      desconto: item.endereco.desconto,
      taxaentrega: '',
      itens: item.itens
    };

    item.itens.forEach(element => {
    element.total = parseFloat(element.total);
    element.preco = parseFloat(element.preco);
    this.sercard.addItemCarrinho(element);
    });

    this.sercard.setIdPedido(item.id);
    this.sercard.setOrigemPedido(item.origem);
    this.sercard.setStatusAcaoPedido(true);

    this.sercard.setCadastroClienteLista(pedido);
    this.router.navigate(['/painelpedidos/cadastro-pedido']);
    this.dialog.closeAll();
  }





}
