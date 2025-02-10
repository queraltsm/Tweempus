import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, map, throwError } from 'rxjs';
import { AuthorModel } from './author.model';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private url: string = 'http://localhost:3000/authors';

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

  handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    console.log(errMsg);
    return throwError(() => errMsg);
  }
}