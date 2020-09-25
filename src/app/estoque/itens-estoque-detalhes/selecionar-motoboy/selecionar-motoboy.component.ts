import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-selecionar-motoboy',
  templateUrl: './selecionar-motoboy.component.html',
  styleUrls: ['./selecionar-motoboy.component.css']
})
export class SelecionarMotoboyComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<SelecionarMotoboyComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data);
  }

  onClick(item) {
    setTimeout(() => {
      this.dialogRef.close(item);
    }, 500);
  }

}
