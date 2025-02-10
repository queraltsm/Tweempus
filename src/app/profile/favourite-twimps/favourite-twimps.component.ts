import { Component } from '@angular/core';
import { TwimpListComponent } from '../../shared/twimp/twimp-list/twimp-list.component';
import { TwimpModel } from '../../shared/twimp/twimp.model';
import { AuthorService } from '../../shared/author/author.service';
import { TwimpService } from '../../shared/twimp/twimp.service';
import { combineLatest, concatMap, of, map } from 'rxjs';
@Component({
  selector: 'tweempus-favourite-twimps',
  imports: [TwimpListComponent],
  templateUrl: './favourite-twimps.component.html',
  styleUrl: './favourite-twimps.component.css'
})
export class FavouriteTwimpsComponent {

  twimpList: TwimpModel[] = [];
  currentAuthor = localStorage.getItem("user-loggedin") ?? '';

    constructor(
      private authorService: AuthorService,
      private twimpService: TwimpService
    ) { }
  

  ngOnInit() {
    this.twimpService.getTwimps().pipe(
      concatMap((twimps) => twimps),
      concatMap((twimp) => combineLatest([
        of(twimp),
        this.authorService.getAuthor(twimp.author.id)
      ])),
      concatMap(([twimp, author]) => {
        twimp.author = author;
        return combineLatest([
          of(twimp),
          this.twimpService.getFavoritesByAuthor(this.currentAuthor, twimp.id).pipe(
            map(favorite => favorite ?? false)
          )
        ])
      })
    ).subscribe({
      next: ([twimp, favorite]) => {
        if (favorite) {
          this.twimpList.push(twimp);
          twimp.favorite = favorite;
        }
      }
    })
  }
}
