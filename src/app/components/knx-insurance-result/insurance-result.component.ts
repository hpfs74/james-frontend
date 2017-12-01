import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { fadeInAnimation } from '../../shared/animations/fade-in.animation';
import { InsuranceAdvice, Insurer } from '../../insurance/models';

@Component({
  selector: 'knx-insurance-result',
  styleUrls: ['./insurance-result.component.scss'],
  template: `
    <div class="knx-insurance-result" *ngFor="let insurance of [insurance]" [@fadeInAnimation]>
      <div class="knx-insurance_advice knx-card" [ngClass]="{'knx-insurance_advice__supported': insurance.supported}">
        <div class="knx-insurance-result__counter">{{ index + 1 }}</div>
        <div class="row">
          <div class="knx-insurance-result__bookmark" *ngIf="insurance.supported">knab</div>
          <div class="knx-insurance-result__bookmark-tip" *ngIf="insurance.supported"></div>

          <div class="col-md-3 knx-insurance-result__insurance">
            <img class="knx-insurance-result__logo" src="{{ insurance._embedded.insurance.insurance_logo }}" alt="logo">
          </div>

          <div class="col-md-5 knx-insurance-result__data">
            <div class="row">
              <div class="col-md-6 col-6 knx-insurance-result__profilescore">
                <div class="knx-insurance-result__value">{{insurance.fit}}%</div>
                <div class="knx-insurance-result__label">
                  <span class="knx-insurance-result__label--no-break">Profielscore
                    <span class="knx-info-icon knx-icon-info-circle" style="cursor: pointer;">
                      <knx-tooltip>De profielscore geeft aan hoe goed de verzekering bij jouw profiel past. Hoe hoger de score, hoe beter.
                      Een score van minstens 75% betekent dat de verzekering goed aansluit bij jouw wensen en situatie.</knx-tooltip>
                    </span>
                  </span>
                </div>
              </div>

              <div class="col-md-6 col-6 knx-insurance-result__price-quality">
                <div class="knx-insurance-result__value">
                  {{ insurance.price_quality }}<span class="knx-insurance-result__value__sup">/10</span>
                </div>

                <div class="knx-insurance-result__label">
                  Prijs
                  <span class="knx-insurance-result__label--no-break">
                    kwaliteit
                    <span class="knx-info-icon knx-icon-info-circle" style="cursor: pointer;">
                      <knx-tooltip>We berekenen de score op basis van het profiel dat jij instelt. We toetsen de verzekering op meer
                      dan 100 criteria om te bepalen of wat jij belangrijk vindt, ook goed scoort binnen de verzekering.
                      Zo betaal je voor wat jij belangrijk vindt en voorkom je verrassingen.</knx-tooltip>
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 col-6 knx-insurance-result__own-risk">
                <div class="knx-insurance-result__value">{{ insurance.own_risk | currency:'EUR':true }}</div>
                <div class="knx-insurance-result__label">Maximaal eigen risico</div>
              </div>

              <div class="col-md-6 col-6 knx-insurance-result__dekking">
                <div class="knx-insurance-result__value">{{ insurance.main_coverage | jamesTag: 'car_flow_coverage' }}</div>
                <div class="knx-insurance-result__label">Dekking</div>
              </div>
            </div>
          </div>

          <div class="col-md-4 knx-insurance-result__buy">
            <div class="knx-insurance-result__premium knx-insurance-result__price">
              {{ insurance.monthly_premium | currency:'EUR':true }} <span>per maand</span>
            </div>

            <button role="button" class="knx-button knx-button--fullwidth"
              [ngClass]="{'knx-button--primary knx-button--3d': insurance.supported,
              'knx-button--secondary knx-button--ghost': !insurance.supported}"
              [disabled]="disableButton"
              (click)="select($event)">
              Bekijk
            </button>
          </div>
        </div>

        <div class="knx-insurance-result__discount clearfix" *ngIf="insurance.discount">
          <img src="/assets/icon/present_icon.png" alt="present">
          Inc. {{ insurance.discount | currency:'EUR':true }} Knab korting & Gratis overstapservice
        </div>
      </div>

      <!--<knx-insurance-result-detail *ngIf="showDetailPanel && insurance.insurer" [insurer]="insurer"></knx-insurance-result-detail>-->
    </div>
  `,
  animations: [ fadeInAnimation ]
})

export class InsuranceResultComponent {
  @Input() index: number;
  @Input() insurance: InsuranceAdvice;
  @Input() insurer: Insurer;
  @Input() showDetailPanel = false;
  @Input() orderChange: boolean;
  @Input() disableButton: boolean;

  @Output() insuranceSelected$: EventEmitter<InsuranceAdvice> = new EventEmitter<InsuranceAdvice>();

  select(event) {
    event.stopPropagation(); // prevent click event bubbling up and triggering twice
    this.insuranceSelected$.emit(this.insurance);
  }
}
