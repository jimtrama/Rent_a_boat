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
      state('open', style({ opacity: 1, transform: 'translate(-50%, 0)', pointerEvents: 'auto' })),
      state('close', style({ opacity: 0, transform: 'translate(-50%, -20px)', pointerEvents: 'none' })),
      transition('open => close', [animate('0.3s')]),
      transition('close => open', [animate('0.3s')]),
    ]),
  ],
})
export class MobileHeaderComponent {
  @Output() openChange: EventEmitter<boolean> = new EventEmitter();
  @Input() open!: boolean;

  toggleMenu() {
    this.open = !this.open;
    this.openChange.emit(this.open);
    
  }
}
