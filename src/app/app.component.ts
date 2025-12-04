import { AfterViewInit, Component } from '@angular/core';
import { Boat } from './models/boat.model';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  constructor(public modalService:ModalService){}

}
