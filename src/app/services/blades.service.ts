import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BladesService {

  public rotateLeft:Subject<void> = new Subject();
  private $rotateLeft = this.rotateLeft.asObservable();
  public rotateRight:Subject<void> = new Subject();
  private $rotateRight = this.rotateRight.asObservable();
  public rotating = false;

  constructor() { 
    this.$rotateLeft.subscribe(()=>{
      if(!this.rotating)
      this._rotateLeft();
    })
    this.$rotateRight.subscribe(()=>{
      if(!this.rotating)
      this._rotateRight();
    })
  }

  private _rotateLeft() {
    const icon = document.getElementsByClassName('blades-icon')[0] as HTMLElement | undefined;
    if (!icon) {
      return;
    }

    this.rotating = true;
    icon.classList.remove('rotate-blade-right');
    icon.classList.remove('rotate-blade-left');
    setTimeout(() => {
      icon.classList.add('rotate-blade-left');
    });
    setTimeout(()=>{
      this.rotating = false;
    },1000)
  }

  private _rotateRight() {
    const icon = document.getElementsByClassName('blades-icon')[0] as HTMLElement | undefined;
    if (!icon) {
      return;
    }

    this.rotating = true;
    icon.classList.remove('rotate-blade-left');
    icon.classList.remove('rotate-blade-right');
    setTimeout(() => {
      icon.classList.add('rotate-blade-right');
    });
    setTimeout(()=>{
      this.rotating = false;
    },1000)
  }
}
