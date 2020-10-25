import { ProgressSistemaService } from './progress-sistema.service';
import { Component, OnInit } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ProgressoComponent } from './progresso/progresso.component';

@Component({
  selector: 'app-progress-sistema',
  templateUrl: './progress-sistema.component.html',
  styleUrls: ['./progress-sistema.component.css']
})
export class ProgressSistemaComponent implements OnInit {

  constructor(private bottomSheet: MatBottomSheet, private progServ: ProgressSistemaService) { }

  ngOnInit(): void {

    this.progServ.showProgress.subscribe(data => {
      if (data) {
      this.openBottomSheet();
      }
    });
  }
  openBottomSheet(): void {
    this.bottomSheet.open(ProgressoComponent);
  }

}
