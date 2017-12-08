import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-thank-you',
  styleUrls: ['./thank-you.component.scss'],
  template: `
    <div class="container knx-thank-you">
      <div class="row">
        <div class="col">
          <h2 class="knx-thank-you__title">{{title}}</h2>

          <p>Gefeliciteerd met je nieuwe {{insuranceType}}.<br>
          We versturen je aanvraag en de verzekeraar keurt deze binnen 3 dagen goed. We houden je hier uiteraard van op de hoogte.</p>

          <p>Zodra je polis goedgekeurd is, sturen wij deze naar <strong>{{email}}</strong></p>
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
