import { isPlatformBrowser } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BrowserService } from '../../services/browser.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  public mobileHeader = false;
  public mobileMenuOpen = false;
  public isBrowser: boolean;
  private readonly mobileBreakpoint = 980;
  constructor(
    private router: Router,
    private translateService: TranslateService,
    private broswerService: BrowserService,
  ) {
    this.isBrowser = this.broswerService.isBrowser;
  }

  ngOnInit(): void {
    this.updateHeaderMode();
  }

  @HostListener('window:resize')
  onResize() {
    this.updateHeaderMode();
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMenu() {
    this.mobileMenuOpen = false;
  }

  navigate(route: string) {
    this.router.navigate([route]);
    this.mobileMenuOpen = false;
  }

  setEnglish() {
    localStorage.setItem('lang', 'en');
    this.translateService.use('en');
  }

  setGreek() {
    localStorage.setItem('lang', 'gr');
    this.translateService.use('gr');
  }

  private updateHeaderMode() {
    if (!this.isBrowser) {
      return;
    }

    this.mobileHeader = window.innerWidth < this.mobileBreakpoint;

    if (!this.mobileHeader) {
      this.mobileMenuOpen = false;
    }
  }
}
