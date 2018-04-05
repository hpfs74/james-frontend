import { Component, OnInit } from '@angular/core';
import { ContactDetails } from '@app/house/models/house-hold-store';

@Component({
  selector: 'knx-house-hold-payment-details',
  templateUrl: './house-hold-payment-details.component.html'
})
export class HouseHoldPaymentDetailsComponent implements OnInit {
  contact: ContactDetails;

  constructor() {

  }

  ngOnInit() {
    this.contact = {
      lastName: 'Skywalker',
      infix: 'van',
      prefix: 'S.A.',
      firstName: 'Sarah',
      dateOfBirth: new Date('1/1/1990'),
      familySituation: 'A',
      address: {
        street: 'street name',
        number: '123',
        postcode: '2717AX',
        city: 'sophia'
      },
      email: 's.skywalker@empire.com'
    } as ContactDetails;
  }
}
