import { combineLatest, concatMap, map, of } from 'rxjs';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { TwimpService } from '../shared/twimp/twimp.service';
import { AuthenticationService } from '../core/authentication.service';
import { TwimpModel } from '../shared/twimp/twimp.model';
import { AuthorService } from '../shared/author/author.service';

type NewTwimpForm = FormGroup<{
  content: FormControl<string | null>;
}>

@Component({
  selector: 'tweempus-create-twimp',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-twimp.component.html',
  styleUrl: './create-twimp.component.css'
})
export class CreateTwimpComponent {
  private fb = inject(FormBuilder)
  newTwimpForm: NewTwimpForm = this.fb.group({
    content: ['', [Validators.required, Validators.maxLength(140)]],
  });

  constructor(
    private authService: AuthenticationService,
    private authorService: AuthorService,
    private twimpService: TwimpService,
    private router: Router
  ) { }

  createTwimp(form: NewTwimpForm) {
    const authorLoggedId = this.authService.token!.idAuthor;
    const twimpDate = new Date().toLocaleDateString().replace(/\//g, '-');
    const twimpText = form.value.content!;

    this.twimpService.getTwimps().pipe(
      concatMap((twimps) => combineLatest([
        of(twimps),
        this.authorService.getAuthor(authorLoggedId)
      ])),
      map(([twimps, author]) => {
        const twimpsLength = twimps.length.toString(); // it is a best practice to create id with date and id of author
        const twimp = new TwimpModel(twimpsLength, author, twimpText, twimpDate);
        return twimp;
      }),
      concatMap((twimp) => this.twimpService.setTwimp(twimp))
    ).subscribe({
      next: () => this.router.navigate(['/dashboard'])
    })
  }
}
