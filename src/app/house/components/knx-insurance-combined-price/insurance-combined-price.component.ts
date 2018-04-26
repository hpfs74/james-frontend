import { Component, Input } from '@angular/core';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';

@Component({
  selector: 'knx-insurance-combined-price',
  styleUrls: ['./insurance-combined-price.component.scss'],
  templateUrl: './insurance-combined-price.component.html'
})
export class InsuranceCombinedPriceComponent {
  @Input() short = false;
  @Input() IncludeBTW = false;
  @Input() Insurance: Array<CalculatedPremium>;

  private sum(a, b): number {
    return a + b;
  }

  getTotalMonthlyGrossPrice(): number {
    return this.Insurance.map(x => x.Premium).reduce(this.sum);
  }

  getTotalMonthlyPrice(): number {
    return this.Insurance.map(x => x.NettoPremium).reduce(this.sum);
  }

  getTotalTaxPrice(): number {
    return this.Insurance.map(x => x.Taxes).reduce(this.sum);
  }

  getRiskAdministrationCost(): number {
    return this.Insurance.map(x => x.TotalCosts).reduce(this.sum);
  }
}
