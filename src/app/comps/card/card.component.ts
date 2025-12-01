import { Component, Input } from '@angular/core';
import { Boat } from '../../models/boat.model';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
  @Input() boat!:Boat;

  onImgClick(img:string){
    console.log(img);
    
  }
}
