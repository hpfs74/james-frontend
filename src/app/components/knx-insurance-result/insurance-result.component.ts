import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { fadeInAnimation } from '../../shared/animations/fade-in.animation';
import { InsuranceAdvice, Insurer } from '../../insurance/models';

@Component({
  selector: 'knx-insurance-result',
  template: `
    <div class="knx-insurance-result" *ngFor="let insurance of [insurance]" [@fadeInAnimation]>
      <div class="knx-insurance_advice" [ngClass]="{'knx-insurance_advice__supported': insurance.supported}">
        <div class="knx-insurance-result__counter">{{ index + 1 }}</div>
        <div class="row">
          <div class="col-sm-4">
            <div class="knx-insurance-result__bookmark" *ngIf="insurance.supported">knab</div>
            <div class="knx-insurance-result__bookmark-tip" *ngIf="insurance.supported"></div>

            <img class="knx-insurance-result__logo" src="{{ insurance._embedded.insurance.insurance_logo }}">

            <span class="knx-insurance-result__name">({{ insurance._embedded.insurance.insurance_brand }})</span>
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
              <!--div class="col-sm-6 knx-insurance-result__reviews">
                9.3<br><span>{{ insurance.reviews_amount }} reviews</span>
              </div-->
              <div class="col-sm-6 knx-insurance-result__price-quality">
                <div class="knx-insurance-result__amount">{{ insurance.price_quality }}<span>/10</span></div>
                <div class="knx-insurance-result__label">
                  Prijs <br> kwaliteit
                  <knx-info size="md" isFloating="true" class="knx-info">
                    <div class="knx-info__content">
                      <div class="knx-message knx-message--arrow-top">
                        <div class="knx-message__content" [innerHTML]="infoMessages.priceQuality"></div>
                      </div>
                    </div>
                  </knx-info>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-sm-6 knx-insurance-result__profilescore">
                <div class="knx-insurance-result__label">
                  Profielscore
                  <knx-info size="md" isFloating="true" class="knx-info">
                    <div class="knx-info__content">
                      <div class="knx-message knx-message--arrow-top">
                        <div class="knx-message__content" [innerHTML]="infoMessages.profileScore"></div>
                      </div>
                    </div>
                  </knx-info>
                </div>
              </div>

              <div class="col-sm-6 knx-insurance-result__profilescore">
                <knx-donut *ngIf="insurance.fit" [percentage]="insurance.fit"></knx-donut>
              </div>
            </div>
          </div>

          <div class="col-sm-4 knx-insurance-result__buy">
            <div class="knx-insurance-result__premium knx-insurance-result__price">
              {{ insurance.monthly_premium | currency:'EUR':true }} <span>per maand</span>
            </div>

            <button role="button" class="knx-button knx-button--fullwidth "
              [ngClass]="{'knx-button--cta knx-button--3d knx-button--extended': insurance.supported,
              'knx-button--secondary': !insurance.supported}"
              [disabled]="disableButton"
              (click)="select($event)">
              Bekijk
            </button>

            <div class="knx-insurance-result__discount" *ngIf="insurance.discount">
              Inclusief <br>
              <strong> {{ insurance.discount | currency:'EUR':true }} Knab korting </strong>
            </div>
          </div>
        </div>
      </div>

      <knx-insurance-result-detail *ngIf="showDetailPanel && insurance.insurer" [insurer]="insurer"></knx-insurance-result-detail>
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

  public infoMessages = {
    profileScore: `De profielscore geeft aan hoe goed de verzekering past bij jouw profiel: hoe hoger, hoe beter.
      Een score van 75% betekent dat de verzekering goed aansluit bij jouw wensen en situatie.<br>Wij berekenen de
      score op basis van het profiel dat jij instelt. We toetsen de verzekering op meer dan 100 criteria om te bepalen
      wat jij belangrijk vindt ook goed scoort binnen de verzekering. Zo betaal je voor wat jij
      belangrijk vindt en voorkom je verassingen.`,
    priceQuality: `In het overzicht zie je een profielscore en prijs\-kwaliteitscore. De verzekering met de hoogste prijs\-kwaliteitscore
      staat bovenaan. Verzekeringen die je via Knab afsluit, regel je direct tegen een vaste lage vergoeding van 10%. Verzekeringen die je
      niet via ons kunt afsluiten, laten we toch zien. We verwijzen je dan naar de website van de verzekeraar. Zo heb je altijd een compleet
      beeld van wat er te koop is. Wel zo eerlijk natuurlijk.`
  };

  select(event) {
    event.stopPropagation(); // prevent click event bubbling up and triggering twice
    this.insuranceSelected$.emit(this.insurance);
  }
}
