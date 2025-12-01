import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
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
    new Boat(35, 5, 5.45, 1, 50),
    new Boat(35, 5, 5.45, 2, 50),
    new Boat(25, 4, 6.45, 2, 50),
    new Boat(35, 5, 5.45, 2, 50),
  ];

  public selectedIndex = 0;
  public touchStartX = 0;
  private showingLeftIcon = false;
  private showingRightIcon = true;

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
      .getElementsByClassName('background-icon')[0]
      .classList.remove('rotate-blade-right');
    document
      .getElementsByClassName('background-icon')[0]
      .classList.remove('rotate-blade-left');
    setTimeout(() => {
      document
        .getElementsByClassName('background-icon')[0]
        .classList.add('rotate-blade-left');
    });
  }

  private rotateRight() {
    document
      .getElementsByClassName('background-icon')[0]
      .classList.remove('rotate-blade-left');
    document
      .getElementsByClassName('background-icon')[0]
      .classList.remove('rotate-blade-right');
    setTimeout(() => {
      document
        .getElementsByClassName('background-icon')[0]
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
    if (xEnd > this.touchStartX && this.selectedIndex + 1 < this.boats.length) {
      this.selectedIndex++;
    } else if (this.touchStartX > xEnd && this.selectedIndex - 1 >= 0) {
      this.selectedIndex--;
    }
  }

  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.changedTouches[0].pageX;
  }
}
