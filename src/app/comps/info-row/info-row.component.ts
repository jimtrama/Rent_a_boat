import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-row',
  standalone: false,
  templateUrl: './info-row.component.html',
  styleUrl: './info-row.component.scss'
})
export class InfoRowComponent {
  @Input() text!:string;
  @Input() icon!:string;
  @Input() value!:string;

}
