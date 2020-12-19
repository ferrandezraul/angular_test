import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-log-out-dialog',
  templateUrl: './log-out-dialog.component.html',
  styleUrls: ['./log-out-dialog.component.css']
})
export class LogOutDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogOutDialog>,
              @Inject(MAT_DIALOG_DATA) public data: { name: string }) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

}
