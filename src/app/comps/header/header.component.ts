import { Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public mobileHeader = false;
  public mobileMenuOpen = false;
  public route:string = 'home'

  constructor(private router:Router){}

  ngOnInit(): void {
    this.mobileHeader = window.innerWidth < 1120;     
  }

  toggleMobileMenu(){ 
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMenu(){
    this.mobileMenuOpen = false; 
  }

  navigate(route:string){     
    this.route = route;
    this.router.navigate([route]);
  }
}
