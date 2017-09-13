import { Component } from '@angular/core';

@Component({
  selector: 'knx-car-thank-you',
  template: `
    <knx-thank-you title="Autoverzekering aangevraagd!" insurance="autoverzekering" email="test@mail.nl"></knx-thank-you>
  `
})
export class CarThankYouComponent {}
