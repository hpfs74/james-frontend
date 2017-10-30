import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-purchased',
  styleUrls: ['./purchased.component.scss'],
  template: `
    <div class="container knx-purchased">
      <div class="row">
        <div class="col">
          <p class="knx-purchased__title">{{ title }}</p>

          <ul class="knx-list--unstyled">
            <li *ngFor="let insurance of insurances">
              <div class="knx-purchased__icon knx-icon-automobile pull-left"></div>

              <p>
                {{insurance.license}} | {{insurance.make}} {{insurance.model}}
                <br>
                <strong>{{insurance.insurance_name}} &bull; {{insurance.price}} &euro; p/m</strong>
              </p>
            </li>
          </ul>
        </div>
      </div>

      <hr>

      <knx-app-promo-block></knx-app-promo-block>
    </div>
  `
})
export class PurchasedComponent {
  @Input() title: string;
  @Input() insurances: any;
}
