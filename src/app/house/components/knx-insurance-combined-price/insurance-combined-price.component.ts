import { Component, Input } from '@angular/core';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';

@Component({
  selector: 'knx-insurance-combined-price',
  templateUrl: 'insurance-combined-price.component.html'
})
export class InsuranceCombinedPriceComponent {

  @Input() IncludeBTW = false;
  @Input() Insurance: Array<CalculatedPremium>;

  getTotalMonthlyPrice(): number {
    return 0;
  }

  getRiskAdministrationCost(): number {
    return 0;
  }
}
