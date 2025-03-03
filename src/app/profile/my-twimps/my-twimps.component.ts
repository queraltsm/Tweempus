import { Component } from '@angular/core';
import { TwimpListComponent } from '../../shared/twimp/twimp-list/twimp-list.component';
import { TwimpModel } from '../../shared/twimp/twimp.model';
import { AuthorService } from '../../shared/author/author.service';
import { TwimpService } from '../../shared/twimp/twimp.service';
import { combineLatest, concatMap, of, map } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'tweempus-my-twimps',
  imports: [TwimpListComponent],
  templateUrl: './my-twimps.component.html',
  styleUrl: './my-twimps.component.css'
})
export class MyTwimpsComponent {

    twimpList: TwimpModel[] = [];
  
      constructor(
        private route: ActivatedRoute,
        private authorService: AuthorService,
        private twimpService: TwimpService
      ) { 
        const currentAuthor = this.route.parent!.snapshot.params['id'];
        this.twimpService.getTwimps().pipe(
          concatMap((twimps) => twimps),
          concatMap((twimp) => combineLatest([
            of(twimp),
            this.authorService.getAuthor(twimp.author.id) 
          ])),
          map(([twimp, author]) => {
            twimp.author = author;
            return twimp;
          })
        ).subscribe({
          next: (twimp) => {
            if (twimp.author.id === currentAuthor) { 
              this.twimpList.push(twimp);
            }
          },
          error: (err) => {
            console.error('Error:', err);
          }
        });
      }
  }