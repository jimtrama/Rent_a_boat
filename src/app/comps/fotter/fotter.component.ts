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
  phoneClicked() {
    open('tel:+306975616367');
  }
  instagramClicked() {
    open('https://www.instagram.com/medusa_boat_rental');
  }
  loadingMap() {
    this.mapLoading = false;
  }
}
