import { Component, Input } from '@angular/core';
import { InsuranceChoice } from '@app/house/models/house-hold-store';

@Component({
  selector: 'knx-insurance-combined-price',
  templateUrl: 'insurance-combined-price.html'
})
export class InsuranceCombinedPriceComponent {

  @Input() IncludeBTW = false;
  @Input() Insurance: Array<InsuranceChoice>;

  getTotalMonthlyPrice(): number {
    return 0;
  }

  getRiskAdministrationCost(): number {
    return 0;
  }
}
