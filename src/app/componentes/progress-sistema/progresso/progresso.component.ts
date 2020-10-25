import { ProgressSistemaService } from './../progress-sistema.service';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-progresso',
  templateUrl: './progresso.component.html',
  styleUrls: ['./progresso.component.css']
})
export class ProgressoComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<ProgressoComponent>, private proServ: ProgressSistemaService) { }

  ngOnInit(): void {
    this.proServ.showProgress.subscribe((data: any) => { 
      if (!data) { 
      this.bottomSheetRef.dismiss();
      } 
    });
  }

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
