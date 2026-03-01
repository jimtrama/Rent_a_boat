import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-destinations',
  standalone: false,
  templateUrl: './destinations.component.html',
  styleUrl: './destinations.component.scss'
})
export class DestinationsComponent implements AfterViewInit{
  ngAfterViewInit(): void {
    document
      .getElementsByTagName('app-header')[0]
      .scrollIntoView({ behavior: 'smooth' });
  }
}
