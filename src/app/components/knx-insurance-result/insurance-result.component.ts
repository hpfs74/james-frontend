import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { fadeInAnimation } from '../../shared/animations/fade-in.animation';
import { InsuranceAdvice, Insurer } from '../../insurance/models';
import { FeatureConfigService } from '@app/core/services/feature-config.service';

@Component({
  selector: 'knx-insurance-result',
  styleUrls: ['./insurance-result.component.scss'],
  templateUrl: './insurance-result.component.html',
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

  constructor(public featureConfigService: FeatureConfigService) { }

  select(event) {
    event.stopPropagation(); // prevent click event bubbling up and triggering twice
    this.insuranceSelected$.emit(this.insurance);
  }

  openPdf() {
    if (this.featureConfigService.isOn('provisionPDFLink')) {
      window.open(this.featureConfigService.featureConfig.provisionPDFLink, '_blank');
    }
  }

  /**
   * returns discount per month for control group or default one,
   * and discount times 12 (for the entire year) for a test group
   * @param amount insurance.discount
   */
  getDiscountAmmount(amount: number) {
    let newAmount = amount;
    if (this.featureConfigService.isOn('disscountBasedOnYear')) {
      newAmount *= 12;
    }
    return newAmount;
  }
}
