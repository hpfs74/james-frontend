import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-thank-you',
  styleUrls: ['./thank-you.component.scss'],
  template: `
    <div class="container knx-thank-you">
      <div class="row">
        <div class="col">
          <div class="knx-card">
            <h2 class="knx-thank-you__title">{{title}}</h2>

          <!-- car specific copy -->
          <div *ngIf="loggedIn">
              <ng-container *ngIf="insuranceType === 'autoverzekering'; else default">
            <p>We hebben je aanvraag voor een autoverzekering in goede orde ontvangen.<br>
              Wij gaan je aanvraag indienen bij de verzekeraar . Zodra je aanvraag is ingediend, ontvang je van ons bericht.
              Je hebt nunog geen voorlopige dekking.</p>
          </ng-container>

          <ng-template #default>
            <p>Gefeliciteerd met je nieuwe {{insuranceType}}verzekering.<br>
              We versturen je aanvraag en de verzekeraar keurt deze binnen 3 dagen goed.
              We houden je hier uiteraard van op de hoogte.</p>
          </ng-template></div>

            <ol *ngIf="!loggedIn">
              <li>We hebben je aanvraag voor een autoverzekering in goede orde ontvangen. Wij gaan je aanvraag indienen
                bij de verzekeraar. Zodra je aanvraag is ingediend, ontvang je van ons bericht. Je hebt nu nog geen voorlopige dekking.</li>
              <li>Klik op <strong>"bevestig account"</strong> in de e-mail die we je net hebben gestuurd om je account
                in gebruik te nemen. </li>
            </ol>

            <p>Zodra je polis definitief is goedgekeurd, krijg je deze van de verzekeraar.</p>

            <p *ngIf="phone && phoneLink">
              Bij vragen kun je contact met ons opnemen via <a href="{{phoneLink}}" rel="noopener">{{phone}}</a>
            </p>
          </div>
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
  @Input() loggedIn: boolean;
}
