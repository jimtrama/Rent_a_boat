import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contact-row',
  standalone: false,
  templateUrl: './contact-row.component.html',
  styleUrl: './contact-row.component.scss'
})
export class ContactRowComponent {
  @Input() label:string = "";
  @Input() value:string = "";
}
