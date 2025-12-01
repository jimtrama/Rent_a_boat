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

  public selectedImg = 0;

  ngAfterViewInit(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      scrollMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer: any) => {
        for (let i = entries.length -1 ; i >=0 ; i--) {
          if (entries[i].isIntersecting) {
            this.selectedImg = +entries[i].target.id.split('-')[1];
          }
        }
      },
      options
    );
    for (let el of document.getElementsByClassName('img')) {
      observer.observe(el);
    }
  }

  onImgClick(img:string){
    console.log(img);
    
  }
}
