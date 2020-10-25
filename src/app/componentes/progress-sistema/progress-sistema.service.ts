import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProgressSistemaService {
  public showProgress = new EventEmitter<boolean>();
  constructor() { }
}
