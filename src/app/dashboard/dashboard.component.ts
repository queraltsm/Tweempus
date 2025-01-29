import { Component } from '@angular/core';
import { TwimpCardComponent } from "../shared/twimp/twimp-card/twimp-card.component";
import { TwimpListComponent } from "../shared/twimp/twimp-list/twimp-list.component";

@Component({
  selector: 'tweempus-dashboard',
  imports: [TwimpListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
