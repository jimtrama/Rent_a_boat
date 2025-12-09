import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-header',
  standalone: false,
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss',
  animations: [
    trigger('openClose', [
      state('open', style({ top: '80px' })),
      state('close', style({ top: '-200px' })),
      transition('open => close', [animate('0.3s')]),
      transition('close => open', [animate('0.3s')]),
    ]),
  ],
})
export class MobileHeaderComponent {
  @Output() openChange: EventEmitter<boolean> = new EventEmitter();
  @Input() open!: boolean;

  toggleMenu() {
    console.log(this.open);
    this.open = !this.open;
    this.openChange.emit(this.open);
    
  }
}
