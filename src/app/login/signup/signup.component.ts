import { concatMap } from 'rxjs';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { AuthorService } from '../../shared/author/author.service';
import { AuthenticationService } from '../../core/authentication.service';

type NewUserForm = FormGroup<{
  idAuthor: FormControl<string | null>;
  fullName: FormControl<string | null>;
  image: FormControl<string | null>;
}>

@Component({
  selector: 'tweempus-signup',
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  userAlreadyExist = false;
  newUserForm: NewUserForm = this.fb.group({
    idAuthor: ['', [Validators.required, this.checkNick]],
    fullName: ['', [Validators.required, Validators.minLength(3)]],
    image: ['']
  });

  constructor(
    private authService: AuthenticationService,
    private authorService: AuthorService
  ) { }

  checkNick(fc: FormControl): { [invalidNick: string]: boolean } | null {
    const nick = fc.value,
      regexp = new RegExp('^[a-zA-Z0-9]*$');
    if (regexp.test(nick)) {
      return null;
    } else {
      return { 'invalidNick': true };
    }
  }

  signUp(form: NewUserForm) {
    if (this.userAlreadyExist) {
      this.userAlreadyExist = false;
    }
    const idAuthor = form.value.idAuthor!;
    const fullName = form.value.fullName!;
    const image = form.value.image!;

    this.authorService.getAuthor(idAuthor).subscribe({
      next: () => this.userAlreadyExist = true,
      error: () => {
        this.authorService.setAuthor(idAuthor, fullName, image).pipe(
          concatMap((author) => this.authorService.createFavorite(author.id))
        ).subscribe({
          next: (author) => this.authService.logIn(author.id)
        })
      }
    })
  }
}
