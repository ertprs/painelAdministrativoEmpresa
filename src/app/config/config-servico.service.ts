import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigServicoService {
private statusRotas: boolean;
private statusRotasEntregador: boolean;
private statusAutenticadoPede = false;
  constructor() { }


setStatusRotas(status: any) {
  console.log(status);
  if (this.statusRotas) { this.statusRotas = false; } else { this.statusRotas = true; }
}
getStatusRotas() {
  return this.statusRotas;
}

iniciarConfig() {
  this.statusRotas = true;
  this.statusRotasEntregador = false;
}
setStatusRotasEntregador(status: any) {
  console.log(status);
  if (this.statusRotasEntregador) { this.statusRotasEntregador = false; } else { this.statusRotasEntregador = true; }
}
getStatusRotasEntregador() {
  return this.statusRotasEntregador;
}

setStatusAutPede(status: any) {
  this.statusAutenticadoPede = status;
}
getStatusAutPede() {
  return this.statusAutenticadoPede;
}

}




