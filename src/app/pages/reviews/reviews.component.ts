import { AfterViewInit, Component } from '@angular/core';
import { BrowserService } from '../../services/browser.service';

@Component({
  selector: 'app-reviews',
  standalone: false,
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent implements AfterViewInit {

  constructor(private browserService:BrowserService){
  }

  ngAfterViewInit(): void {
    if(this.browserService.isBrowser)
    document
      .getElementsByTagName('app-header')[0]
      .scrollIntoView({ behavior: 'smooth' });
  }

  seeMoreClick(){
    open("https://www.google.com/maps/place/MEDUSA+Rent+a+Boat+Vourvourou/@40.1894116,23.8074432,15z/data=!4m8!3m7!1s0x14a8bd483088ee0b:0x18881356efef91c5!8m2!3d40.1875929!4d23.7987329!9m1!1b1!16s%2Fg%2F11nx254d23!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MTIwMi4wIKXMDSoASAFQAw%3D%3D");
  }
}
