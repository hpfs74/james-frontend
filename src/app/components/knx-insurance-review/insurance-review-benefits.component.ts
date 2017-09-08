import { Component, Input } from '@angular/core';

@Component({
  selector: 'knx-insurance-review-benefits',
  template: `
    <p *ngIf="!supported; else supportedBenefits">
      <!-- TODO: replace with Dutch -->
      This insurance cannot be bought via Knab Verzekeren. This because FBTO doesn't
      have a premium direct link with Knab Verzekeren.
      We are always working to get as much as possibLe insurance companies to working
      together with us. For now you can get this insurance via the FBTO website.
    </p>

    <ng-template #supportedBenefits>
      <div class="knx-insurance-review-benefits__disclaimer">
        <strong>De voordelen van Knab Verzekeren</strong>

        <ul>
          <li>
            <i class="knx-icon-check"></i> Met de Knab Verzekeren App altijd de nodige informatie bij de hand.</li>
          <li>
            <i class="knx-icon-check"></i> Eén overzicht van al je verzekeringen.</li>
          <li>
            <i class="knx-icon-check"></i> Eén overzicht van al je verzekeringen.</li>
        </ul>

        <div class="knx-insurance-review-benefits__thumbs-up-guy"></div>
      </div>
    </ng-template>
  `
})
export class InsuranceReviewBenefitsComponent {
  @Input() supported: boolean;
}
