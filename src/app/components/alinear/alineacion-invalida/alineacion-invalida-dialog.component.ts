import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Jugador } from 'src/app/shared/shared';

@Component({
  selector: 'app-alineacion-dialog',
  templateUrl: './alineacion-invalida-dialog.component.html',
  styleUrls: ['./alineacion-invalida-dialog.component.css']
})
export class AlineacionInvalidaDialog implements OnInit {

  constructor(public dialogRef: MatDialogRef<AlineacionInvalidaDialog>,
    @Inject(MAT_DIALOG_DATA) public data: { alineacion: Jugador[] }) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

}
