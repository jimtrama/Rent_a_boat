import {
  Component,
  DestroyRef,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { ModalService } from './services/modal.service';
import { BladesService } from './services/blades.service';
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

type FaqEntry = {
  question: string;
  answer: string;
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly siteUrl = 'https://medusaboatrental.gr';
  private previousScrollY = 0;
  public boatTransform = 'translate3d(0, 0, 0) rotate(-8deg) scale(1)';

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

  @HostListener('window:scroll')
  onScroll() {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const scrollY = window.scrollY;
    const rotation = -8 + scrollY * 0.08;
    const driftY = Math.min(scrollY * 0.12, 90);
    const driftX = Math.sin(scrollY / 180) * 18;
    const scale = 1 + Math.min(scrollY / 4000, 0.08);
    this.boatTransform = `translate3d(${driftX}px, ${driftY}px, 0) rotate(${rotation}deg) scale(${scale})`;

    if (!this.bladesService.rotating) {
      if (scrollY > this.previousScrollY) {
        this.bladesService.rotateLeft.next();
      } else {
        this.bladesService.rotateRight.next();
      }
    }

    this.previousScrollY = scrollY;
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
    this.meta.updateTag({ property: 'og:image:alt', content: seo.title });
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
    this.meta.updateTag({ name: 'twitter:image:alt', content: seo.title });
    this.meta.updateTag({ name: 'geo.region', content: 'GR-B' });
    this.meta.updateTag({ name: 'geo.placename', content: 'Vourvourou, Sithonia, Halkidiki' });
    this.meta.updateTag({ name: 'geo.position', content: '40.1875929;23.7987329' });
    this.meta.updateTag({ name: 'ICBM', content: '40.1875929, 23.7987329' });

    this.updateCanonical(canonicalUrl);
    this.updateStructuredData(path, canonicalUrl, seo, currentLang);
  }

  private getSeoConfig(path: string, lang: string): SeoConfig {
    const image = `${this.siteUrl}/assets/boats/1.jpg`;

    if (lang === 'gr') {
      const configs: Record<string, SeoConfig> = {
        '/': {
          title: 'Vourvourou Boat Rental | Rent a Boat in Vourvourou, Diaporos & Blue Lagoon | Medusa',
          description:
            'Vourvourou boat rental από τη Medusa για Διάπορο, Blue Lagoon και κρυφές παραλίες. Ενοικίαση σκάφους στη Βουρβουρού χωρίς δίπλωμα σε επιλεγμένα σκάφη, με τοπική καθοδήγηση, καθαρά σκάφη και εύκολη πρόσβαση.',
          keywords:
            'vourvourou boat rental, rent a boat vourvourou, boat rental vourvourou, boat rent diaporos, medusa rent boat, medusa boat rental, ενοικίαση σκάφους βουρβουρού, diaporos boat rental, blue lagoon boat rental, no license boat rental vourvourou',
          image,
        },
        '/fleet': {
          title: 'Vourvourou Boat Rental Fleet | No License Boats for Diaporos | Medusa',
          description:
            'Δείτε τον στόλο της Medusa για Vourvourou boat rental και διαδρομές προς Διάπορο. Σκάφη χωρίς δίπλωμα σε επιλεγμένα μοντέλα, με GPS, ψυγείο, ladder και εξοπλισμό ασφαλείας.',
          keywords:
            'vourvourou boat rental fleet, boat rental vourvourou fleet, no license boat vourvourou, diaporos boat rent, rent boat blue lagoon, medusa boats',
          image,
        },
        '/destinations': {
          title: 'Boat Rent Diaporos | Vourvourou Boat Rental Routes to Blue Lagoon | Medusa',
          description:
            'Ανακαλύψτε Blue Lagoon, Διάπορο και τις πιο όμορφες παραλίες της Βουρβουρούς με τη Medusa. Ιδανικές διαδρομές για Vourvourou boat rental και ημερήσια εξερεύνηση με rent a boat Vourvourou.',
          keywords:
            'boat rent diaporos, vourvourou boat rental routes, blue lagoon boat rental, vourvourou beaches boat, diaporos island boat trip, rent a boat vourvourou destinations',
          image,
        },
        '/reviews': {
          title: 'Vourvourou Boat Rental Reviews | Medusa Boat Rental Reviews',
          description:
            'Δείτε αξιολογήσεις πελατών για τη Medusa Boat Rental στη Βουρβουρού. Πραγματικές εμπειρίες για Vourvourou boat rental, διαδρομές στον Διάπορο και οικογενειακή εξυπηρέτηση.',
          keywords:
            'vourvourou boat rental reviews, medusa rent boat reviews, boat rental vourvourou reviews, rent a boat vourvourou reviews, diaporos boat rental reviews',
          image,
        },
        '/vourvourou-boat-rental': {
          title: 'Vourvourou Boat Rental | Medusa Boat Rental in Vourvourou',
          description:
            'Vourvourou boat rental by Medusa with easy access to Diaporos, Blue Lagoon and hidden beaches. Local guidance, selected no-license boats and a practical departure point in Vourvourou.',
          keywords:
            'vourvourou boat rental, boat rental vourvourou, medusa boat rental vourvourou, diaporos boat rental, blue lagoon boat rental',
          image,
        },
        '/rent-a-boat-vourvourou': {
          title: 'Rent a Boat Vourvourou | Medusa Boat Hire in Vourvourou',
          description:
            'Rent a boat in Vourvourou with Medusa for Diaporos, Blue Lagoon and crystal-clear swim stops. Easy local booking, clean boats and strong guidance before departure.',
          keywords:
            'rent a boat vourvourou, vourvourou boat rental, boat hire vourvourou, medusa rent boat, no license boat rental vourvourou',
          image,
        },
        '/boat-rent-diaporos': {
          title: 'Boat Rent Diaporos | Medusa Boat Rental from Vourvourou',
          description:
            'Boat rent Diaporos from Vourvourou with Medusa. Reach Diaporos fast, combine Blue Lagoon and quiet coves, and enjoy a flexible swim-focused day by boat.',
          keywords:
            'boat rent diaporos, diaporos boat rental, vourvourou boat rental, rent a boat diaporos, blue lagoon and diaporos boat trip',
          image,
        },
        '/blue-lagoon-boat-rental': {
          title: 'Blue Lagoon Boat Rental | Vourvourou Boat Trips with Medusa',
          description:
            'Blue Lagoon boat rental from Vourvourou with Medusa. Plan a day route that combines Blue Lagoon, Diaporos and quiet beaches with a local rental base in Vourvourou.',
          keywords:
            'blue lagoon boat rental, vourvourou boat rental, blue lagoon boat trip, diaporos blue lagoon rental, rent a boat vourvourou',
          image,
        },
      };

      return configs[path] ?? configs['/'];
    }

    const configs: Record<string, SeoConfig> = {
      '/': {
        title: 'Vourvourou Boat Rental | Rent a Boat in Vourvourou, Diaporos & Blue Lagoon | Medusa',
        description:
          'Vourvourou boat rental with Medusa for Diaporos, Blue Lagoon and hidden beaches. Rent a boat in Vourvourou with no license required on selected boats, local guidance, safe boats and free parking.',
        keywords:
          'vourvourou boat rental, rent a boat vourvourou, boat rental vourvourou, boat rent diaporos, medusa rent boat, medusa boat rental, diaporos boat rental, blue lagoon boat rental, no license boat rental vourvourou, boat hire halkidiki, boat rental sithonia',
        image,
      },
      '/fleet': {
        title: 'Vourvourou Boat Rental Fleet | No License Boats for Diaporos | Medusa',
        description:
          'Browse our Vourvourou boat rental fleet for Diaporos and Blue Lagoon trips. No license boats, family-friendly capacities, GPS, cooler box, safety equipment and local support from Medusa.',
        keywords:
          'vourvourou boat rental fleet, boat rental vourvourou fleet, no license boat vourvourou, diaporos boat rent, vourvourou boat hire, medusa boats',
        image,
      },
      '/destinations': {
        title: 'Boat Rent Diaporos | Vourvourou Boat Rental Routes to Blue Lagoon | Medusa',
        description:
          'Plan your Diaporos boat rent with the best Vourvourou boat rental stops: Blue Lagoon, Hawaii Beach and quiet coves only reachable by sea. Ideal for rent a boat Vourvourou day trips.',
        keywords:
          'boat rent diaporos, vourvourou boat rental routes, blue lagoon boat rental, vourvourou beaches boat rental, diaporos island boat trip, rent a boat vourvourou destinations',
        image,
      },
      '/reviews': {
        title: 'Vourvourou Boat Rental Reviews | Medusa Boat Rental Guest Reviews',
        description:
          'Read guest reviews for Medusa Boat Rental in Vourvourou. See why visitors choose us for Vourvourou boat rental, Diaporos boat rent and friendly local service.',
        keywords:
          'vourvourou boat rental reviews, medusa rent boat reviews, boat rental vourvourou reviews, rent a boat vourvourou reviews, diaporos boat rental reviews',
        image,
      },
      '/vourvourou-boat-rental': {
        title: 'Vourvourou Boat Rental | Medusa Boat Rental in Vourvourou',
        description:
          'Vourvourou boat rental by Medusa with easy access to Diaporos, Blue Lagoon and hidden beaches. Local guidance, selected no-license boats and a practical departure point in Vourvourou.',
        keywords:
          'vourvourou boat rental, boat rental vourvourou, medusa boat rental vourvourou, diaporos boat rental, blue lagoon boat rental',
        image,
      },
      '/rent-a-boat-vourvourou': {
        title: 'Rent a Boat Vourvourou | Medusa Boat Hire in Vourvourou',
        description:
          'Rent a boat in Vourvourou with Medusa for Diaporos, Blue Lagoon and crystal-clear swim stops. Easy local booking, clean boats and strong guidance before departure.',
        keywords:
          'rent a boat vourvourou, vourvourou boat rental, boat hire vourvourou, medusa rent boat, no license boat rental vourvourou',
        image,
      },
      '/boat-rent-diaporos': {
        title: 'Boat Rent Diaporos | Medusa Boat Rental from Vourvourou',
        description:
          'Boat rent Diaporos from Vourvourou with Medusa. Reach Diaporos fast, combine Blue Lagoon and quiet coves, and enjoy a flexible swim-focused day by boat.',
        keywords:
          'boat rent diaporos, diaporos boat rental, vourvourou boat rental, rent a boat diaporos, blue lagoon and diaporos boat trip',
        image,
      },
      '/blue-lagoon-boat-rental': {
        title: 'Blue Lagoon Boat Rental | Vourvourou Boat Trips with Medusa',
        description:
          'Blue Lagoon boat rental from Vourvourou with Medusa. Plan a day route that combines Blue Lagoon, Diaporos and quiet beaches with a local rental base in Vourvourou.',
        keywords:
          'blue lagoon boat rental, vourvourou boat rental, blue lagoon boat trip, diaporos blue lagoon rental, rent a boat vourvourou',
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

  private updateStructuredData(path: string, url: string, seo: SeoConfig, lang: string) {
    const breadcrumbs = this.getBreadcrumbs(path, lang);
    const breadcrumbSchema = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };

    const serviceSchema = {
      '@type': 'Service',
      '@id': `${this.siteUrl}/#service`,
      name: lang === 'gr' ? 'Ενοικίαση σκάφους στη Βουρβουρού' : 'Vourvourou boat rental',
      serviceType: lang === 'gr' ? 'Ενοικίαση σκάφους για Βουρβουρού, Διάπορο και Blue Lagoon' : 'Boat rental in Vourvourou for Diaporos and Blue Lagoon',
      provider: {
        '@id': `${this.siteUrl}/#localbusiness`,
      },
      areaServed: ['Vourvourou', 'Diaporos', 'Sithonia', 'Halkidiki'],
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: this.siteUrl,
        availableLanguage: lang === 'gr' ? ['el', 'en'] : ['en', 'el'],
      },
    };

    const graph: Record<string, unknown>[] = [
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
        additionalType: 'https://schema.org/RentalService',
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
      serviceSchema as Record<string, unknown>,
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
      breadcrumbSchema as Record<string, unknown>,
    ];

    const data = {
      '@context': 'https://schema.org',
      '@graph': graph,
    };

    if (path === '/') {
      graph.push({
        '@type': 'FAQPage',
        '@id': `${this.siteUrl}/#faq`,
        mainEntity: this.getFaqEntries(lang).map((item: FaqEntry) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    }

    let script = this.document.getElementById('structured-data');
    if (!script) {
      script = this.document.createElement('script');
      script.id = 'structured-data';
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }

    script.textContent = JSON.stringify(data);
  }

  private getBreadcrumbs(path: string, lang: string) {
    const labels =
      lang === 'gr'
        ? {
            '/': 'Αρχική',
            '/fleet': 'Στόλος',
            '/destinations': 'Προορισμοί',
            '/reviews': 'Κριτικές',
            '/vourvourou-boat-rental': 'Vourvourou Boat Rental',
            '/rent-a-boat-vourvourou': 'Rent a Boat Vourvourou',
            '/boat-rent-diaporos': 'Boat Rent Diaporos',
            '/blue-lagoon-boat-rental': 'Blue Lagoon Boat Rental',
          }
        : {
            '/': 'Home',
            '/fleet': 'Fleet',
            '/destinations': 'Destinations',
            '/reviews': 'Reviews',
            '/vourvourou-boat-rental': 'Vourvourou Boat Rental',
            '/rent-a-boat-vourvourou': 'Rent a Boat Vourvourou',
            '/boat-rent-diaporos': 'Boat Rent Diaporos',
            '/blue-lagoon-boat-rental': 'Blue Lagoon Boat Rental',
          };

    const entries = [{ name: labels['/'], url: this.siteUrl }];

    if (path !== '/') {
      entries.push({
        name: labels[path as keyof typeof labels] ?? path.replace('/', ''),
        url: `${this.siteUrl}${path}`,
      });
    }

    return entries;
  }

  private getFaqEntries(lang: string): FaqEntry[] {
    if (lang === 'gr') {
      return [
        {
          question: 'Χρειάζομαι δίπλωμα για να νοικιάσω σκάφος στη Βουρβουρού;',
          answer:
            'Για επιλεγμένα σκάφη μέχρι το νόμιμο όριο δεν χρειάζεται δίπλωμα. Πριν φύγετε, η ομάδα της Medusa εξηγεί τα χειριστήρια, την ασφαλή διαδρομή και τα βασικά σημεία γύρω από τον Διάπορο και το Blue Lagoon.',
        },
        {
          question: 'Ποια είναι τα καλύτερα μέρη να επισκεφτώ με boat rental από τη Βουρβουρού;',
          answer:
            'Οι πιο δημοφιλείς στάσεις είναι το νησί Διάπορος, το Blue Lagoon, η παραλία Hawaii και οι μικροί κρυφοί όρμοι γύρω από τον κόλπο της Βουρβουρούς.',
        },
        {
          question: 'Είναι η Medusa κοντά στον Διάπορο;',
          answer:
            'Ναι. Η Medusa δραστηριοποιείται στη Βουρβουρού, που είναι το βασικό σημείο αναχώρησης για γρήγορη πρόσβαση στον Διάπορο.',
        },
        {
          question: 'Είναι τα σκάφη κατάλληλα για οικογένειες και για όσους το κάνουν πρώτη φορά;',
          answer:
            'Ναι. Η Medusa δίνει έμφαση σε καθαρά σκάφη, ξεκάθαρες οδηγίες, εξοπλισμό ασφαλείας και πρακτική τοπική καθοδήγηση για μια ήρεμη και εύκολη μέρα στη θάλασσα.',
        },
        {
          question: 'Γιατί να επιλέξω ένα τοπικό Vourvourou boat rental αντί για μια μεγάλη πλατφόρμα;',
          answer:
            'Μια τοπική ομάδα μπορεί να δώσει καλύτερες συμβουλές διαδρομής, πιο γρήγορη υποστήριξη και πιο ακριβή καθοδήγηση για καιρό, θάλασσα και τα καλύτερα σημεία για μπάνιο γύρω από τον Διάπορο.',
        },
      ];
    }

    return [
      {
        question: 'Do I need a license to rent a boat in Vourvourou?',
        answer:
          'For selected boats up to the local legal limit, no boating license is required. Before departure, the Medusa team explains the controls, the safe route and the main points around Diaporos and Blue Lagoon.',
      },
      {
        question: 'What are the best places to visit with a boat rental from Vourvourou?',
        answer:
          'The most popular stops are Diaporos island, Blue Lagoon, Hawaii Beach and the small hidden coves around the Vourvourou bay.',
      },
      {
        question: 'Is Medusa close to Diaporos?',
        answer:
          'Yes. Medusa operates in Vourvourou, which is the main departure point for quick access to Diaporos.',
      },
      {
        question: 'Are your boats suitable for families and first-time visitors?',
        answer:
          'Yes. Medusa focuses on clean boats, clear instructions, safety equipment and practical local guidance for a calm and easy day at sea.',
      },
      {
        question: 'Why choose a local Vourvourou boat rental instead of a bigger platform?',
        answer:
          'A local team can usually give better route advice, faster support and more accurate guidance for weather, sea conditions and the best swimming spots around Diaporos.',
      },
    ];
  }
}
