import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-insurance-review-benefits',
  styleUrls: ['./insurance-review-benefits.component.scss'],
  template: `
    <div *ngIf="!supported; else supportedBenefits" class="knx-message knx-message--information knx-message--icon-center">
      <div class="knx-message__content">
        Deze verzekering is (nog) niet aangesloten bij Knab Verzekeren.
        Hij staat er wel tussen, omdat we je graag een compleet en passend advies willen geven.
      </div>
    </div>

    <ng-template #supportedBenefits>
      <div class="knx-insurance-review-benefits__disclaimer">
        <strong>De voordelen van Knab Verzekeren</strong>

        <div class="knx-insurance-review-benefits__thumbs-up-guy"></div>

        <ul>
          <li><i class="knx-icon-check"></i> Met de Knab Verzekeren App altijd de nodige informatie bij de hand.</li>
          <li><i class="knx-icon-check"></i> Eén overzicht voor al je verzekeringen.</li>
        </ul>
      </div>
    </ng-template>
  `
})
export class InsuranceReviewBenefitsComponent {
  @Input() brand: string;
  @Input() supported: boolean;
}
