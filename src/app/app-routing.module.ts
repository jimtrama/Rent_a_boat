import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FleetComponent } from './pages/fleet/fleet.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { HomeComponent } from './pages/home/home.component';
import { SeoLandingComponent } from './pages/seo-landing/seo-landing.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent,
  },
  {
    path:"destinations",
    component:DestinationsComponent
  },
  {
    path:"reviews",
    component:ReviewsComponent
  },
  {
    path:"fleet",
    component:FleetComponent,
  },
  {
    path:"vourvourou-boat-rental",
    component:SeoLandingComponent,
  },
  {
    path:"rent-a-boat-vourvourou",
    component:SeoLandingComponent,
  },
  {
    path:"boat-rent-diaporos",
    component:SeoLandingComponent,
  },
  {
    path:"blue-lagoon-boat-rental",
    component:SeoLandingComponent,
  },
  {
    path:"**",
    redirectTo:'',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
