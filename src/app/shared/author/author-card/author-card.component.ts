import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthorModel } from '../author.model';
import { AuthorService } from '../author.service';
@Component({
  selector: 'tweempus-author-card',
  imports: [RouterModule],
  templateUrl: './author-card.component.html',
  styleUrl: './author-card.component.css'
})
export class AuthorCardComponent {
  author!: AuthorModel;
  userid = localStorage.getItem("user-loggedin");

  constructor(private authorService: AuthorService){}

  ngOnInit() {
    if (this.userid) {
      this.authorService.getAuthor(this.userid).subscribe({
        next: (author) => {
          this.author = author;
        },
        error: (err) => {
          console.error('Error obtaining the author', err);
        }
      });
    }
  }
}
