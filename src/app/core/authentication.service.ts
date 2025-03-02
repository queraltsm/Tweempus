import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, concatMap, Observable, throwError } from 'rxjs';
import { AuthorService } from '../shared/author/author.service';
import { TokenModel } from './token.model';
import { environment } from '../../environments/environment';

type DBSession = {
  id: string;
  author: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private url: string = `${environment.url}/authenticated`;

  token: TokenModel | null = null;

  constructor(
    private httpClient: HttpClient,
    private authorService: AuthorService,
    private router: Router
  ) { }

  logIn(idAuthor: string) {
    const tokenGenerated = this.generateToken();
    this.authorService.getAuthor(idAuthor).pipe(
      concatMap((author) => this.saveSession(tokenGenerated, author.id))
    ).subscribe({
      next: (response) => {
        this.token = new TokenModel(response.id, response.author);
        localStorage.setItem("token-loggedin", this.token.key);
        localStorage.setItem("user-loggedin", this.token.idAuthor);
        this.router.navigate(['/dashboard']);
      },
    })
  }

  logOut() {
    this.deleteSession().subscribe(() => {
      this.token = null;
      this.router.navigate(['/login']);
    });
  }

  generateToken() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const date = new Date().getTime();
    let text = '';

    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    text += date;

    return text;
  }

  saveSession(tokenGenerated: string, idAuthor: string): Observable<DBSession> {
    const session: DBSession = { 'id': tokenGenerated, 'author': idAuthor };
    return this.httpClient.post<DBSession>(this.url, session).pipe(
      catchError(this.handleError)
    );
  }

  deleteSession(): Observable<void> {
    return this.httpClient.delete<void>(this.url + '/' + this.token!.key).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return throwError(() => errMsg);
  }
}