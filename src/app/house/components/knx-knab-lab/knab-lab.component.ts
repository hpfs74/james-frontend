import { Component } from '@angular/core';
import { environment } from '@env/environment';
import { FeatureConfigService } from '@app/core/services/feature-config.service';

@Component({
  selector: 'knx-knab-lab',
  templateUrl: './knab-lab.component.html',
  styleUrls: ['./knab-lab.component.scss']
})
export class KnabLabButtonComponent {
  constructor(public featureConfig: FeatureConfigService) {}
  goToKnabLab() {
    window.open(environment.featureToggles.knabLab, '_self');
  }
}

