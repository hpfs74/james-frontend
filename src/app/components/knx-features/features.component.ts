import { Component, Input } from '@angular/core';
import { Feature } from '../../models/feature';

@Component({
  selector: 'knx-features',
  template: `
  <div class="container-fluid container--fullwidth panel-gray">
    <div class="container container-features-inner">
      <div class="feature" *ngFor="let item of items">
        <div class="feature-title">{{ item.title }}</div>
        <div class="feature-description">{{ item.description }}</div>
    </div>
    </div>
    </div>
  `
})
export class FeaturesComponent {
  @Input() items: Array<Feature>;
}
