import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, concatMap, filter, map, Observable, throwError, toArray } from 'rxjs';
import { TwimpModel } from './twimp.model';
import { AuthorModel } from '../author/author.model';
import { environment } from '../../../environments/environment';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

type DBTwimp = {
  author: string;
  by: string;
  content: string;
  id: string;
  timestamp: string;
}

type DBAuthorFavoritesTwimps = {
  id: string;
  twimps: string[];
}

@Injectable({
  providedIn: 'root'
})
export class TwimpService {

  private url: string = `${environment.url}/twimps`;
  private urlFavorite: string =  `${environment.url}/author-favorites`;

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

  setTwimp(twimp: TwimpModel): Observable<DBTwimp> {
    const dbTwimp: DBTwimp = {
      'id': twimp.id,
      'author': twimp.author.id,
      'by': twimp.author.fullName,
      'content': twimp.content,
      'timestamp': twimp.timestamp
    };

    return this.httpClient.post<DBTwimp>(this.url, dbTwimp).pipe(
      catchError(this.handleError)
    );
  }

  getAuthorTwimps(idAuthor: string): Observable<TwimpModel[]> {
    return this.httpClient.get<DBTwimp[]>(this.url).pipe(
      concatMap((dbTwimpList) => dbTwimpList),
      filter((getTwimp) => getTwimp.author === idAuthor),
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
        const authorIndex = dbTwimpList.findIndex(t => t.id === idAuthor);
        if (authorIndex === -1) {
          alert("Author not found");
          return of(false);
        }

        let authorFavTwimps = [...dbTwimpList[authorIndex].twimps];
        if (authorFavTwimps.includes(idTwimp)) {
          authorFavTwimps = authorFavTwimps.filter(twimp => twimp !== idTwimp);
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
