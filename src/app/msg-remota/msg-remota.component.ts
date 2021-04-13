import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-msg-remota',
  templateUrl: './msg-remota.component.html',
  styleUrls: ['./msg-remota.component.css']
})
export class MsgRemotaComponent implements OnInit {

  html = '';
  constructor(public dialogRef: MatDialogRef<MsgRemotaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.html = this.data;
  }

}
