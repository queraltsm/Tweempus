import { Component, inject} from '@angular/core';
import { AuthenticationService } from '../core/authentication.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthorService } from '../shared/author/author.service';

type UserForm = FormGroup<{
  idAuthor: FormControl<string | null>;
}>
@Component({
  selector: 'tweempus-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private fb = inject(FormBuilder);
  userNoExist = false;
  userForm: UserForm = this.fb.group({
    idAuthor: ['', Validators.required],
  });


  constructor(private authService: AuthenticationService, private authorService: AuthorService){}

  logIn(form: UserForm) {
   if (this.userNoExist) {
    this.userNoExist = false;
   }
   const formIdAuthor = form.value.idAuthor!;
   this.authorService.getAuthor(formIdAuthor).subscribe({
    next: () => this.authService.logIn(formIdAuthor),
    error: () => this.userNoExist = true
   })
  }

}
