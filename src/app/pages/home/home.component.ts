import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  constructor(private router:Router){}

  ngAfterViewInit(): void {
    document
      .getElementsByTagName('app-header')[0]
      .scrollIntoView({ behavior: 'smooth' });
  }

  navigateToBoats(){
    this.router.navigate(["fleet"]);
  }
}
