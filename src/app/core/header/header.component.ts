import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
@Component({
  selector: 'tweempus-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private authService: AuthenticationService){}

  checkLogin() {
    if (this.authService.token != null) {
      return true;
    }
    return false;
  }

  logOut() {
    this.authService.logOut();
  }

}
