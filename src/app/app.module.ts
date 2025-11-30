import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './comps/card/card.component';
import { InfoRowComponent } from './comps/info-row/info-row.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    InfoRowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
