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
        Details {{ selectedInsurance._embedded.insurance.insurance_brand }} verzekering
        <span>
          <img class="knx-insurance-review__logo" src="{{ selectedInsurance._embedded.insurance.insurance_logo }}">
        </span>
      </h2>
    </div>

    <p class="knx-insurance-review__supported-info" *ngIf="selectedInsurance?.supported">
      Slim verzekerd via Knab

      <knx-ir-tooltip>
        <p><strong>Verzekeren via Knab is een goed idee, want:</strong></p>

        <p>Scherpe prijs: bij Knab betaal je maar 10% provisie per maand. Bij andere aanbieders kan dat oplopen tot wel 25%.</p>

        <p>Gemak: je regelt alles voor je verzekeringen heel eenvoudig in de app. Je gegevens aanpassen of een vraag
          stellen aan de Knab Servicedesk bijvoorbeeld. Wij staan altijd voor je klaar: of je nou hulp nodig hebt bij
          het melden van schade of als je er niet uitkomt met je verzekeraar.</p>

        <p>Slim: loopt je verzekering bijna af en kun je ergens een betere deal krijgen? Dan krijg je van ons een seintje.
          Zo ben je via ons altijd slim en voordelig verzekerd.</p>
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
  `
})
export class InsuranceReviewComponent {
  @Input() selectedInsurance: InsuranceAdvice;
}
