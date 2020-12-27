import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Jugador } from 'src/app/shared/shared';

@Component({
  selector: 'app-alineacion-dialog',
  templateUrl: './alineacion-dialog.component.html',
  styleUrls: ['./alineacion-dialog.component.css']
})
export class AlineacionDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlineacionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { alineacion: Jugador[] }) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

}
