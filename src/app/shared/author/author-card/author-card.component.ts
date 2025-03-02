import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorModel } from '../author.model';
@Component({
  selector: 'tweempus-author-card',
  imports: [RouterModule],
  templateUrl: './author-card.component.html',
  styleUrl: './author-card.component.css'
})
export class AuthorCardComponent {
  @Input({ required: true }) author!: AuthorModel;

}
