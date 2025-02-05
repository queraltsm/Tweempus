import { Component } from '@angular/core';
import { TwimpListComponent } from '../../shared/twimp/twimp-list/twimp-list.component';

@Component({
  selector: 'tweempus-my-twimps',
  imports: [TwimpListComponent],
  templateUrl: './my-twimps.component.html',
  styleUrl: './my-twimps.component.css'
})
export class MyTwimpsComponent {

}
