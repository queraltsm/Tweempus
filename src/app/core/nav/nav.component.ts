import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'tweempus-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  idAuthor: string | null = null;

  constructor(private authService: AuthenticationService) { }

  checkLogin() {
    if (this.authService.token != null) {
      this.idAuthor = this.authService.token.idAuthor;
      return true;
    }
    this.idAuthor = null;
    return false;
  }
}
