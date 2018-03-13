import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { fadeInAnimation } from '@app/shared/animations/fade-in.animation';
import { FeatureConfigService } from '@app/core/services/feature-config.service';
import { CalculatedPremium } from '@app/house/models/house-hold-premium';

@Component({
  selector: 'knx-house-hold-insurance-result',
  styleUrls: ['./insurance-result.component.scss'],
  templateUrl: './insurance-result.component.html',
  animations: [ fadeInAnimation ]
})

export class HouseHoldInsuranceResultComponent {
  @Input() index: number;
  @Input() insurance: CalculatedPremium;
  @Input() showDetailPanel = false;
  @Input() orderChange: boolean;
  @Input() disableButton: boolean;

  @Output() insuranceSelected$: EventEmitter<CalculatedPremium> = new EventEmitter<CalculatedPremium>();

  constructor(public featureToggleService: FeatureConfigService) { }

  select(event) {
    event.stopPropagation(); // prevent click event bubbling up and triggering twice
    this.insuranceSelected$.emit(this.insurance);
  }

  openPdf() {
    if (this.featureToggleService.isOn('provisionPDFLink')) {
      window.open(this.featureToggleService.featureConfig.provisionPDFLink, '_blank');
    }
  }
}
