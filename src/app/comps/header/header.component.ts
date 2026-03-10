import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  viewChild,
  ViewChild,
} from '@angular/core';
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
  public route: string = '';
  public t: string = '';
  public isBrowser: boolean;
  constructor(
    private router: Router,
    private translateService: TranslateService,
    private broswerService:BrowserService
  ) {
    this.isBrowser = this.broswerService.isBrowser;
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      this.mobileHeader = window.innerWidth < 1120;
    }

    // this.translateService.get('header.home').subscribe(v=>{
    //   this.t = v;
    // });
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMenu() {
    this.mobileMenuOpen = false;
  }

  navigate(route: string) {
    this.route = route;
    this.router.navigate([route]);
  }

  setEnglish() {
    localStorage.setItem('lang', 'en');
    this.translateService.use('en');
  }

  setGreek() {
    localStorage.setItem('lang', 'gr');
    this.translateService.use('gr');
  }
}
