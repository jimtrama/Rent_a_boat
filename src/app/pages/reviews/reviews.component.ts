import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  standalone: false,
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent {
  public reviews = [
    'We rented a big boat for 9 people and the boat was amazing. A brand new boat and for a very fair price ( it was much cheaper than other places which we checked). We had lots of fun and the owner was helpful and patient to explain everything we needed. Him and his wife were also welcoming, nice beautiful people! ❤️ Many thanks for this amazing experience.',
    'Very friendly guide that showed us the best beaches to relax on. The boats were clean and in top condition. The prices are also fair and when in a bigger group it becomes a very cheap way to have a lot of fun for a small price.',
    'Service was perfect. Boat is nice looking, very comfortable and very well equipped.',
    'We enjoyed our trip renting the boat in Medusa company.  Everything is perfect. Recommend to everybody who wants to enjoy trip on the boat',
    "We rented a small boat and had an amazing experience! This family-owned business was extremely friendly and professional. They showed us everything clearly, prices were great, and we didn't have to wait at all. 100% recommended! 🚤☀️…",
    "We had an amazing time renting this boat! Everything was smooth from start to finish—easy booking, clear instructions, and the boat itself was in excellent condition. The staff was friendly, professional, and made sure we were comfortable before setting off. The scenery was beautiful, and cruising around was the perfect way to spend the day. Highly recommend this rental to anyone looking for a fun and relaxing experience on the water!"
  ];
}
