import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FleetComponent } from './pages/fleet/fleet.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  
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
    path:"home",
    component:HomeComponent,
  },
  {
    path:"**",
    redirectTo:'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
