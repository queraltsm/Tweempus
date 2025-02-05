import { Component } from '@angular/core';
import { TwimpCardComponent } from "../twimp-card/twimp-card.component";
import { AuthorModel } from '../../author/author.model';
import { TwimpModel } from '../twimp.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tweempus-twimp-list',
  standalone: true,
  imports: [TwimpCardComponent, CommonModule],
  templateUrl: './twimp-list.component.html',
  styleUrl: './twimp-list.component.css'
})
export class TwimpListComponent {
  text: string = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam efficitur sodales libero, sit amet posuere arcu consectetur ut. Nam volutpat ligula ac nunc consectetur vestibulum.';
  authors: AuthorModel[] = [];
  twimps: TwimpModel[] = [];
  
  constructor() {
    this.authors.push(new AuthorModel('1'));
    this.twimps.push(new TwimpModel('1', this.authors[0], this.text, '01/02/1970'));
    this.twimps.push(new TwimpModel('2', this.authors[0], this.text, '01/03/1970'));
    this.twimps.push(new TwimpModel('3', this.authors[0], this.text, '01/04/1970'));
    this.twimps.push(new TwimpModel('4', this.authors[0], this.text, '01/05/1970'));
  }

  // use this without blocks
  /*trackByTwimpId(index: number, twimp: any): any {
    return twimp.id;
  } */
}