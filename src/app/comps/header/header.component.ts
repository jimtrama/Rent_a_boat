import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public mobileHeader = false;
  public mobileMenuOpen = false;
  ngOnInit(): void {
    this.mobileHeader = window.innerWidth < 520;
  }
  toggleMobileMenu(){ 
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
  closeMenu(){
    this.mobileMenuOpen = false;
  }
}
