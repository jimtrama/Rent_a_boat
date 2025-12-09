import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './comps/card/card.component';
import { InfoRowComponent } from './comps/info-row/info-row.component';
import { ContactRowComponent } from './comps/contact-row/contact-row.component';
import { HeaderComponent } from './comps/header/header.component';
import { FotterComponent } from './comps/fotter/fotter.component';
import { FleetComponent } from './pages/fleet/fleet.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { HomeComponent } from './pages/home/home.component';
import { AnimetableDirective } from './directives/animetable.directive';
import { MobileHeaderComponent } from './comps/mobile-header/mobile-header.component';
import { provideAnimations } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    InfoRowComponent,
    ContactRowComponent,
    HeaderComponent,
    FotterComponent,
    FleetComponent,
    DestinationsComponent,
    ReviewsComponent,
    HomeComponent,
    AnimetableDirective,
    MobileHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideAnimations()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
