import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, map, throwError } from 'rxjs';
import { AuthorModel } from './author.model';
import { environment } from '../../../environments/environment';

type DBAuthor = {
  id: string;
  fullName: string;
  image: string;
}

type DBFavoriteEntry = {
  id: string;
  twimps: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private url: string = `${environment.url}/authors`;
  private urlFavorite: string = `${environment.url}/author-favorites`;

  constructor(private httpClient: HttpClient) { }

  getAuthor(id: string): Observable<AuthorModel> {

    return this.httpClient.get<AuthorModel>(this.url + "/" + id).pipe(
      map(dbAuthor => {
        const author = new AuthorModel(dbAuthor.id);
        author.fullName = dbAuthor.fullName;
        author.image = dbAuthor.image;
        return author;
      }),
      catchError(this.handleError)
    )
  }

  setAuthor(idAuthor: string, fullName: string, image: string): Observable<DBAuthor> {
    const dbAuthor: DBAuthor = { 'id': idAuthor, 'fullName': fullName, 'image': image };
    return this.httpClient.post<DBAuthor>(this.url, dbAuthor).pipe(
      catchError(this.handleError)
    );
  }

  createFavorite(idAuthor: string): Observable<DBFavoriteEntry> {
    const dbAuthorFav: DBFavoriteEntry = { 'id': idAuthor, 'twimps': [] };
    return this.httpClient.post<DBFavoriteEntry>(this.urlFavorite, dbAuthorFav).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    console.log(errMsg);
    return throwError(() => errMsg);
  }
}