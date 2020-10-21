import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tela3',
  templateUrl: './tela3.component.html',
  styleUrls: ['./tela3.component.css']
})
export class Tela3Component implements OnInit {

  constructor(public dialogRef: MatDialogRef<Tela3Component>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
  }

}
