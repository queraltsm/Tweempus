import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'tweempus-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  idAuthor: string | null = null;

  constructor() { }

  checkLogin() {
    if (localStorage.getItem("token-loggedin") != null) {
      this.idAuthor =  localStorage.getItem("user-loggedin");
      return true;
    }
    this.idAuthor = null;
    return false;
  }
}
