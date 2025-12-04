import { AfterViewInit, Component } from '@angular/core';
import { Boat } from '../../models/boat.model';

@Component({
  selector: 'app-fleet',
  standalone: false,
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.scss',
})
export class FleetComponent implements AfterViewInit {
  
  public boats: Boat[] = [
    new Boat({
      hp: 'yamaha 30/40',
      people: '5',
      length: '4.5m',
      imgs: ['2.jpeg', '3.jpeg'],
      title: 'Blazer Astra',
    }),
    new Boat({
      hp: 'yamaha 30/40',
      people: '5',
      length: '4.5m',
      imgs: ['1.jpg', '6.jpg', '3.jpeg'],
      title: 'Compass',
    }),
    new Boat({
      hp: 'mercury 30/40',
      people: '7',
      length: '5m',
      imgs: ['4.jpeg', '2.jpeg', '7.jpg'],
      title: 'Carel',
      bed: true,
    }),
    new Boat({
      hp: 'yamaha 30/60',
      people: '10',
      length: '6.1m',
      imgs: ['5.jpg', '2.jpeg', '3.jpeg'],
      title: 'Poseidon',
    }),
  ];

  public touchStartX = 0;
  public imgForModal = '';

  ngAfterViewInit(): void {
    document.getElementsByTagName('app-header')[0].scrollIntoView({behavior:'smooth'});
  }
  
  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.changedTouches[0].pageX;
  }

  onTouchEnd(e: TouchEvent) {
    let touchEndX = e.changedTouches[0].pageX;
    let isLeftSwipe = this.touchStartX > touchEndX;
    if (isLeftSwipe) {
      this.rotateLeft();
    } else {
      this.rotateRight();
    }
  }

  onMouseDown(e: MouseEvent) {
    this.touchStartX = e.layerX;
  }

  onMouseUp(e: MouseEvent) {
    let xEnd = e.layerX;
    let isLeftSwipe = this.touchStartX > xEnd;
    if (isLeftSwipe) {
      this.rotateLeft();
    } else {
      this.rotateRight();
    }
  }

  private rotateLeft() {
    document
      .getElementsByClassName('blades-icon')[0]
      .classList.remove('rotate-blade-right');
    document
      .getElementsByClassName('blades-icon')[0]
      .classList.remove('rotate-blade-left');
    setTimeout(() => {
      document
        .getElementsByClassName('blades-icon')[0]
        .classList.add('rotate-blade-left');
    });
  }

  private rotateRight() {
    document
      .getElementsByClassName('blades-icon')[0]
      .classList.remove('rotate-blade-left');
    document
      .getElementsByClassName('blades-icon')[0]
      .classList.remove('rotate-blade-right');
    setTimeout(() => {
      document
        .getElementsByClassName('blades-icon')[0]
        .classList.add('rotate-blade-right');
    });
  }
}
