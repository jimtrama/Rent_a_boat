import { AfterViewInit, Component } from '@angular/core';
import { Boat } from './models/boat.model';
import { ModalService } from './services/modal.service';
import { BladesService } from './services/blades.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent  implements AfterViewInit{

  private prevScrollTop = 0;

  constructor(public modalService:ModalService,private bladesService:BladesService){}
  
  ngAfterViewInit(): void {
    document.getElementsByTagName("app-root")[0].addEventListener('scroll',(e)=>{
      const currentScroll = (e.target as HTMLElement).scrollTop;
      if(this.prevScrollTop < currentScroll && !this.bladesService.rotating){
        this.bladesService.rotateLeft.next();
      }else{
        this.bladesService.rotateRight.next();
      }
      this.prevScrollTop = currentScroll;
    })
  }


}
