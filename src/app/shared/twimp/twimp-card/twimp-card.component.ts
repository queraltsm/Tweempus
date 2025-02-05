import { Component, HostListener, Input } from '@angular/core';
import { TwimpModel } from '../twimp.model';
import { Directive } from '@angular/core';

@Component({
  selector: 'tweempus-twimp-card',
  imports: [],
  templateUrl: './twimp-card.component.html',
  styleUrl: './twimp-card.component.css'
})
export class TwimpCardComponent {

  @Directive({ selector: '[miDirectiva]' })

  @Input({required:true}) twimp!:TwimpModel

  @HostListener('click')
    onClick() {
      alert('Click! :)');
    }

}
