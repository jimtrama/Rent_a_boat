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
    new  Boat(35,5,5.45,1,50),
    new  Boat(35,5,5.45,2,50),
    new  Boat(25,4,6.45,2,50),
    new  Boat(35,5,5.45,2,50),
  ];

  public selectedIndex = 0 ;
  public touchStartX = 0;
  onTouchEnd(e:TouchEvent){
    let touchEndX = e.changedTouches[0].pageX;
    this.calculateBulletChange(touchEndX)
  }

  onMouseDown(e:MouseEvent){
    this.touchStartX = e.layerX;
  }

  onMouseUp(e:MouseEvent){
    let xEnd=e.layerX;
    if(xEnd>this.touchStartX && this.selectedIndex + 1 < this.boats.length){
      this.selectedIndex++;
    }else if(this.touchStartX > xEnd && this.selectedIndex-1>=0){
      this.selectedIndex--;
    }
    
  }

  onTouchStart(e:TouchEvent){
    this.touchStartX = e.changedTouches[0].pageX;
  }

  calculateBulletChange(xEnd:number){
    if(xEnd<this.touchStartX && this.selectedIndex + 1 < this.boats.length){
      this.selectedIndex++;
    }else if(this.touchStartX < xEnd && this.selectedIndex-1>=0){
      this.selectedIndex--;
    }
  }
}
