import { Component, OnInit } from '@angular/core';
import { combineLatest, concatMap, of, map } from 'rxjs';

import { AuthorService } from '../shared/author/author.service';
import { TwimpListComponent } from '../shared/twimp/twimp-list/twimp-list.component';
import { TwimpService } from '../shared/twimp/twimp.service';
import { TwimpModel } from '../shared/twimp/twimp.model';

@Component({
  selector: 'tweempus-dashboard',
  imports: [TwimpListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  twimpList: TwimpModel[] = [];

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
          this.twimpService.getFavoritesByAuthor(author.id, twimp.id).pipe(
            map(favorite => favorite ?? false)
          )
        ])
      })
    ).subscribe({
      next: ([twimp, favorite]) => {
        twimp.favorite = favorite;
        this.twimpList.push(twimp);
      }
    })
  }
}