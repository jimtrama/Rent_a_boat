import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

type LandingContent = {
  title: string;
  intro: string;
  badge: string;
  highlights: string[];
  sections: Array<{ title: string; body: string }>;
  faq: Array<{ question: string; answer: string }>;
};

@Component({
  selector: 'app-seo-landing',
  standalone: false,
  templateUrl: './seo-landing.component.html',
  styleUrl: './seo-landing.component.scss',
})
export class SeoLandingComponent implements OnInit {
  public content!: LandingContent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    this.setContent();
    this.translateService.onLangChange.subscribe(() => this.setContent());
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  private setContent() {
    const slug = this.route.snapshot.routeConfig?.path ?? 'vourvourou-boat-rental';
    const lang = this.translateService.currentLang || 'en';
    this.content = this.getContent(slug, lang);
  }

  private getContent(slug: string, lang: string): LandingContent {
    const isGreek = lang === 'gr';

    const map: Record<string, { en: LandingContent; gr: LandingContent }> = {
      'vourvourou-boat-rental': {
        en: {
          title: 'Vourvourou Boat Rental',
          intro:
            'Medusa offers a Vourvourou boat rental experience built around the exact route visitors want most: leave from Vourvourou, reach Diaporos fast, stop at Blue Lagoon and spend the day between calm coves and clear water.',
          badge: 'Primary search page',
          highlights: [
            'Departure point in Vourvourou',
            'Fast access to Diaporos and Blue Lagoon',
            'No-license options on selected boats',
          ],
          sections: [
            {
              title: 'Why this location matters',
              body: 'Vourvourou is the natural starting point for boat rental around Diaporos. Guests searching this phrase usually want a local business with quick sea access, clear instructions and practical route advice instead of a generic rental listing.',
            },
            {
              title: 'Best fit for first-time renters',
              body: 'Many visitors booking a boat rental in Vourvourou are first-time renters or families. Medusa keeps the process simple with guidance before departure, safety equipment and boats chosen for calm day trips around the bay.',
            },
            {
              title: 'A better route than a generic beach day',
              body: 'With a local Vourvourou boat rental, you can move between shallow lagoons, swim stops and quieter beaches that are difficult to enjoy fully from land. That is one of the strongest reasons this keyword converts well.',
            },
          ],
          faq: [
            {
              question: 'What makes Vourvourou one of the best places for boat rental in Halkidiki?',
              answer: 'Vourvourou combines calm water, easy access to Diaporos and short routes to famous swim spots like Blue Lagoon, which makes it ideal for a relaxed self-drive boat day.',
            },
            {
              question: 'Can I rent a boat in Vourvourou without a license?',
              answer: 'Yes, selected boats can be rented without a boating license, depending on local regulations and boat category.',
            },
            {
              question: 'How long should I book for a Vourvourou boat rental?',
              answer: 'A half-day can work, but a full-day rental is usually the best choice if you want time for Diaporos, Blue Lagoon and multiple swim stops.',
            },
          ],
        },
        gr: {
          title: 'Vourvourou Boat Rental',
          intro:
            'Η Medusa προσφέρει εμπειρία Vourvourou boat rental γύρω από τη διαδρομή που θέλει περισσότερο ο επισκέπτης: αναχώρηση από Βουρβουρού, γρήγορη πρόσβαση στον Διάπορο, στάση στο Blue Lagoon και μια ολόκληρη μέρα σε ήσυχους όρμους και καθαρά νερά.',
          badge: 'Βασική σελίδα αναζήτησης',
          highlights: [
            'Αναχώρηση από Βουρβουρού',
            'Γρήγορη πρόσβαση σε Διάπορο και Blue Lagoon',
            'Σκάφη χωρίς δίπλωμα σε επιλεγμένα μοντέλα',
          ],
          sections: [
            {
              title: 'Γιατί έχει σημασία η τοποθεσία',
              body: 'Η Βουρβουρού είναι το φυσικό σημείο εκκίνησης για boat rental γύρω από τον Διάπορο. Όσοι ψάχνουν αυτή τη φράση συνήθως θέλουν μια τοπική επιχείρηση με άμεση πρόσβαση στη θάλασσα, ξεκάθαρες οδηγίες και πρακτικές συμβουλές διαδρομής.',
            },
            {
              title: 'Ιδανικό για όσους το κάνουν πρώτη φορά',
              body: 'Πολλοί επισκέπτες που κλείνουν boat rental στη Βουρβουρού είναι οικογένειες ή άτομα που νοικιάζουν σκάφος πρώτη φορά. Η Medusa κρατά τη διαδικασία απλή με καθοδήγηση πριν την αναχώρηση, εξοπλισμό ασφαλείας και σκάφη κατάλληλα για ήρεμες ημερήσιες διαδρομές.',
            },
            {
              title: 'Καλύτερη εμπειρία από μια συνηθισμένη μέρα παραλίας',
              body: 'Με ένα τοπικό Vourvourou boat rental μπορείτε να κινηθείτε ανάμεσα σε ρηχές λιμνοθάλασσες, στάσεις για μπάνιο και πιο ήσυχες παραλίες που δύσκολα απολαμβάνει κανείς από στεριά. Αυτός είναι και ένας βασικός λόγος που αυτή η αναζήτηση έχει μεγάλη αξία.',
            },
          ],
          faq: [
            {
              question: 'Γιατί η Βουρβουρού θεωρείται από τα καλύτερα σημεία για boat rental στη Χαλκιδική;',
              answer: 'Η Βουρβουρού συνδυάζει ήρεμα νερά, εύκολη πρόσβαση στον Διάπορο και σύντομες διαδρομές προς γνωστά σημεία όπως το Blue Lagoon.',
            },
            {
              question: 'Μπορώ να νοικιάσω σκάφος στη Βουρβουρού χωρίς δίπλωμα;',
              answer: 'Ναι, επιλεγμένα σκάφη νοικιάζονται χωρίς δίπλωμα, ανάλογα με τους τοπικούς κανονισμούς και την κατηγορία του σκάφους.',
            },
            {
              question: 'Πόσες ώρες αξίζει να κλείσω για Vourvourou boat rental;',
              answer: 'Το μισό ημέρας μπορεί να λειτουργήσει, αλλά η ολοήμερη ενοικίαση συνήθως είναι η καλύτερη επιλογή για Διάπορο, Blue Lagoon και πολλές στάσεις για μπάνιο.',
            },
          ],
        },
      },
      'rent-a-boat-vourvourou': {
        en: {
          title: 'Rent a Boat Vourvourou',
          intro:
            'If you want to rent a boat in Vourvourou, Medusa gives you a direct local option with easy access to Diaporos, clear rental guidance and boat choices that work well for couples, families and small groups.',
          badge: 'High-intent booking page',
          highlights: [
            'Local family-run rental business',
            'Clear guidance before departure',
            'Ideal for couples, families and groups',
          ],
          sections: [
            {
              title: 'A direct booking experience',
              body: 'People searching rent a boat Vourvourou are often ready to compare providers and book soon. This page is designed around that intent with practical details, local trust signals and direct paths to the fleet.',
            },
            {
              title: 'Simple routes, strong value',
              body: 'A good rent a boat experience in Vourvourou is not only about price. It is also about choosing the right departure point, having realistic route advice and getting enough time to enjoy the sea instead of rushing between stops.',
            },
            {
              title: 'Local support matters',
              body: 'Because Medusa operates locally, guests get faster answers, clearer guidance and a more useful recommendation on which boat to choose for their plan, weather conditions and group size.',
            },
          ],
          faq: [
            {
              question: 'What should I check before I rent a boat in Vourvourou?',
              answer: 'Look at departure location, boat category, whether a license is needed, what equipment is included and how practical the route is for Diaporos and Blue Lagoon.',
            },
            {
              question: 'Is Vourvourou good for a self-drive boat day?',
              answer: 'Yes. Vourvourou is one of the most popular areas in Halkidiki for self-drive boat rental because the nearby island routes are scenic and easy to enjoy.',
            },
            {
              question: 'Which page should I visit next after this one?',
              answer: 'The fleet page is the best next step because it shows the actual boats, capacities and equipment that match your day plan.',
            },
          ],
        },
        gr: {
          title: 'Rent a Boat Vourvourou',
          intro:
            'Αν θέλετε να κάνετε rent a boat στη Βουρβουρού, η Medusa σας δίνει μια άμεση τοπική επιλογή με εύκολη πρόσβαση στον Διάπορο, ξεκάθαρη καθοδήγηση και σκάφη κατάλληλα για ζευγάρια, οικογένειες και μικρές παρέες.',
          badge: 'Σελίδα υψηλής πρόθεσης κράτησης',
          highlights: [
            'Τοπική οικογενειακή επιχείρηση',
            'Ξεκάθαρη καθοδήγηση πριν την αναχώρηση',
            'Ιδανικό για ζευγάρια, οικογένειες και παρέες',
          ],
          sections: [
            {
              title: 'Μια άμεση εμπειρία κράτησης',
              body: 'Όσοι ψάχνουν rent a boat Vourvourou συνήθως είναι κοντά σε απόφαση και συγκρίνουν παρόχους. Αυτή η σελίδα είναι φτιαγμένη γύρω από αυτή την πρόθεση, με πρακτικές πληροφορίες, τοπικά στοιχεία εμπιστοσύνης και άμεσες διαδρομές προς τον στόλο.',
            },
            {
              title: 'Απλές διαδρομές, καλή αξία',
              body: 'Μια καλή εμπειρία rent a boat στη Βουρβουρού δεν αφορά μόνο την τιμή. Αφορά και το σωστό σημείο αναχώρησης, ρεαλιστικές συμβουλές διαδρομής και αρκετό χρόνο για να απολαύσετε τη θάλασσα χωρίς βιασύνη.',
            },
            {
              title: 'Η τοπική υποστήριξη κάνει διαφορά',
              body: 'Επειδή η Medusa δραστηριοποιείται τοπικά, οι επισκέπτες παίρνουν πιο γρήγορες απαντήσεις, πιο καθαρή καθοδήγηση και πιο χρήσιμη πρόταση για το ποιο σκάφος ταιριάζει καλύτερα στο πλάνο, τον καιρό και το μέγεθος της παρέας.',
            },
          ],
          faq: [
            {
              question: 'Τι πρέπει να ελέγξω πριν κάνω rent a boat στη Βουρβουρού;',
              answer: 'Δείτε το σημείο αναχώρησης, την κατηγορία του σκάφους, αν χρειάζεται δίπλωμα, τι εξοπλισμός περιλαμβάνεται και πόσο πρακτική είναι η διαδρομή για Διάπορο και Blue Lagoon.',
            },
            {
              question: 'Είναι η Βουρβουρού καλή για self-drive boat day;',
              answer: 'Ναι. Η Βουρβουρού είναι από τις πιο δημοφιλείς περιοχές στη Χαλκιδική για self-drive boat rental, επειδή οι κοντινές νησιωτικές διαδρομές είναι όμορφες και εύκολες στην απόλαυση.',
            },
            {
              question: 'Ποια σελίδα να δω μετά από αυτή;',
              answer: 'Η καλύτερη επόμενη κίνηση είναι η σελίδα του στόλου, γιατί δείχνει τα πραγματικά σκάφη, τις χωρητικότητες και τον εξοπλισμό.',
            },
          ],
        },
      },
      'boat-rent-diaporos': {
        en: {
          title: 'Boat Rent Diaporos',
          intro:
            'For visitors mainly interested in reaching Diaporos, Medusa offers the most practical base: Vourvourou. From here, a boat rent to Diaporos becomes a short and flexible day trip with room for swimming, coves and Blue Lagoon.',
          badge: 'Destination-driven page',
          highlights: [
            'Built around the Diaporos route',
            'Short sea distance from Vourvourou',
            'Great for swimming-stop day trips',
          ],
          sections: [
            {
              title: 'Why Diaporos is the main draw',
              body: 'Diaporos is one of the strongest local search magnets because it combines clear water, sheltered spots and a route that feels special even for a short rental. It is often the real destination behind a Vourvourou boat search.',
            },
            {
              title: 'The practical departure point',
              body: 'A boat rent to Diaporos works best from Vourvourou because the crossing is short and the nearby points of interest are easy to combine in a single day. That makes the area especially attractive to families and casual renters.',
            },
            {
              title: 'More than one swim stop',
              body: 'A Diaporos day is usually strongest when it includes multiple stops: lagoon water, quiet beaches and time to anchor without pressure. Medusa helps guests plan that route rather than only naming one point on the map.',
            },
          ],
          faq: [
            {
              question: 'How far is Diaporos from Vourvourou by rental boat?',
              answer: 'Diaporos is very close to Vourvourou, which is one of the biggest reasons the area is so popular for boat rental.',
            },
            {
              question: 'Can I combine Diaporos with Blue Lagoon in one rental?',
              answer: 'Yes. For most day plans, Diaporos and Blue Lagoon fit naturally together and are among the most popular paired stops.',
            },
            {
              question: 'Is boat rent Diaporos a good option for families?',
              answer: 'Yes. The short routes, calm-water options and swimming-focused stops make it a strong choice for families and relaxed groups.',
            },
          ],
        },
        gr: {
          title: 'Boat Rent Diaporos',
          intro:
            'Για τους επισκέπτες που ενδιαφέρονται κυρίως να φτάσουν στον Διάπορο, η Medusa προσφέρει το πιο πρακτικό σημείο εκκίνησης: τη Βουρβουρού. Από εδώ, ένα boat rent για Διάπορο γίνεται εύκολη και ευέλικτη ημερήσια εμπειρία με χρόνο για μπάνιο, όρμους και Blue Lagoon.',
          badge: 'Σελίδα με προορισμό τον Διάπορο',
          highlights: [
            'Σχεδιασμένη γύρω από τη διαδρομή για Διάπορο',
            'Μικρή θαλάσσια απόσταση από Βουρβουρού',
            'Ιδανική για ημερήσιες διαδρομές με στάσεις για μπάνιο',
          ],
          sections: [
            {
              title: 'Γιατί ο Διάπορος είναι ο βασικός πόλος έλξης',
              body: 'Ο Διάπορος είναι από τα πιο δυνατά τοπικά σημεία αναζήτησης, γιατί συνδυάζει καθαρά νερά, προφυλαγμένα σημεία και μια διαδρομή που μοιάζει ξεχωριστή ακόμα και σε μικρή ενοικίαση. Συχνά είναι ο πραγματικός προορισμός πίσω από μια αναζήτηση για σκάφος στη Βουρβουρού.',
            },
            {
              title: 'Το πιο πρακτικό σημείο αναχώρησης',
              body: 'Ένα boat rent για Διάπορο λειτουργεί καλύτερα από τη Βουρβουρού, επειδή η απόσταση είναι μικρή και τα κοντινά σημεία ενδιαφέροντος συνδυάζονται εύκολα μέσα στην ίδια μέρα.',
            },
            {
              title: 'Περισσότερο από μία στάση για μπάνιο',
              body: 'Μια δυνατή μέρα στον Διάπορο συνήθως περιλαμβάνει περισσότερες από μία στάσεις: λιμνοθάλασσα, ήσυχες παραλίες και χρόνο για άραγμα χωρίς πίεση. Η Medusa βοηθά στον σχεδιασμό αυτής της διαδρομής.',
            },
          ],
          faq: [
            {
              question: 'Πόσο μακριά είναι ο Διάπορος από τη Βουρβουρού με ενοικιαζόμενο σκάφος;',
              answer: 'Ο Διάπορος είναι πολύ κοντά στη Βουρβουρού, και αυτός είναι ένας από τους βασικούς λόγους που η περιοχή είναι τόσο δημοφιλής για ενοικίαση σκάφους.',
            },
            {
              question: 'Μπορώ να συνδυάσω Διάπορο και Blue Lagoon στην ίδια ενοικίαση;',
              answer: 'Ναι. Στα περισσότερα ημερήσια πλάνα, ο Διάπορος και το Blue Lagoon ταιριάζουν φυσικά μαζί και είναι από τους πιο δημοφιλείς συνδυασμούς.',
            },
            {
              question: 'Είναι το boat rent Diaporos καλή επιλογή για οικογένειες;',
              answer: 'Ναι. Οι σύντομες διαδρομές, τα πιο ήρεμα νερά και οι στάσεις με έμφαση στο μπάνιο το κάνουν πολύ καλή επιλογή για οικογένειες και χαλαρές παρέες.',
            },
          ],
        },
      },
      'blue-lagoon-boat-rental': {
        en: {
          title: 'Blue Lagoon Boat Rental',
          intro:
            'Blue Lagoon is one of the most searched boat-trip spots near Vourvourou, and Medusa helps turn that interest into a practical rental plan with the right departure point, route timing and boat choice.',
          badge: 'Experience-focused page',
          highlights: [
            'Built around Blue Lagoon day trips',
            'Strong route pairing with Diaporos',
            'Ideal for crystal-water swim stops',
          ],
          sections: [
            {
              title: 'Why Blue Lagoon ranks so strongly',
              body: 'Blue Lagoon has clear visual appeal, strong word-of-mouth recognition and easy pairing with Diaporos. That combination makes it one of the most valuable local keywords in this area.',
            },
            {
              title: 'The best way to visit',
              body: 'A rental boat is usually the best way to enjoy Blue Lagoon because it gives you timing flexibility and lets you combine it with quieter stops nearby instead of staying only at one crowded point.',
            },
            {
              title: 'From search intent to real route',
              body: 'People searching Blue Lagoon boat rental usually also care about where to start, how easy the trip is and what else can be seen in the same day. Medusa covers all three by operating from Vourvourou and planning around Diaporos.',
            },
          ],
          faq: [
            {
              question: 'Is Blue Lagoon near Vourvourou?',
              answer: 'Yes. Blue Lagoon is one of the classic stops reached by rental boat from the Vourvourou area.',
            },
            {
              question: 'Can I visit Blue Lagoon without joining a big cruise?',
              answer: 'Yes. Renting a boat gives you a more flexible and usually more private way to reach Blue Lagoon and nearby swim spots.',
            },
            {
              question: 'What is the best route with Blue Lagoon?',
              answer: 'One of the best day routes combines Blue Lagoon with Diaporos and a few smaller coves for swimming and relaxing.',
            },
          ],
        },
        gr: {
          title: 'Blue Lagoon Boat Rental',
          intro:
            'Το Blue Lagoon είναι από τα πιο δημοφιλή σημεία αναζήτησης για boat trip κοντά στη Βουρβουρού, και η Medusa μετατρέπει αυτό το ενδιαφέρον σε πρακτικό πλάνο ενοικίασης με σωστό σημείο αναχώρησης, σωστό timing και σωστή επιλογή σκάφους.',
          badge: 'Σελίδα εμπειρίας',
          highlights: [
            'Σχεδιασμένη γύρω από ημερήσιες διαδρομές στο Blue Lagoon',
            'Δένει ιδανικά με Διάπορο',
            'Ιδανική για στάσεις σε κρυστάλλινα νερά',
          ],
          sections: [
            {
              title: 'Γιατί το Blue Lagoon έχει τόσο μεγάλη αξία στην αναζήτηση',
              body: 'Το Blue Lagoon έχει πολύ δυνατή οπτική ταυτότητα, ισχυρή φήμη από στόμα σε στόμα και συνδυάζεται εύκολα με τον Διάπορο. Αυτό το κάνει ένα από τα σημαντικότερα τοπικά keywords της περιοχής.',
            },
            {
              title: 'Ο καλύτερος τρόπος να το επισκεφτείτε',
              body: 'Ένα ενοικιαζόμενο σκάφος είναι συνήθως ο καλύτερος τρόπος για να απολαύσετε το Blue Lagoon, επειδή σας δίνει ευελιξία στον χρόνο και τη δυνατότητα να το συνδυάσετε με πιο ήσυχες στάσεις κοντά.',
            },
            {
              title: 'Από την αναζήτηση στην πραγματική διαδρομή',
              body: 'Όσοι ψάχνουν Blue Lagoon boat rental συνήθως ενδιαφέρονται και για το από πού ξεκινά η διαδρομή, πόσο εύκολη είναι και τι άλλο αξίζει να δουν την ίδια μέρα. Η Medusa καλύπτει και τα τρία, με αναχώρηση από Βουρβουρού και σχεδιασμό γύρω από τον Διάπορο.',
            },
          ],
          faq: [
            {
              question: 'Είναι το Blue Lagoon κοντά στη Βουρβουρού;',
              answer: 'Ναι. Το Blue Lagoon είναι από τα κλασικά σημεία που φτάνει κανείς με ενοικιαζόμενο σκάφος από την περιοχή της Βουρβουρούς.',
            },
            {
              question: 'Μπορώ να επισκεφτώ το Blue Lagoon χωρίς μεγάλη οργανωμένη κρουαζιέρα;',
              answer: 'Ναι. Η ενοικίαση σκάφους δίνει πιο ευέλικτο και συνήθως πιο ιδιωτικό τρόπο πρόσβασης στο Blue Lagoon και σε κοντινά σημεία για μπάνιο.',
            },
            {
              question: 'Ποια είναι η καλύτερη διαδρομή μαζί με το Blue Lagoon;',
              answer: 'Μια από τις καλύτερες ημερήσιες διαδρομές συνδυάζει Blue Lagoon, Διάπορο και μερικούς μικρότερους όρμους για μπάνιο και χαλάρωση.',
            },
          ],
        },
      },
    };

    return isGreek ? map[slug].gr : map[slug].en;
  }
}
