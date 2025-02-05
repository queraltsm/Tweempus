import { Component } from '@angular/core';
import { AuthorCardComponent } from '../shared/author/author-card/author-card.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'tweempus-profile',
  imports: [AuthorCardComponent, RouterOutlet],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
