import { Component, HostListener, Input } from '@angular/core';
import { TwimpModel } from '../twimp.model';
import { Directive } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { TwimpService } from '../twimp.service';
import { map } from 'rxjs';
import { CustomTimestampDatePipe } from '../../custom-timestamp-date.pipe';
@Component({
  selector: 'tweempus-twimp-card',
  imports: [RouterModule, NgClass, CustomTimestampDatePipe],
  templateUrl: './twimp-card.component.html',
  styleUrl: './twimp-card.component.css'
})
export class TwimpCardComponent {

  currentUser = localStorage.getItem("user-loggedin") ?? '';
  currentUrl = '';

  @Directive({ selector: '[favTwimp]' })

  @Input({required:true}) twimp!:TwimpModel

  constructor(private twimpService: TwimpService, private router: Router){}

  ngOnInit() {
   this.currentUrl = this.router.url; 
  }

  @HostListener('click')
    onClick() {
      this.twimpService.editFavorite(this.currentUser, this.twimp.id).subscribe((response: boolean) => {
        this.twimp.favorite = !this.twimp.favorite;
      });
    }
}

