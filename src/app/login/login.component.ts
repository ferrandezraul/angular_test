import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;
  form: FormGroup;

  constructor(private router: Router,
    private loginservice: AuthenticationService,
    private fb: FormBuilder ) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    let username = this.form.get('username').value;
    let password = this.form.get('password').value;

    this.loginservice.authenticate(username, password)
      .subscribe( (response) => {
        console.log('Response to loginService is ', response);

        if (response["error"] != null) {
          this.errorMessage = "No se pudo hacer login";
        } else {
          this.router.navigate(['']);      
        }
      },
      err => {
        this.errorMessage = err;
        console.log('Error in LoginComponent', err);
      })
  }

}