import { Component } from '@angular/core';

@Component({
  selector: 'app-fotter',
  standalone: false,
  templateUrl: './fotter.component.html',
  styleUrl: './fotter.component.scss'
})
export class FotterComponent {

  public mapLoading = true;

  facebookClicked() {
    open('https://www.facebook.com/p/Medusa-boats-rental-100063928245216/');
  }
  phoneClicked(str:string) {
    open(`tel:+30${str}`,'_self');
  }
  instagramClicked() {
    open('https://www.instagram.com/medusa_boat_rental');
  }
  loadingMap() {
    this.mapLoading = false;
  }
}
