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
  @Input() boatId!:number;


  public selectedImg = 0;

  ngAfterViewInit(): void {
    setTimeout(()=>{this.calculateImages();});
  }

  private calculateImages(){
    let imgs = document.getElementsByClassName(this.boatId +'-img');
    //console.log(imgs);
    
    for (let i = this.selectedImg ; i<imgs.length;i++ ) {
      (imgs[i] as HTMLElement ).style.left = (i*10)+"px"; 
      (imgs[i] as HTMLElement ).style.height = (90-((i-this.selectedImg)*8))+"%"; 
      (imgs[i] as HTMLElement ).style.zIndex = (imgs.length - i)+""; 
      (imgs[i] as HTMLElement ).style.transform = "rotate("+((i-this.selectedImg)*2)+"deg)";
    }

    for (let i = this.selectedImg-1 ; i>=0;i-- ) {
      (imgs[i] as HTMLElement ).style.left = (i*10)+"px"; 
      (imgs[i] as HTMLElement ).style.height = (90-(i*5))+"%"; 
      (imgs[i] as HTMLElement ).style.zIndex = (i)+""; 
      (imgs[i] as HTMLElement ).style.transform = "rotate("+((i-this.selectedImg)*2)+"deg)";
    }
  }

  onImgClick(img:string){
    console.log(img);
    
  }

  onRightArrowClick(){
    this.selectedImg++;
    this.calculateImages();
  }

  onLeftArrowClick(){
    this.selectedImg--;
    this.calculateImages();
  }
}
