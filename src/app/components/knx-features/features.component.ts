import { Component, Input } from '@angular/core';
import { Feature } from '../../shared/models/feature';

@Component({
  selector: 'knx-features',
  styleUrls: ['./features.component.scss'],
  template: `
  <div class="container knx-container--flat">
    <div class="knx-features">
      <ng-content select="knx-feature-item"></ng-content>
    </div>
  </div>
  `
})
export class FeaturesComponent {}
