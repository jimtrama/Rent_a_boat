import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './comps/card/card.component';
import { InfoRowComponent } from './comps/info-row/info-row.component';
import { ContactRowComponent } from './comps/contact-row/contact-row.component';
import { HeaderComponent } from './comps/header/header.component';
import { FotterComponent } from './comps/fotter/fotter.component';
@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    InfoRowComponent,
    ContactRowComponent,
    HeaderComponent,
    FotterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
