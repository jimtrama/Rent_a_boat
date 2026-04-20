import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _photos:string[] = [];
  private _title = '';
  public open:boolean = false;
  private lockedScrollY = 0;

  get photos(){
    return this._photos;
  }

  get title() {
    return this._title;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  openModal(){
    this.open = true;
    this.lockBodyScroll();
  }

  closeModal(){
    this.open = false;
    this.unlockBodyScroll();
  }

  addPhotos(photos:string[], title?: string){
    this._photos = [];
    this._title = title ?? '';
    for(let photo of photos){
      this._photos.push(photo);
    }
  }

  private lockBodyScroll() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const body = this.document.body;
    this.lockedScrollY = window.scrollY;
    body.classList.add('modal-open');
    body.style.top = `-${this.lockedScrollY}px`;
  }

  private unlockBodyScroll() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const body = this.document.body;
    body.classList.remove('modal-open');
    body.style.top = '';
    window.scrollTo(0, this.lockedScrollY);
  }

}
