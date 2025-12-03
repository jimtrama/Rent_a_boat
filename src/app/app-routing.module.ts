import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FleetComponent } from './pages/fleet/fleet.component';
import { DestinationsComponent } from './pages/destinations/destinations.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';

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
    path:"**",
    redirectTo:'fleet',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
