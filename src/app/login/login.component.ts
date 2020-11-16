import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  modal_resultado = ""
  username = ''
  password = ''
  invalidLogin = false

  constructor(private router: Router,
    private loginservice: AuthenticationService) { }

  ngOnInit() {
  }

  checkLogin(content) {
    (this.loginservice.authenticate(this.username, this.password).subscribe(
      data => {
        if (data["error"] != null) {
          this.invalidLogin = true
          this.modal_resultado = "Login incorrecto."
          this.loginservice.logOut()
          //this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
        } else {
          this.router.navigate([''])
          this.invalidLogin = false
        }
      },
      error => {
        this.invalidLogin = true
        if (error["status"] == 403) {
          this.modal_resultado = "Acceso denegado."
          this.loginservice.logOut()
        } else {
          this.modal_resultado = "Error desconocido!"
        }
        //this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
      }
    )
    );

  }

}