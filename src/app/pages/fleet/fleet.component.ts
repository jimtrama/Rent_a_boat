import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Boat } from '../../models/boat.model';
import { BladesService } from '../../services/blades.service';
import { BrowserService } from '../../services/browser.service';

@Component({
  selector: 'app-fleet',
  standalone: false,
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.scss',
})
export class FleetComponent implements OnInit, AfterViewInit {
  public boats: Boat[] = [
    new Boat({
      hp: '30/40 yamaha',
      people: '5',
      length: '4.5m',
      imgs: ['2.jpeg','5.jpg','10.jpeg','18.jpeg','19.jpeg','20.jpeg'],
      title: 'Blazer Astra',
    }),
    new Boat({
      hp: '30/40 yamaha',
      people: '5',
      length: '4.5m',
      imgs: ['6.jpg','9.webp','13.webp','17.jpeg'],
      title: 'Compass',
    }),
    new Boat({
      hp: '30/40 mercury',
      people: '6+1',
      length: '5m',
      imgs: ["1.jpg",'4.jpeg', '3.jpeg'],
      title: 'Carel',
      bed: true,
    }),
    new Boat({
      hp: '30/60 yamaha',
      people: '8+2',
      length: '6.1m',
      imgs: ['8.webp','12.webp','14.jpeg','15.jpeg','16.jpeg'],
      title: 'Poseidon',
      bed:true
    }),
  ];

  boatsToShow: Boat[] = [];
  boatFilterValue = 0;

  public touchStartX = 0;
  public imgForModal = '';

  constructor(private bladeService:BladesService,private browserService:BrowserService){}

  ngOnInit(): void {
    this.boatsToShow = [...this.boats];
  }

  ngAfterViewInit(): void {
    if(this.browserService.isBrowser)
    document
      .getElementsByTagName('app-header')[0]
      .scrollIntoView({ behavior: 'smooth' });
  }

  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.changedTouches[0].pageX;
  }

  onTouchEnd(e: TouchEvent) {
    let touchEndX = e.changedTouches[0].pageX;
    let isLeftSwipe = this.touchStartX > touchEndX;
    if (isLeftSwipe) {
      this.bladeService.rotateLeft.next();
    } else {
      this.bladeService.rotateRight.next();
    }
  }

  onMouseDown(e: MouseEvent) {
    this.touchStartX = e.layerX;
  }

  onMouseUp(e: MouseEvent) {
    let xEnd = e.layerX;
    let isLeftSwipe = this.touchStartX > xEnd;
    if (isLeftSwipe) {
      this.bladeService.rotateLeft.next();
    } else {
      this.bladeService.rotateRight.next();
    }
  }

  boatFilter(num: number) {
    this.boatFilterValue = num;
    this.boatsToShow = [];
    if (num == 0) {
      this.boatsToShow = [...this.boats];
    } else {
      for (let boat of this.boats) {
        if (+(boat.people.split("+")[0]) == num) {
          this.boatsToShow.push(boat);
        }
      }
    }
  }
}
