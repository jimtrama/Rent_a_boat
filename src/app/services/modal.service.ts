import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private _photos:string[] = [];
  public open:boolean = false;

  get photos(){
    return this._photos;
  }

  constructor() { }

  openModal(){
    this.open = true;
  }

  closeModal(){
    this.open = false;
  }

  addPhotos(photos:string[]){
    this._photos = [];
    for(let photo of photos){
      this._photos.push(photo);
    }
  }

}
