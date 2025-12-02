import {
  AfterViewInit,
  Component,
} from '@angular/core';
import { Boat } from './models/boat.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  public boats: Boat[] = [
    new Boat({hp:"yamaha 30/40", people:"5",length:"4.5m", imgs:["2.jpeg","3.jpeg"], title:"Blazer Astra"}),
    new Boat({hp:"yamaha 30/40", people:"5",length:"4.5m", imgs:["1.jpg","2.jpeg","3.jpeg"], title:"Compass"}),
    new Boat({hp:"mercury 30/40", people:"7",length:"5m", imgs:["1.jpg","2.jpeg","3.jpeg"], title:"Carel"}),
    new Boat({hp:"selva yamaha 30/60", people:"10",length:"6.1m", imgs:["1.jpg","2.jpeg","3.jpeg"], title:"Poseidon"}),
  ];

  public selectedIndex = 0;
  public touchStartX = 0;
  private showingLeftIcon = false;
  private showingRightIcon = true;
  private clicked = false;

  onRightArrowClick(){
    this.clicked = true;
    this.selectedIndex++;
    console.log("clicked",this.selectedIndex);
    
    const container = document.getElementById('scroll-area');
    let x = document.getElementById("boat-"+this.selectedIndex)!.getBoundingClientRect().x  * (this.selectedIndex-this.selectedIndex/3);
    console.log(x);
    
    container?.scroll({left:x,behavior:'smooth'})
  }

  onLeftArrowClick(){
    this.selectedIndex--; 
    const container = document.getElementById('scroll-area');
    let x = document.getElementById("boat-"+ this.selectedIndex)!.
    getBoundingClientRect().left;
    console.log(x,this.selectedIndex);
    
    container?.scroll({left:x,behavior:'smooth'})
  }

  facebookClicked(){
    open("https://www.facebook.com/p/Medusa-boats-rental-100063928245216/")
  }
  phoneClicked(){
    open("tel:+306975616367")
  }
  instagramClicked(){
    open("https://www.instagram.com/medusa_boat_rental")
  }

  ngAfterViewInit(): void {
    const options = {
      root: null,
      rootMargin: '1px',
      scrollMargin: '1px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[], observer: any) => {
        for (let i = 0; i < entries.length; i++) {
          if (entries[i].isIntersecting) {
            this.selectedIndex = +entries[i].target.id.split('-')[1];
            console.log("obs",this.selectedIndex);
            
          }
        }
        if (this.selectedIndex > 0) {
          this.showLeftArrow();
        }
        if (this.selectedIndex == this.boats.length - 1) {
          this.hideRightArrow();
        }
        if (this.selectedIndex == 0) {
          this.hideLeftArrow();
        }
        if (this.selectedIndex < this.boats.length - 1) {
          this.showRightArrow();
        }
      },
      options
    );
    for (let el of document.getElementsByClassName('card')) {
      observer.observe(el);
    }
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

  private showLeftArrow() {
    if (!this.showingLeftIcon) {
      console.log('show left');
      document
        .getElementsByClassName('arrow-left-icon')[0]
        .classList.remove('slide-out-left');
      document
        .getElementsByClassName('arrow-left-icon')[0]
        .classList.add('slide-in-left');
      this.showingLeftIcon = true;
    }
  }

  private hideLeftArrow() {
    if (this.showingLeftIcon) {
      console.log('hide left');
      document
        .getElementsByClassName('arrow-left-icon')[0]
        .classList.remove('slide-in-left');
      document
        .getElementsByClassName('arrow-left-icon')[0]
        .classList.add('slide-out-left');
      this.showingLeftIcon = false;
    }
  }

  private hideRightArrow() {
    if (this.showingRightIcon) {
      console.log('hide right');
      document
        .getElementsByClassName('arrow-right-icon')[0]
        .classList.remove('slide-in-right');
      document
        .getElementsByClassName('arrow-right-icon')[0]
        .classList.add('slide-out-right');
      this.showingRightIcon = false;
    }
  }

  private showRightArrow() {
    if (!this.showingRightIcon) {
      console.log('show right');
      document
        .getElementsByClassName('arrow-right-icon')[0]
        .classList.remove('slide-out-right');
      document
        .getElementsByClassName('arrow-right-icon')[0]
        .classList.add('slide-in-right');
      this.showingRightIcon = true;
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

  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.changedTouches[0].pageX;
  }
}
