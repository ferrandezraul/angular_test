import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { LogOutDialog } from './log-out-dialog/log-out-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  nombre_equipo_fb: String = String();
  logOut: boolean = false;

  constructor(public auth: AuthenticationService, 
              public router: Router,
              public dialog: MatDialog ) { }

  ngOnInit(): void {
    this.nombre_equipo_fb = localStorage.getItem('equipoFb'); 
  }

  openLogoutDialog(){
    const dialogRef = this.dialog.open(LogOutDialog, {
      width: '250px',
      data: { name: this.nombre_equipo_fb }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed with result: ${result}`); 
      if(result) {
        console.log("Performing LogOut");
        this.auth.logOut();
        this.router.navigate(["/login"]);
      }
    });
  }

}
