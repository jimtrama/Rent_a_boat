import { Component } from '@angular/core';
import { Boat } from './models/boat.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  public boats:Boat[] = [
    new  Boat(35,5,5.45,1),
    new  Boat(35,5,5.45,2)
  ];
}
