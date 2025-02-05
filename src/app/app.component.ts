import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./core/header/header.component";
import { NavComponent } from "./core/nav/nav.component";

@Component({
  selector: 'tweempus-root',
  imports: [RouterOutlet, HeaderComponent, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'tweempus';
}
