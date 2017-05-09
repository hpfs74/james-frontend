import { Component, OnInit, Input } from '@angular/core';

import { InsuranceAdvice, Insurance } from '../../models/insurance';

@Component({
  selector: 'knx-insurance-result',
  template: `
    <div class="knx-insurance-result">
      <div class="knx-insurance-result__counter">{{ index + 1 }}</div>
      <div class="row">
        <div class="col-sm-4">
          <img class="knx-insurance-result__logo" src="{{ insurance._embedded.insurance.insurance_logo}}">
          <div class="knx-sticker knx-sticker--yellow">meest<br>gekozen</div>
        </div>
        <div class="col-sm-4">
          <div class="row">
            <div class="col-sm-6 knx-insurance-result__own-risk knx-insurance-result__price">
              {{ insurance.own_risk | currency:'EUR':true }}<br><span>Eigen risico</span>
            </div>
            <div class="col-sm-6 knx-insurance-result__reviews">
              9.3<br><span>{{ insurance.reviews_amount }} reviews</span>
            </div>
          </div>
          <div class="row">
            <div class="knx-insurance-result__profilescore">
              <div class="knx-insurance-result__label">Profielscore</div>
              <knx-donut *ngIf="insurance.fit" [percentage]="insurance.fit"></knx-donut>
            </div>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="knx-insurance-result__premium knx-insurance-result__price">
            {{ insurance.monthly_premium | currency:'EUR':true }} <span>per maand</span>
          </div>
          <button role="button" class="knx-button knx-button--primary knx-button--fullwidth">Dit wil ik</button>
        </div>
      </div>

      <knx-insurance-result-detail *ngIf="showDetailPanel" [insurance]="insurance"></knx-insurance-result-detail>
    </div>
  `
})

export class InsuranceResultComponent {
  @Input() index: number;
  @Input() insurance: InsuranceAdvice;
  @Input() showDetailPanel: boolean = true;
}
