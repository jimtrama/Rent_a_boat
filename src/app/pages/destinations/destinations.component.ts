import { AfterViewInit, Component } from '@angular/core';
import { BrowserService } from '../../services/browser.service';

@Component({
  selector: 'app-destinations',
  standalone: false,
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent implements AfterViewInit{
  
  constructor(private browserService:BrowserService){}

  ngAfterViewInit(): void {
    if(this.browserService.isBrowser)
    document
      .getElementsByTagName('app-header')[0]
      .scrollIntoView({ behavior: 'smooth' });
  }
}
