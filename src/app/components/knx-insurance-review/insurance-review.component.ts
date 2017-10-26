import { Component, OnChanges, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { InsuranceAdvice } from '../../insurance/models';
import { CarInsurance } from '../../car/models';

@Component({
  selector: 'knx-insurance-review',
  styleUrls: ['./insurance-review.component.scss'],
  template: `
    <div *ngIf="selectedInsurance">
      <h2 class="knx-insurance-review__header">
        Controleer je gegevens
        <span>
          <img class="knx-insurance-review__logo" src="{{ selectedInsurance._embedded.insurance.insurance_logo }}">
          <br>
          <span class="knx-insurance-review__name">({{ selectedInsurance._embedded.insurance.insurance_brand }})</span>
        </span>
      </h2>
    </div>

    <p class="knx-collapsible-panel__title" *ngIf="selectedInsurance?.supported">
      Slim verzekerd via Knab

      <knx-ir-tooltip>
        <strong>Verzekeren via Knab is een goed idee want:</strong><br>

        <p>Scherpe prijs: bij Knab betaal je namelijk maar 10% provisie. Bij andere aanbieders is dat tot wel 25% per maand.
        We zijn er voor je: we helpen je bij schade, of als je er niet uitkomt met je verzekeraar.</p>

        <p>Gemak: je regelt alles voor je verzekeringen heel eenvoudig in de app. Zoals je gegevens aanpassen, of je
        vraag aap’en aan de Knab Servicedesk.</p>

        <p>Slim: loopt je verzekering bijna af en kun je kijken voor een betere deal? Dan krijg je een seintje van ons.
        Zodat je altijd slim en voordelig verzekerd bent.</p>
      </knx-ir-tooltip>
    </p>

    <div class="knx-insurance-review__panels">
      <!-- car insurance -->
      <knx-insurance-review-car *ngIf="selectedInsurance"
        [carInsurance]="selectedInsurance"></knx-insurance-review-car>

      <!-- documents -->
      <knx-insurance-review-documents *ngIf="selectedInsurance"
        title="Documenten" [documents]="selectedInsurance?.documents"></knx-insurance-review-documents>

      <!-- benefits -->
      <knx-insurance-review-benefits
        [supported]="selectedInsurance?.supported">
      </knx-insurance-review-benefits>
    </div>

    <div *ngIf="!selectedInsurance?.supported" class="knx-insurance-review__unsupported-button">
      <a [attr.href]="selectedInsurance?._embedded.insurance.url" target="_blank" rel="noopener"
        class="knx-button knx-button--secondary pull-right">Ga naar website</a>
    </div>
  `
})
export class InsuranceReviewComponent {
  @Input() selectedInsurance: InsuranceAdvice;
}
