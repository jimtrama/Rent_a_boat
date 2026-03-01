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
    this.rotating = true;
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
    setTimeout(()=>{
      this.rotating = false;
    },1000)
  }

  private _rotateRight() {
    this.rotating = true;
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
    setTimeout(()=>{
      this.rotating = false;
    },1000)
  }
}
