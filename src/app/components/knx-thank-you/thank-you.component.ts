import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-thank-you',
  styleUrls: ['./thank-you.component.scss'],
  template: `
    <div class="container knx-thank-you">
      <div class="row">
        <div class="col">
          <h2 class="knx-thank-you__title">{{title}}</h2>

          <!-- car specific copy -->
          <ng-container *ngIf="insuranceType === 'autoverzekering'; else default">
            <p>We hebben je aanvraag voor een autoverzekering in goede orde ontvangen.<br>
              De aanvraag wordt door de verzekeraar binnen 3 dagen goedgekeurd. Dit gaat meestal sneller.
              Tot die tijd ben je nog even niet gedekt.</p>
          </ng-container>

          <ng-template #default>
            <p>Gefeliciteerd met je nieuwe {{insuranceType}}verzekering.<br>
            We versturen je aanvraag en de verzekeraar keurt deze binnen 3 dagen goed. We houden je hier uiteraard van op de hoogte.</p>
          </ng-template>

          <p>Zodra je polis definitief is goedgekeurd, sturen wij deze naar <strong>{{email}}</strong></p>

          <p *ngIf="phone && phoneLink">
            Bij vragen kun je contact met ons opnemen via <a href="{{phoneLink}}" rel="noopener">{{phone}}</a>
          </p>

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
  @Input() phone: string;
  @Input() phoneLink: string;
}
