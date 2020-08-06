import { PedidosService } from './../delivery/pedidos/pedidos.service';
import { Injectable } from '@angular/core';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class InicioService {
  private entregadorEntrega: any;
  line: any;
  map: any;
  directionsService: any;


  constructor() { }


  setEntregadorEntrega(entregador: any) { this.entregadorEntrega = entregador; }
  getEntregadorEntrega() { return this.entregadorEntrega; }


  setMapa(map: any) {
    this.map = map;
    // this.criaRota();
  }

  criaRota(coordenadasOrigem: any, coordenadasDestino: any) {

    // const start = new google.maps.LatLng(-9.423269, -40.509361);
    const start = new google.maps.LatLng(coordenadasOrigem[0], coordenadasOrigem[1]);
    // const end = new google.maps.LatLng(-9.412388, -40.495585);
    const end = new google.maps.LatLng(coordenadasDestino[0], coordenadasDestino[1]);
    this.line = new google.maps.Polyline({
      strokeOpacity: 0.5,
      path: [],
      map: this.map
    });
    this.line = new google.maps.Polyline({
      strokeOpacity: 0.5,
      path: [],
      map: this.map
    });
    const request = {
      origin: start,
      destination: end,
      travelMode: google.maps.TravelMode.BICYCLING
    };
    this.directionsService = new google.maps.DirectionsService();
    this.directionsService.route(request, (response, status) => {
      // Empty response as API KEY EXPIRED
      console.log(response);
      if (status === google.maps.DirectionsStatus.OK) {
        const legs = response.routes[0].legs;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < legs.length; i++) {
          const steps = legs[i].steps;
          // tslint:disable-next-line: prefer-for-of
          for (let j = 0; j < steps.length; j++) {
            // tslint:disable-next-line: prefer-const
            const nextSegment = steps[j].path;
            // tslint:disable-next-line: prefer-for-of
            for (let k = 0; k < nextSegment.length; k++) {
              this.line.getPath().push(nextSegment[k]);
              console.error('------------------------------------');
              console.log(this.line);
            }
          }
        }
        // this.initRoute();
      }
    });
  }






}
