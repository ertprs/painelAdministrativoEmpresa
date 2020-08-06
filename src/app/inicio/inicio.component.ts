import { CrudServicoService } from './../crud-servico.service';
import { Component, OnInit } from '@angular/core';
import { ServicoService } from '../servico.service';
import { DialogEntregadorComponent } from '../dialog-entregador/dialog-entregador.component';
import { MatDialog } from '@angular/material/dialog';
import { InicioService } from './inicio.service';
import { ConfigServicoService } from '../config/config-servico.service';
import { PedidosService } from '../delivery/pedidos/pedidos.service';

declare var google: any;
export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}



@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  lat: any;
  lgn: any;
  listaEntregadoresOnline: any;
  listaEntregas: any;
  renderOptions = { polylineOptions: { strokeColor: '#00000089' }, suppressMarkers: true, draggable: false };
  renderOptions2 = { polylineOptions: { strokeColor: '#b606009e' }, suppressMarkers: true, draggable: false };

  public origin: any;
  public destination: any;

  breakpoint: number;
  constructor(public servico: ServicoService, public dialog: MatDialog, private servInicio: InicioService,
              public config: ConfigServicoService, private crud: CrudServicoService, private servpedidos: PedidosService) { }

  ngOnInit(): void {

    this.origin = { lat: -9.423269, lng: -40.509361 };
    this.destination = { lat: -9.412388, lng: -40.495585 };


    this.breakpoint = (window.innerWidth <= 400) ? 1 : 3;
    this.lat = parseFloat(this.servico.getDadosEmpresa().coordenadas[0]);
    this.lgn = parseFloat(this.servico.getDadosEmpresa().coordenadas[1]);
    this.listaEntregadoresOnline = this.servico.getListaEntregador();
    this.listaEntregas = this.servico.getListaEntregas();

    if (this.config.getStatusAutPede() === false) {
      this.autoAutenticarPedeai();
    }

  }

  getStatusDelivery() {
    return this.servico.getStatusDelivery();
  }



  onMapReady(map: any) {
    console.log(map);
    this.servInicio.setMapa(map);
  }

  getNumber(dados: any) {
    const numero = parseFloat(dados);
    return numero;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 3;
  }


  onclickImagemEnt(dadosEntrega: any) {
    console.log(dadosEntrega);
    this.servInicio.setEntregadorEntrega(dadosEntrega.entregador);

    const dialogRef = this.dialog.open(DialogEntregadorComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  autoAutenticarPedeai() {
    if (!this.servico.getDadosEmpresa().config) { return; }

    console.log('#onclickVerEntrega');
    const loginres = () => {
      console.log('callback');
      const r = this.servico.getRespostaApi();
      console.log(r);
      if (r.erro === true) {
        this.servico.mostrarMensagem(r.mensagem);
      } else {
        if (r.code === 1) {
          this.servico.mostrarMensagem(r.details.info.restaurant_name + ' autenticado com o Pede.ai');
          this.config.setStatusAutPede(true);
          // this.statusAutenticadoPedeai = true;
          // this.restauranteNomePedeai = r.details.info.restaurant_name;
        } else {
          this.servico.mostrarMensagem('Não foi possível autenticar ao Pede.ai');
        }
      }
    };
    this.crud.post_api('pedeai&tipo=login', loginres, {
      username: this.servico.getDadosEmpresa().config.details.info.username,
      password: this.servico.getDadosEmpresa().config.details.info.password,
    });
  }



}
