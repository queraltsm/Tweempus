import { Component } from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';

@Component({
  selector: 'tweempus-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthenticationService){}

  logIn() {
    this.authService.logIn('1');
  }

}
