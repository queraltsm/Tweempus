import { Component, Input } from '@angular/core';
import { TwimpModel } from '../twimp.model';

@Component({
  selector: 'tweempus-twimp-card',
  imports: [],
  templateUrl: './twimp-card.component.html',
  styleUrl: './twimp-card.component.css'
})
export class TwimpCardComponent {

  @Input({required:true}) twimp!:TwimpModel

}
