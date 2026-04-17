import {
  AfterViewInit,
  Component,
  DestroyRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { ModalService } from './services/modal.service';
import { BladesService } from './services/blades.service';
import { Rockets } from './animation_bullets/rockets';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type SeoConfig = {
  title: string;
  description: string;
  keywords: string;
  image: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit, OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly siteUrl = 'https://medusaboatrental.gr';
  private prevScrollTop = 0;
  private ctx!: CanvasRenderingContext2D | null;
  public width = 700;
  public height = 700;
  public img!: HTMLImageElement;

  constructor(
    public modalService: ModalService,
    private bladesService: BladesService,
    private meta: Meta,
    private title: Title,
    private router: Router,
    private translateService: TranslateService,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    this.translateService.setFallbackLang('en');
    if (isPlatformBrowser(this.platformId)) {
      const lang = localStorage.getItem('lang') || 'en';
      translateService.use(lang);
    } else {
      translateService.use('en');
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      (document.getElementById('canvas') as HTMLCanvasElement).width =
        window.innerWidth - 150;
      (document.getElementById('canvas') as HTMLCanvasElement).height =
        window.innerHeight;
    }

    this.meta.updateTag({
      name: 'theme-color',
      content: '#f4f7fb',
    });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe(() => this.applySeo());

    this.translateService.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.applySeo());

    this.applySeo();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      document
        .getElementsByTagName('app-root')[0]
        .addEventListener('scroll', (e) => {
          const currentScroll = (e.target as HTMLElement).scrollTop;
          if (
            this.prevScrollTop < currentScroll &&
            !this.bladesService.rotating
          ) {
            this.bladesService.rotateLeft.next();
          } else {
            this.bladesService.rotateRight.next();
          }
          this.prevScrollTop = currentScroll;
        });
      this.ctx = (
        document.getElementById('canvas') as HTMLCanvasElement
      ).getContext('2d');
      this.img = document.getElementById('source-img') as HTMLImageElement;

      this.playAnimation();
    }
  }
  rockets: Rockets | undefined = undefined;
  private playAnimation() {
    if (!this.rockets) this.rockets = new Rockets('canvas');
    this.rockets.run();
    setTimeout(() => {
      this.rockets?.stop();
    }, 10000);
  }

  private applySeo() {
    const path = this.router.url.split('?')[0].split('#')[0] || '/';
    const currentLang = this.translateService.currentLang || 'en';
    const seo = this.getSeoConfig(path, currentLang);
    const canonicalUrl = `${this.siteUrl}${path === '/' ? '' : path}`;

    this.title.setTitle(seo.title);
    this.document.documentElement.lang = currentLang === 'gr' ? 'el' : 'en';

    this.meta.updateTag({ name: 'title', content: seo.title });
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ name: 'keywords', content: seo.keywords });
    this.meta.updateTag({
      name: 'robots',
      content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
    });

    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });
    this.meta.updateTag({ property: 'og:image', content: seo.image });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });
    this.meta.updateTag({ property: 'og:site_name', content: 'Medusa Boat Rental' });
    this.meta.updateTag({
      property: 'og:locale',
      content: currentLang === 'gr' ? 'el_GR' : 'en_GR',
    });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: seo.title });
    this.meta.updateTag({ name: 'twitter:description', content: seo.description });
    this.meta.updateTag({ name: 'twitter:image', content: seo.image });

    this.updateCanonical(canonicalUrl);
    this.updateStructuredData(canonicalUrl, seo, currentLang);
  }

  private getSeoConfig(path: string, lang: string): SeoConfig {
    const image = `${this.siteUrl}/assets/boats/1.jpg`;

    if (lang === 'gr') {
      const configs: Record<string, SeoConfig> = {
        '/': {
          title: 'Rent a Boat Vourvourou | Boat Rental Vourvourou & Diaporos | Medusa Boat Rental',
          description:
            'Ενοικίαση σκάφους στη Βουρβουρού και τον Διάπορο με τη Medusa Boat Rental. Boat rental Vourvourou χωρίς δίπλωμα, καθαρά σκάφη, τοπικές συμβουλές και εύκολη πρόσβαση σε Blue Lagoon και κρυφές παραλίες.',
          keywords:
            'rent a boat vourvourou, boat rental vourvourou, boat rent diaporos, medusa rent boat, medusa boat rental, ενοικίαση σκάφους βουρβουρού, diaporos boat rental, blue lagoon boat rental',
          image,
        },
        '/fleet': {
          title: 'Boat Rental Vourvourou Fleet | No License Boats in Diaporos | Medusa',
          description:
            'Δείτε τον στόλο της Medusa για rent a boat Vourvourou και boat rent Diaporos. Σκάφη χωρίς δίπλωμα, έως 10 άτομα, με GPS, ψυγείο, ladder και εξοπλισμό ασφαλείας.',
          keywords:
            'boat rental vourvourou fleet, no license boat vourvourou, diaporos boat rent, rent boat blue lagoon, medusa boats',
          image,
        },
        '/destinations': {
          title: 'Diaporos Boat Rent Destinations | Blue Lagoon & Vourvourou Beaches | Medusa',
          description:
            'Ανακαλύψτε Blue Lagoon, Διάπορο και τις πιο όμορφες παραλίες της Βουρβουρούς με boat rental από τη Medusa. Ιδανικό για ημερήσια εξερεύνηση με rent a boat Vourvourou.',
          keywords:
            'boat rent diaporos, blue lagoon boat rental, vourvourou beaches boat, diaporos island boat trip, rent a boat vourvourou destinations',
          image,
        },
        '/reviews': {
          title: 'Medusa Rent Boat Reviews | Boat Rental Vourvourou Customer Reviews',
          description:
            'Δείτε αξιολογήσεις πελατών για τη Medusa Boat Rental στη Βουρβουρού. Πραγματικές εμπειρίες για rent a boat Vourvourou, Diaporos boat trips και οικογενειακή εξυπηρέτηση.',
          keywords:
            'medusa rent boat reviews, boat rental vourvourou reviews, rent a boat vourvourou reviews, diaporos boat rental reviews',
          image,
        },
      };

      return configs[path] ?? configs['/'];
    }

    const configs: Record<string, SeoConfig> = {
      '/': {
        title: 'Rent a Boat Vourvourou | Boat Rental Vourvourou & Diaporos | Medusa Boat Rental',
        description:
          'Rent a boat in Vourvourou and explore Diaporos, Blue Lagoon and hidden beaches with Medusa Boat Rental. Boat rental Vourvourou with no license required, local guidance, safe boats and free parking.',
        keywords:
          'rent a boat vourvourou, boat rental vourvourou, boat rent diaporos, medusa rent boat, medusa boat rental, diaporos boat rental, blue lagoon boat rental, no license boat rental vourvourou, boat hire halkidiki, boat rental sithonia',
        image,
      },
      '/fleet': {
        title: 'Boat Rental Vourvourou Fleet | No License Boats for Diaporos | Medusa',
        description:
          'Browse our boat rental fleet in Vourvourou for Diaporos and Blue Lagoon trips. No license boats, family-friendly capacities, GPS, cooler box, safety equipment and local support from Medusa.',
        keywords:
          'boat rental vourvourou fleet, no license boat vourvourou, diaporos boat rent, vourvourou boat hire, medusa boats',
        image,
      },
      '/destinations': {
        title: 'Boat Rent Diaporos | Blue Lagoon, Diaporos & Vourvourou Beaches | Medusa',
        description:
          'Plan your Diaporos boat rent with the best spots around Vourvourou: Blue Lagoon, Hawaii Beach and quiet coves only reachable by sea. Ideal for rent a boat Vourvourou day trips.',
        keywords:
          'boat rent diaporos, blue lagoon boat rental, vourvourou beaches boat rental, diaporos island boat trip, rent a boat vourvourou destinations',
        image,
      },
      '/reviews': {
        title: 'Medusa Rent Boat Reviews | Boat Rental Vourvourou Guest Reviews',
        description:
          'Read guest reviews for Medusa Boat Rental in Vourvourou. See why visitors choose us for boat rental Vourvourou, Diaporos boat rent and friendly local service.',
        keywords:
          'medusa rent boat reviews, boat rental vourvourou reviews, rent a boat vourvourou reviews, diaporos boat rental reviews',
        image,
      },
    };

    return configs[path] ?? configs['/'];
  }

  private updateCanonical(url: string) {
    let link = this.document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    link.setAttribute('href', url);
  }

  private updateStructuredData(url: string, seo: SeoConfig, lang: string) {
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${this.siteUrl}/#website`,
          url: this.siteUrl,
          name: 'Medusa Boat Rental',
          inLanguage: lang === 'gr' ? 'el-GR' : 'en',
        },
        {
          '@type': 'LocalBusiness',
          '@id': `${this.siteUrl}/#localbusiness`,
          name: 'Medusa Boat Rental',
          url: this.siteUrl,
          image: [
            `${this.siteUrl}/assets/boats/1.jpg`,
            `${this.siteUrl}/assets/sea.jpeg`,
          ],
          description: seo.description,
          telephone: '+306975616367',
          priceRange: 'EUR',
          areaServed: ['Vourvourou', 'Diaporos', 'Sithonia', 'Halkidiki'],
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Vourvourou',
            addressLocality: 'Sithonia',
            postalCode: '63078',
            addressRegion: 'Central Macedonia',
            addressCountry: 'GR',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 40.1875929,
            longitude: 23.7987329,
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: [
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
                'Sunday',
              ],
              opens: '09:00',
              closes: '21:30',
            },
          ],
          sameAs: [
            'https://www.facebook.com/p/Medusa-boats-rental-100063928245216/',
            'https://www.instagram.com/medusa_boat_rental',
          ],
        },
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: seo.title,
          description: seo.description,
          isPartOf: {
            '@id': `${this.siteUrl}/#website`,
          },
          about: {
            '@id': `${this.siteUrl}/#localbusiness`,
          },
          primaryImageOfPage: {
            '@type': 'ImageObject',
            url: seo.image,
          },
        },
      ],
    };

    let script = this.document.getElementById('structured-data');
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'structured-data';
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }
}
