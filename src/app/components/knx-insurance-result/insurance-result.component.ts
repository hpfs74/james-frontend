import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { fadeInAnimation } from './../../animations/fade-in.animation';
import { InsuranceAdvice, Insurance, Insurer } from '../../models';

@Component({
  selector: 'knx-insurance-result',
  template: `
    <div class="knx-insurance-result" *ngFor="let insurance of [insurance]" [@fadeInAnimation]>
      <div class="knx-insurance_advice">
        <div class="knx-insurance-result__counter">{{ index + 1 }}</div>
        <div class="row">
          <div class="col-sm-4">
            <img class="knx-insurance-result__logo" src="{{ insurance._embedded.insurance.insurance_logo}}">
            <!--<div class="knx-sticker knx-sticker--yellow" title="Op basis van jouw wensen raden we deze premie aan">
              <span class="knx-icon-thumbs-o-up"></span>
            </div>
            -->
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
              <div class="col-sm-6 knx-insurance-result__profilescore">
                <knx-donut *ngIf="insurance.fit" [percentage]="insurance.fit"></knx-donut>
                <div class="knx-insurance-result__label">Profielscore</div>
              </div>
              <div class="col-sm-6 knx-insurance-result__price-quality">
                <div class="knx-insurance-result__amount">{{ insurance.price_quality }}<span>/10</span></div>
                <div class="knx-insurance-result__label">Prijs kwaliteit</div>
              </div>
            </div>
          </div>
          <div class="col-sm-4">
            <div class="knx-insurance-result__premium knx-insurance-result__price">
              {{ insurance.monthly_premium | currency:'EUR':true }} <span>per maand</span>
            </div>
            <button role="button" class="knx-button knx-button--secondary knx-button--fullwidth" (click)="select($event)">Kies deze</button>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <knx-insurance-result-detail *ngIf="showDetailPanel && insurance.insurer" [insurance]="insurance">
=======
      <knx-insurance-result-detail *ngIf="showDetailPanel"
        [insurance]="insurance"
        insurer]="insurer"
        [showDetails]="false">
>>>>>>> ef2fa3f... feat(insurer): add insurer class and api config based on env variable
      </knx-insurance-result-detail>
    </div>
  `,
  animations: [ fadeInAnimation ]
})

export class InsuranceResultComponent {
  @Input() index: number;
  @Input() insurance: InsuranceAdvice;
  @Input() showDetailPanel: boolean = false;
  @Input() orderChange: boolean;

  @Output() insuranceSelected$: EventEmitter<InsuranceAdvice> = new EventEmitter();

  select(event) {
    this.insuranceSelected$.emit(this.insurance);
  }
}
