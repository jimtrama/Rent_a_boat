import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Boat } from '../../models/boat.model';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-card',
  standalone: false,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() boat!: Boat;
  @Input() boatId!: number;
  @Output() imgClicked: EventEmitter<string> = new EventEmitter();

  public selectedImg = 0;

  constructor(private modalService:ModalService){}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.calculateImages();
    },10);
  }

  private calculateImages() {
    let imgs = document.getElementsByClassName(this.boatId + '-img');
    for (let i = this.selectedImg; i < imgs.length; i++) {
      (imgs[i] as HTMLElement).style.left = i * 10 + 'px';
      (imgs[i] as HTMLElement).style.height =
        90 - (i - this.selectedImg) * 8 + '%';
      (imgs[i] as HTMLElement).style.zIndex = imgs.length - i + '';
      (imgs[i] as HTMLElement).style.transform =
        'rotate(' + (i - this.selectedImg) * 2 + 'deg)';
    }

    for (let i = this.selectedImg - 1; i >= 0; i--) {
      (imgs[i] as HTMLElement).style.left = i * 10 + 'px';
      (imgs[i] as HTMLElement).style.height = 90 - i * 5 + '%';
      (imgs[i] as HTMLElement).style.zIndex = i + '';
      (imgs[i] as HTMLElement).style.transform =
        'rotate(' + (i - this.selectedImg) * 2 + 'deg)';
    }
  }

  onImgClick(img: string) {
    this.modalService.addPhotos(this.boat.imgs);
    this.modalService.openModal();
  }

  onRightArrowClick() {
    if (this.selectedImg < this.boat.imgs.length - 1) {
      this.selectedImg++;
      this.calculateImages();
    }
  }

  onLeftArrowClick() {
    if (this.selectedImg >= 1) {
      this.selectedImg--;
      this.calculateImages();
    }
  }

  private imageSwinging = false;
  private xTouchStart = 0;
  onTouchStartImg(e: TouchEvent) {
    this.imageSwinging = true;
    this.xTouchStart = e.targetTouches[0].pageX;
  }

  onTouchMove(e: TouchEvent) {
    let xDiff = 0;
    if (this.imageSwinging) {
      e.preventDefault();
      let imgs = document.getElementsByClassName(this.boatId + '-img');
      xDiff = e.targetTouches[0].pageX - this.xTouchStart;
      if (xDiff > 0 && this.selectedImg == 0) return;
      if (xDiff < 0 && this.selectedImg == imgs.length - 1) return;
      (imgs[this.selectedImg] as HTMLElement).style.left = xDiff + 'px';
    }

    if (xDiff < -140 && this.imageSwinging) {
      this.selectedImg++;
      this.calculateImages();
      this.imageSwinging = false;
    }

    if (xDiff > 140 && this.imageSwinging) {
      this.selectedImg--;
      this.calculateImages();
      this.imageSwinging = false;
    }
  }

  onTouchEnd(e: TouchEvent) {
    let imgs = document.getElementsByClassName(this.boatId + '-img');
    (imgs[this.selectedImg] as HTMLElement).style.left = 0 + 'px';
  }
}
