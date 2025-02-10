import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, concatMap, map, toArray, catchError, throwError, of, switchMap } from 'rxjs';
import { TwimpModel } from './twimp.model';
import { AuthorModel } from '../author/author.model';

type DBTwimp = {
  author: string;
  by: string;
  content: string;
  id: string;
  timestamp: string;
  favorite: boolean;
}

type DBAuthorFavoritesTwimps = {
  id: string;
  twimps: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TwimpService {

  private url: string = 'http://localhost:3000/twimps';
  private urlFavorite: string = 'http://localhost:3000/author-favorites';

  constructor(private httpClient:HttpClient) { }

  getTwimps(): Observable<TwimpModel[]> {
    return this.httpClient.get<DBTwimp[]>(this.url).pipe(
      concatMap((dbTwimpList) => dbTwimpList),
      map((getTwimp) => {
        const twimp = new TwimpModel(
          getTwimp.id,
          new AuthorModel(getTwimp.author),
          getTwimp.content,
          getTwimp.timestamp
        );
        return twimp;
      }),
      toArray(),
      catchError(this.handleError)
    );
  }

  getFavoritesByAuthor(idAuthor: string, idTwimp: string): Observable<boolean> {
    return this.httpClient.get<DBAuthorFavoritesTwimps>(this.urlFavorite + '/' + idAuthor).pipe(
      map((response) => response.twimps.includes(idTwimp) ? true : false),
      catchError(this.handleError)
    );
  }


  saveFavorite(updatedData: DBAuthorFavoritesTwimps): Observable<boolean> {
    return this.httpClient.patch<DBAuthorFavoritesTwimps>(
      this.urlFavorite + "/" + updatedData.id,
      {twimps: updatedData.twimps},
      { headers: { 'Content-Type': 'application/json' } }
    ).pipe(
      map(() => {
        return true;
      }),
      catchError(error => {
        this.handleError(error);
        return of(false);
      })
    );
  }
  
  editFavorite(idAuthor: string, idTwimp: string): Observable<boolean> {
    return this.httpClient.get<DBAuthorFavoritesTwimps[]>(this.urlFavorite).pipe(
      switchMap((dbTwimpList) => {
        const twimpIndex = dbTwimpList.findIndex(t => t.id === idAuthor);
        if (twimpIndex === -1) {
          alert("Author not found");
          return of(false);
        }
        const authorFavTwimps = dbTwimpList[twimpIndex].twimps;
        if (authorFavTwimps.includes(idTwimp)) {
          authorFavTwimps.splice(twimpIndex, 1);
        } else {
          authorFavTwimps.push(idTwimp);
        }
        const updatedData = {
          id: idAuthor,
          twimps: authorFavTwimps
        };
        return this.saveFavorite(updatedData);
      }),
      catchError((error) => {
        this.handleError(error);
        return of(false);
      })
    );
  }
  

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return throwError(() => errMsg);
  }
}
