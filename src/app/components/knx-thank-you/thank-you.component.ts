import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-thank-you',
  template: `
    <div class="container knx-thank-you">
      <div class="row">
        <div class="col">
          <h2 class="knx-thank-you__title">{{ title }}</h2>

          <p>Gefeliciteerd met je nieuwe {{insuranceType}}.<br>
          De {{insuranceType}}polis is verstuurd en zal binnen 3 dagen
          goedgekeurd worden. <br>We houden je op de hoogte!</p>

          <p>Een kopie van de polis is verstuurd naar <strong>{{email}}</strong></p>
          <hr>
        </div>
      </div>
      <!-- row -->
      <knx-app-promo-block></knx-app-promo-block>
    </div>
  `
})
export class ThankYouComponent {
  @Input() title: string;
  @Input() insuranceType: string;
  @Input() email: string;
}
