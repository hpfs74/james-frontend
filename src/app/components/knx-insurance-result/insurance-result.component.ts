import { Component, OnInit, Input } from '@angular/core';

import { InsuranceBase, Insurance } from '../../models/insurance';

@Component({
  selector: 'knx-insurance-result',
  template: `
    <div class="knx-insurance-result">
      <div class="knx-insurance-result__counter">{{ index + 1 }}</div>

      <div class="row">
        <div class="col-sm-4">
          <img class="knx-insurance-result__logo" src="{{ insurance._embedded.insurance_logo}}">
          <div class="knx-sticker knx-sticker--yellow">meest<br>gekozen</div>
        </div>
        <div class="col-sm-4">
          <div class="row">
            <div class="col-sm-6 knx-insurance-result__own-risk knx-insurance-result__price">
              {{ insurance.own_risk | currency:'EUR':true }}<br><span>Eigen risico</span>
            </div>
            <div class="col-sm-6 knx-insurance-result__reviews">
              9.3<br><span>120 Reviews</span>
            </div>
          </div>
          <div class="knx-insurance-result__profilescore">
            Profielscore
            <knx-donut [percentage]="35"></knx-donut>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="knx-insurance-result__premium knx-insurance-result__price">
            {{ insurance.monthly_premium | currency:'EUR':true }} <span>per maand</span>
          </div>
          <button role="button" class="knx-button knx-button--primary knx-button--fullwidth">Dit wil ik</button>
        </div>
      </div>
    </div>
  `
})

export class InsuranceResultComponent {
  @Input() index: number;
  @Input() insurance: InsuranceBase;
}
